import React, { useState, useContext, useEffect } from "react";
import clsx from "clsx";
import {
  makeStyles,
  Drawer,
  List,
  IconButton,
  useTheme,
  useMediaQuery,
} from "@material-ui/core";

import MenuIcon from "@material-ui/icons/Menu";
import MenuOpenIcon from "@material-ui/icons/MenuOpen";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

import MainListItems from "./MainListItems";
import ChatizyBrand from "../components/ChatizyBrand";
import brandMark from "../assets/chatizy-mark.png";
import { AuthContext } from "../context/Auth/AuthContext";
import BackdropLoading from "../components/BackdropLoading";
import { i18n } from "../translate/i18n";
import toastError from "../errors/toastError";
import { SocketContext } from "../context/Socket/SocketContext";
import ColorModeContext from "../layout/themeContext";
import Brightness4Icon from '@material-ui/icons/Brightness4';
import Brightness7Icon from '@material-ui/icons/Brightness7';

const drawerWidth = 248;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    height: "100vh",
    backgroundColor: theme.palette.fancyBackground,
  },
  avatar: {
    width: "100%",
  },
  toolbar: {
    paddingRight: theme.spacing(2),
    paddingLeft: theme.spacing(2),
    minHeight: 56,
    color: theme.palette.dark.main,
    background: theme.palette.barraSuperior,
  },
  branding: {
    display: 'flex',
    alignItems: 'center',
    marginLeft: theme.spacing(1),
    gap: theme.spacing(1.5),
  },
  companyName: {
    color: theme.palette.text.primary,
    fontSize: '1rem',
    fontWeight: 500,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    maxWidth: '200px',
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  logo: {
    maxHeight: 30,
    width: 'auto',
    cursor: 'pointer',
    [theme.breakpoints.down('sm')]: {
      maxWidth: '100px',
      maxHeight: 28,
    }
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 8px",
    minHeight: "56px",
    [theme.breakpoints.down("sm")]: {
      height: "56px"
    }
  },
  appBar: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    width: "100%",
    zIndex: theme.zIndex.drawer + 100,
    boxShadow: 'none',
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  menuButton: {
    marginRight: theme.spacing(1),
    padding: theme.spacing(1),
    "&:hover": {
      backgroundColor: "transparent",
    },
    "& .MuiTouchRipple-root": {
      display: "none",
    },
  },
  menuIcon: {
    color: theme.palette.text.primary,
    transition: "opacity 0.3s ease, transform 0.3s ease",
  },
  menuButtonHidden: {
    display: "none",
  },
  title: {
    flexGrow: 1,
    fontSize: 14,
    color: theme.palette.text.primary,
  },
  drawerPaper: {
    position: "fixed",
    top: 0,
    left: 0,
    bottom: 0,
    height: "100vh",
    whiteSpace: "nowrap",
    width: drawerWidth,
    maxWidth: drawerWidth,
    overflowX: "hidden",
    display: "flex",
    flexDirection: "column",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    [theme.breakpoints.down("md")]: {
      top: 0,
      height: "100vh",
      bottom: 0,
      width: drawerWidth,
      maxWidth: "80vw",
    },
    borderRight: `1px solid ${theme.palette.divider}`,
    paddingTop: theme.spacing(1),
    backgroundColor: theme.palette.background.paper,
    ...theme.scrollbarStylesSoft
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up("md")]: {
      width: theme.spacing(9),
    },
    [theme.breakpoints.down("md")]: {
      width: 0,
      transform: "translateX(-100%)",
    },
    position: "fixed",
    top: 0,
    left: 0,
    bottom: 0,
    height: "100vh",
    display: "flex",
    flexDirection: "column",
  },
  contentWrapper: {
    display: "flex",
    width: "100%",
    flex: 1,
    marginTop: 0,
    overflow: "hidden",
    height: "100vh",
  },
  content: {
    flex: 1,
    width: "100%",
    height: "100%",
    overflow: "auto",
    marginLeft: drawerWidth,
    minWidth: 0,
    transition: theme.transitions.create(["margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    [theme.breakpoints.down("md")]: {
      marginLeft: 0,
    }
  },
  contentShift: {
    marginLeft: theme.spacing(7),
    transition: theme.transitions.create(["margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(9),
    },
    [theme.breakpoints.down("md")]: {
      marginLeft: 0,
    }
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column"
  },
  containerWithScroll: {
    flex: 1,
    padding: theme.spacing(0.5),
    paddingLeft: 0,
    paddingRight: 0,
    paddingBottom: 0,
    overflowY: "auto",
    overflowX: "hidden",
    width: "100%",
    maxWidth: "100%",
    boxSizing: "border-box",
    display: "flex",
    flexDirection: "column",
    minHeight: 0,
    ...theme.scrollbarStyles,
  },
  drawerBrand: { padding: theme.spacing(2, 2, 1), display: "flex", justifyContent: "center", borderBottom: `1px solid ${theme.palette.divider}`, marginBottom: theme.spacing(1) },
  drawerActions: {
    display: "flex", flexWrap: "wrap", justifyContent: "center", flexShrink: 0,
    gap: theme.spacing(0.5), padding: theme.spacing(1),
    borderTop: `1px solid ${theme.palette.divider}`,
  },
  mobileMenu: {
    position: "fixed", bottom: theme.spacing(2), left: theme.spacing(2),
    zIndex: theme.zIndex.drawer - 1,
    backgroundColor: theme.palette.background.paper,
    border: `1px solid ${theme.palette.divider}`,
    boxShadow: theme.chatizy.shadow,
    "&:hover": { backgroundColor: theme.palette.action.hover },
  },
  profileName: { fontSize: 13, fontWeight: 600, color: theme.palette.text.primary, maxWidth: 120, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", [theme.breakpoints.down("sm")]: { display: "none" } },
  flagIcon: {
    width: 24,
    height: 16,
    marginRight: 8,
  },
  languageMenuItem: {
    display: 'flex',
    alignItems: 'center',
  },
}));

