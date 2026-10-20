import { Chat, Contact } from "libzapitu-rf";
import Baileys from "../../models/Baileys";

interface Request {
  whatsappId: number;
  contacts?: Partial<Contact>[];
  chats?: Chat[];
}

// Chave estável: prefere o número (@s.whatsapp.net); contatos só com @lid usam o lid.
const contactKey = (c: Partial<Contact>): string | undefined => {
  if (!c) return undefined;
  if (c.jid) return c.jid;
  if (c.id && !c.id.endsWith("@lid")) return c.id;
  return c.lid || c.id;
};

const parseStored = (raw: unknown): Partial<Contact>[] => {
  if (!raw) return [];
  try {
    const parsed = typeof raw === "string" ? JSON.parse(raw) : raw;
    if (Array.isArray(parsed)) return parsed;
    if (parsed && Array.isArray((parsed as any).contacts)) return (parsed as any).contacts;
    if (parsed && typeof parsed === "object") return Object.values(parsed as any);
  } catch {
    // conteúdo antigo inválido é descartado
  }
  return [];
};

const createOrUpdateBaileysService = async ({
  whatsappId,
  contacts
}: Request): Promise<Baileys> => {
  const baileysExists = await Baileys.findOne({ where: { whatsappId } });

  if (!contacts || !contacts.length) {
    return baileysExists;
  }

  // Mescla por contato, mantendo os dados já conhecidos e aplicando as novidades.
  const merged = new Map<string, Partial<Contact>>();
  const add = (c: Partial<Contact>) => {
    const key = contactKey(c);
    if (!key) return;
    const previous = merged.get(key) || {};
    const next: Partial<Contact> = { ...previous };
    Object.entries(c).forEach(([k, v]) => {
      if (v !== undefined && v !== null && v !== "") (next as any)[k] = v;
    });
    merged.set(key, next);
  };

  parseStored(baileysExists?.contacts).forEach(add);
  contacts.forEach(add);

  const serialized = JSON.stringify(Array.from(merged.values()));

  if (baileysExists) {
    return baileysExists.update({ contacts: serialized });
  }

  return Baileys.create({ whatsappId, contacts: serialized });
};

export default createOrUpdateBaileysService;
