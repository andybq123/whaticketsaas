import { getWbot } from "../../libs/wbot";
import Contact from "../../models/Contact";
import { logger } from "../../utils/logger";
import ShowBaileysService from "../BaileysServices/ShowBaileysService";
import CreateContactService from "../ContactServices/CreateContactService";
import AppError from "../../errors/AppError";
import Whatsapp from "../../models/Whatsapp";
import GetDefaultWhatsApp from "../../helpers/GetDefaultWhatsApp";

const ImportContactsService = async (
  companyId: number,
  whatsappId?: number
): Promise<void> => {
  // Define qual conexão WhatsApp usar:
  // - Se vier whatsappId no corpo da requisição, usa essa conexão
  // - Caso contrário, usa o WhatsApp padrão da empresa (comportamento anterior)
  let targetWhatsappId = whatsappId;

  if (!targetWhatsappId) {
    const defaultWhatsapp = await GetDefaultWhatsApp(companyId);
    targetWhatsappId = defaultWhatsapp.id;
  }

  const whatsapp = await Whatsapp.findOne({
    where: {
      id: targetWhatsappId,
      companyId,
      status: "CONNECTED"
    }
  });

  if (!whatsapp) {
    throw new AppError("ERR_NO_WAPP_FOUND", 404);
  }

  const wbot = getWbot(whatsapp.id);

  let baileys;
  try {
    baileys = await ShowBaileysService(wbot.id);
  } catch (error) {
    throw new AppError(
      "Nenhum contato sincronizado ainda. Aguarde alguns minutos após conectar ou reconecte o WhatsApp lendo o QR Code.",
      404
    );
  }

  let phoneContactsList: any[] = [];

  try {
    const parsed = baileys.contacts && JSON.parse(baileys.contacts as any);
    if (Array.isArray(parsed)) {
      phoneContactsList = parsed;
    } else if (parsed && typeof parsed === "object") {
      phoneContactsList = Array.isArray((parsed as any).contacts)
        ? (parsed as any).contacts
        : Object.values(parsed as any);
    }
  } catch (error) {
    logger.warn({ whatsappId: whatsapp.id }, `Could not parse whatsapp contacts. Err: ${error}`);
    throw new AppError("Could not get whatsapp contacts from database.", 500);
  }

  // Resolve o número real: contatos novos podem vir com id @lid (identificador anônimo),
  // que não é telefone. Nesse caso usa o campo jid (@s.whatsapp.net) quando disponível.
  const resolvePhoneJid = (c: any): string | null => {
    const candidates = [c?.jid, c?.phoneNumber, c?.id].filter(
      (v: any) => typeof v === "string"
    );
    const jid = candidates.find((v: string) => v.endsWith("@s.whatsapp.net"));
    return jid || null;
  };

  const seen = new Set<string>();

  for (const contact of phoneContactsList) {
    const jid = resolvePhoneJid(contact);
    if (!jid) continue;

    const number = jid.split("@")[0].split(":")[0].replace(/\D/g, "");
    if (number.length < 8 || number.length > 15 || seen.has(number)) continue;
    seen.add(number);

    const name = contact.name || contact.notify || contact.verifiedName || number;

    try {
      const existingContact = await Contact.findOne({ where: { number, companyId } });

      if (existingContact) {
        // Só substitui o nome quando o atual é apenas o número.
        if (!existingContact.name || existingContact.name === number) {
          existingContact.name = name;
          await existingContact.save();
        }
      } else {
        await CreateContactService({ number, name, companyId });
      }
    } catch (error) {
      logger.error({ number, companyId }, `Could not save contact. Err: ${error}`);
    }
  }
};

export default ImportContactsService;