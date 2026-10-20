import React, { useState, useContext, useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import { i18n } from "../../translate/i18n";
import "./style.css";
import { AuthContext } from "../../context/Auth/AuthContext";
import ChatizyBrand from "../../components/ChatizyBrand";
import api from "../../services/api";

const useStyles = makeStyles((theme) => ({
  form: { width: "100%", display: "flex", flexDirection: "column", gap: theme.spacing(1) },
  submit: { margin: theme.spacing(2, 0, 1), minHeight: 44 },
  input: { "& .MuiOutlinedInput-root": { borderRadius: theme.chatizy.controlRadius } },
  recovery: { textAlign: "center", marginTop: theme.spacing(1) },
}));

const Login = () => {
  const classes = useStyles();

  const [user, setUser] = useState({ email: "", password: "" });

  const { handleLogin, loading } = useContext(AuthContext);
  const [viewregister, setviewregister] = useState("disabled");

  useEffect(() => {
    const fetchviewregister = async () => {
      try {
        const { data } = await api.get("/settings/viewregister");
        setviewregister(data?.value);
      } catch (error) {
        console.error("Error retrieving viewregister", error);
      }
    };
    fetchviewregister();
  }, []);

  const handleChangeInput = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handlSubmit = (e) => {
    e.preventDefault();
    handleLogin(user);
  };

  return (
    <div className="geral">
      <CssBaseline />
      <div className={"container-login"}>
        <div className={"container-img"}>
          <ChatizyBrand size="large" />
        </div>
        <div className="container-footer">
          <p>
            Copyright ©{" "}
            <span>Chatizy</span>{" "}
            {new Date().getFullYear()}{" "}
          </p>
          <p>
            {" "}
            <a href={"https://policies.google.com/privacy"} target={"_blank"} rel="noopener noreferrer">
              Politica de Privacidade
            </a>{" "}
            &{" "}
            <a href={"https://policies.google.com/terms"} target={"_blank"} rel="noopener noreferrer">
              Termos de Serviço
            </a>
          </p>
        </div>
      </div>
      <div className={"container-right"}>
        <div className={"box"}>
          <div className={"container-header-box"}>
            {viewregister === "enabled" && (
            <Link
              // variant="body2"
              component={RouterLink}
              className={"link-create-count"}
              tabIndex={0}
              role={"button"}
              aria-disabled={"false"}
              to="/signup"
              style={{ textDecoration: "none" }}
            >
              <span className={"label-text"}>Criar conta</span>
            </Link>
            )}
            <span
              className={"link-enter"}
              style={{ textDecoration: "none" }}
            >
              <span>Entrar</span>
            </span>
          </div>
          <form className={classes.form} noValidate onSubmit={handlSubmit}>
            <TextField
              className={classes.input}
              variant="outlined"
              margin="dense"
              required
              fullWidth
              id="email"
              label={i18n.t("login.form.email")}
              name="email"
              value={user.email}
              onChange={handleChangeInput}
              autoComplete="email"
              autoFocus
            />
            <TextField
              className={classes.input}
              variant="outlined"
              margin="dense"
              required
              fullWidth
              name="password"
              label={i18n.t("login.form.password")}
              type="password"
              id="password"
              value={user.password}
              onChange={handleChangeInput}
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              disabled={loading}
            >
              {i18n.t("login.buttons.submit")}
            </Button>
            <div className={classes.recovery}>
              <Link
                component={RouterLink}
                to="/forgetpsw"
                color="primary"
              >
                Esqueceu a senha?
              </Link>
            </div>
          </form>
          <div className={"container-footer-form"}>
            <p>
              Ao prosseguir, você concorda com nossos{" "}
              <a className={"termo"} href={"/term"} target={"_blank"} rel="noopener noreferrer">
                Termos de Serviço{""}
              </a>{" "}
              e{" "}
              <a className={"politica"} href={"/privacy"} target={"_blank"} rel="noopener noreferrer">
                Política de Privacidade
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