const LoggedInLayout = ({ children }) => {
  const classes = useStyles();
  const { handleLogout, loading } = useContext(AuthContext);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerVariant, setDrawerVariant] = useState("permanent");
  const { user } = useContext(AuthContext);
  const companyId = user?.companyId;

  const theme = useTheme();
  const { colorMode } = useContext(ColorModeContext);
  const greaterThenSm = useMediaQuery(theme.breakpoints.up("md"));

  // Default logos based on theme
  const defaultLogoLight = brandMark;
  const defaultLogoDark = brandMark;

  // Potential custom logo base URL (will try .png, .jpg, .svg)
  const customLogoBaseUrl = companyId ? `${process.env.REACT_APP_BACKEND_URL}/public/company${companyId}/logotipos/logo` : null;

  // State for the final logo URL to display
  const [finalLogoUrl, setFinalLogoUrl] = useState('');


  const socketManager = useContext(SocketContext);

  // Determine the correct logo URL to attempt loading initially and on theme/company change
  useEffect(() => {
    const themeDefaultLogo = theme.palette.type === 'light' ? defaultLogoLight : defaultLogoDark;
    // Prioritize custom logo if companyId exists, try .png first
    const potentialCustomUrl = customLogoBaseUrl ? `${customLogoBaseUrl}.png` : themeDefaultLogo;
    setFinalLogoUrl(potentialCustomUrl); // Set the initial URL to try

  }, [theme.palette.type, companyId, customLogoBaseUrl, defaultLogoLight, defaultLogoDark]);


  useEffect(() => {
    if (document.body.offsetWidth > 1200) {
      setDrawerOpen(true);
    }
  }, []);

  useEffect(() => {
    if (greaterThenSm) {
      setDrawerVariant("permanent");
      setDrawerOpen(true);
    } else {
      setDrawerVariant("temporary");
      setDrawerOpen(false);
    }
  }, [greaterThenSm]);

  useEffect(() => {
    const storedCompanyId = localStorage.getItem("companyId");
    const userId = localStorage.getItem("userId");

    const socket = socketManager.getSocket(storedCompanyId);

    socket.on(`company-${storedCompanyId}-auth`, (data) => {
      if (data.user.id === +userId) {
        toastError("Sua conta foi acessada em outro computador.");
        setTimeout(() => {
          localStorage.clear();
          window.location.reload();
        }, 1000);
      }
    });

    socket.emit("userStatus");
    const interval = setInterval(() => {
      socket.emit("userStatus");
    }, 1000 * 60 * 5);

    return () => {
      socket.disconnect();
      clearInterval(interval);
    };
  }, [socketManager]);

  const handleClickLogout = () => {
    handleLogout();
  };

  const drawerClose = () => {
    if (!greaterThenSm) {
      setDrawerOpen(false);
    }
  };


  const toggleColorMode = () => {
    colorMode.toggleColorMode();
    // Logo update is handled by useEffect watching theme.palette.type
  };

  // Fallback logic for image loading errors
  const handleLogoError = (event) => {
    const currentSrc = event.target.getAttribute('src').split('?')[0]; // Get URL without cache buster
    const themeDefaultLogo = theme.palette.type === 'light' ? defaultLogoLight : defaultLogoDark;

    // If the current source is already the default, stop to prevent loops
    if (currentSrc === themeDefaultLogo) {
        console.error("Default logo also failed to load:", currentSrc);
        return;
    }

    // If trying custom .png failed, try custom .jpg
    if (customLogoBaseUrl && currentSrc === `${customLogoBaseUrl}.png`) {
        console.log("Custom logo.png failed, trying logo.jpg");
        setFinalLogoUrl(`${customLogoBaseUrl}.jpg`);
        return; // Try loading jpg
    }

    // If trying custom .jpg failed, try custom .svg
    if (customLogoBaseUrl && currentSrc === `${customLogoBaseUrl}.jpg`) {
        console.log("Custom logo.jpg failed, trying logo.svg");
        setFinalLogoUrl(`${customLogoBaseUrl}.svg`);
        return; // Try loading svg
    }

    // If trying custom .svg failed (or if no custom base URL, or if any other error occurred), fall back to the theme default logo
    if (currentSrc !== themeDefaultLogo) {
        console.log("Custom logo failed or not found, falling back to default:", themeDefaultLogo);
        setFinalLogoUrl(themeDefaultLogo);
    }
  };

  if (loading) {
    return <BackdropLoading />;
  }

  return (
    <div className={classes.root}>
      <Drawer
        variant={drawerVariant}
        className={drawerOpen ? classes.drawerPaper : classes.drawerPaperClose}
        classes={{
          paper: clsx(
            classes.drawerPaper,
            !drawerOpen && classes.drawerPaperClose
          ),
        }}
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        ModalProps={{
          keepMounted: true,
        }}
      >
        <div className={classes.drawerBrand}>
          {finalLogoUrl && finalLogoUrl !== brandMark ? (
            <img src={finalLogoUrl} className={classes.logo} alt="Chatizy" onError={handleLogoError} />
          ) : <ChatizyBrand size="compact" symbolOnly={!drawerOpen} />}
        </div>
        <div className={classes.containerWithScroll}>
          <List style={{ padding: 0, width: '100%', flex: 1 }}>
            <MainListItems drawerClose={drawerClose} collapsed={!drawerOpen} />
          </List>
        </div>
        <div className={classes.drawerActions}>
          <IconButton aria-label={drawerOpen ? "Recolher menu" : "Abrir menu"} title={drawerOpen ? "Recolher menu" : "Abrir menu"} onClick={() => setDrawerOpen(!drawerOpen)}>
            {drawerOpen ? <MenuOpenIcon /> : <MenuIcon />}
          </IconButton>
          <IconButton aria-label={theme.palette.type === "dark" ? "Modo claro" : "Modo escuro"} title={theme.palette.type === "dark" ? "Modo claro" : "Modo escuro"} onClick={toggleColorMode}>
            {theme.palette.type === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
          <IconButton aria-label={i18n.t("mainDrawer.appBar.user.logout")} title={i18n.t("mainDrawer.appBar.user.logout")} onClick={handleClickLogout}>
            <ExitToAppIcon />
          </IconButton>
        </div>
      </Drawer>
      {!greaterThenSm && !drawerOpen && (
        <IconButton className={classes.mobileMenu} aria-label="Abrir menu" title="Abrir menu" onClick={() => setDrawerOpen(true)}><MenuIcon /></IconButton>
      )}
      <div className={classes.contentWrapper}>
        <main className={clsx(classes.content, !drawerOpen && classes.contentShift)}>
          {children ? children : null}
        </main>
      </div>
    </div>
  );
};

export default LoggedInLayout;
