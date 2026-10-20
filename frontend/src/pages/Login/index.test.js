import React from "react";
import { MemoryRouter } from "react-router-dom";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import { ThemeProvider, createTheme } from "@material-ui/core/styles";
import Login from "./index";
import { AuthContext } from "../../context/Auth/AuthContext";
import api from "../../services/api";
import { createChatizyOptions } from "../../theme/chatizy";

jest.mock("../../services/api", () => ({ __esModule: true, default: { get: jest.fn() } }));
jest.mock("../../context/Auth/AuthContext", () => ({ AuthContext: require("react").createContext({}) }));
jest.mock("../../translate/i18n", () => ({ i18n: { t: key => key } }));
const renderLogin = (handleLogin = jest.fn(), loading = false) => render(
  <MemoryRouter><ThemeProvider theme={createTheme(createChatizyOptions("light"))}>
    <AuthContext.Provider value={{ handleLogin, loading }}><Login /></AuthContext.Provider>
  </ThemeProvider></MemoryRouter>
);
beforeEach(() => jest.clearAllMocks());
test("cadastro permanece indisponível quando a configuração está desabilitada", async () => {
  api.get.mockResolvedValue({ data: { value: "disabled" } });
  renderLogin();
  await waitFor(() => expect(api.get).toHaveBeenCalledWith("/settings/viewregister"));
  expect(screen.queryByRole("button", { name: "Criar conta" })).toBeNull();
});
test("cadastro habilitado mantém o destino de inscrição", async () => {
  api.get.mockResolvedValue({ data: { value: "enabled" } });
  renderLogin();
  expect((await screen.findByRole("button", { name: "Criar conta" })).getAttribute("href")).toBe("/signup");
});
test("envia email e senha sem modificar o contrato de autenticação", async () => {
  api.get.mockResolvedValue({ data: { value: "disabled" } });
  const handleLogin = jest.fn();
  renderLogin(handleLogin);
  fireEvent.change(screen.getByLabelText(/login.form.email/), { target: { value: "teste@example.com" } });
  fireEvent.change(screen.getByLabelText(/login.form.password/), { target: { value: "senha-de-teste" } });
  fireEvent.click(screen.getByRole("button", { name: "login.buttons.submit" }));
  expect(handleLogin).toHaveBeenCalledWith({ email: "teste@example.com", password: "senha-de-teste" });
  await waitFor(() => expect(api.get).toHaveBeenCalled());
});
test("impede novo envio durante o carregamento", async () => {
  api.get.mockResolvedValue({ data: { value: "disabled" } });
  const handleLogin = jest.fn(); renderLogin(handleLogin, true);
  const submit = screen.getByRole("button", { name: "login.buttons.submit" });
  expect(submit.disabled).toBe(true); fireEvent.click(submit);
  expect(handleLogin).not.toHaveBeenCalled();
  await waitFor(() => expect(api.get).toHaveBeenCalled());
});
