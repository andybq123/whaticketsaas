// Shared presentation tokens for the existing MUI v4 and v5 components.
export const createChatizyOptions = (mode) => {
  const dark = mode === "dark";
  const colors = {
    brand: "#FF9100", brandStrong: dark ? "#FFAD42" : "#A64B00",
    canvas: dark ? "#181A1D" : "#F5F6F8",
    surface: dark ? "#222529" : "#FFFFFF",
    elevated: dark ? "#2B2F34" : "#F0F2F5",
    text: dark ? "#F2F3F5" : "#20242A",
    muted: dark ? "#B2B8C1" : "#626A76",
    border: dark ? "#3B4149" : "#DEE2E8",
    selected: dark ? "#3E3021" : "#FFF1DB",
    outgoing: dark ? "#283B32" : "#E4F2EA",
    outgoingQuote: dark ? "#213229" : "#D5E8DE",
    success: dark ? "#66C79A" : "#238259",
    error: dark ? "#FF8585" : "#C83838",
    info: dark ? "#80B9EF" : "#276DA8",
  };
  const softShadow = dark ? "0 2px 8px rgba(0,0,0,.18)" : "0 2px 8px rgba(32,36,42,.06)";
  const palette = {
    type: mode, mode,
    primary: { main: colors.brandStrong, light: colors.brand, dark: dark ? "#E69327" : "#803900", contrastText: dark ? "#20242A" : "#FFFFFF" },
    secondary: { main: colors.info },
    success: { main: colors.success }, error: { main: colors.error }, info: { main: colors.info },
    warning: { main: colors.brandStrong },
    background: { default: colors.canvas, paper: colors.surface },
    text: { primary: colors.text, secondary: colors.muted, sair: colors.text },
    divider: colors.border,
    action: { hover: colors.elevated, selected: colors.selected, focus: colors.selected },
    brand: { main: colors.brand },
    quicktags: { main: colors.selected, contrastText: colors.text },
    sair: { main: colors.elevated, dark: colors.selected },
    vcard: { main: colors.brandStrong },
    dark: { main: colors.text }, light: { main: colors.elevated },
    textPrimary: colors.text, borderPrimary: colors.border,
    tabHeaderBackground: colors.surface, ticketlist: colors.surface,
    optionsBackground: colors.surface, options: colors.elevated,
    fontecor: colors.text, fancyBackground: colors.canvas,
    bordabox: colors.border, newmessagebox: colors.surface,
    inputdigita: colors.elevated, contactdrawer: colors.surface,
    announcements: colors.elevated, login: colors.surface,
    announcementspopover: colors.surface, chatlist: colors.surface,
    boxlist: colors.elevated, boxchatlist: colors.surface,
    total: colors.surface, messageIcons: colors.muted,
    inputBackground: colors.elevated, barraSuperior: colors.surface,
    boxticket: colors.canvas, campaigntab: colors.surface,
    mediainput: colors.elevated, contadordash: colors.text,
    message: { incoming: colors.surface, outgoing: colors.outgoing, incomingQuote: colors.elevated, outgoingQuote: colors.outgoingQuote },
  };
  const global = {
    html: { boxSizing: "border-box" },
    "*, *::before, *::after": { boxSizing: "inherit" },
    body: {
      margin: 0, backgroundColor: colors.canvas, color: colors.text,
      "--chatizy-background": colors.canvas, "--chatizy-surface": colors.surface,
      "--chatizy-text": colors.text, "--chatizy-muted": colors.muted,
      "--chatizy-border": colors.border, "--chatizy-brand": colors.brand,
      "--chatizy-link": colors.brandStrong, "--chatizy-shadow": softShadow,
    },
    "#root": { minHeight: "100vh" },
    "a, button, input, textarea, select": { WebkitTapHighlightColor: "transparent" },
    "a:focus-visible, button:focus-visible, input:focus-visible, textarea:focus-visible, select:focus-visible": {
      outline: `2px solid ${colors.brandStrong}`, outlineOffset: 3,
    },
    "@media (prefers-reduced-motion: reduce)": {
      "*, *::before, *::after": { animationDuration: "0.01ms !important", transitionDuration: "0.01ms !important", scrollBehavior: "auto !important" },
    },
  };
  const overrides = {
    MuiCssBaseline: { "@global": global },
    MuiButton: { root: { borderRadius: 8, textTransform: "none", fontWeight: 600, letterSpacing: 0, minHeight: 38 }, contained: { boxShadow: "none", "&:hover": { boxShadow: softShadow } }, outlinedPrimary: { borderColor: colors.border, "&:hover": { backgroundColor: colors.selected, borderColor: colors.brandStrong } } },
    MuiIconButton: { root: { color: colors.muted, "&:hover": { backgroundColor: colors.elevated } } },
    MuiPaper: { rounded: { borderRadius: 8 }, elevation1: { boxShadow: softShadow }, outlined: { borderColor: colors.border } },
    MuiCard: { root: { border: `1px solid ${colors.border}`, boxShadow: "none" } },
    MuiDialog: { paper: { borderRadius: 8, backgroundImage: "none" }, paperWidthSm: { width: "calc(100% - 32px)", margin: 16 } },
    MuiDialogTitle: { root: { padding: "20px 24px 16px", borderBottom: `1px solid ${colors.border}` } },
    MuiDialogActions: { root: { padding: "16px 24px", borderTop: `1px solid ${colors.border}`, flexWrap: "wrap", gap: 8 } },
    MuiOutlinedInput: { root: { borderRadius: 8, backgroundColor: colors.surface }, notchedOutline: { borderColor: colors.border }, input: { padding: "14px 12px" }, inputMarginDense: { padding: "11px 12px" } },
    MuiInputLabel: { root: { color: colors.muted } },
    MuiTableCell: { root: { borderBottom: `1px solid ${colors.border}`, padding: "14px 16px", fontSize: 14 }, head: { backgroundColor: colors.elevated, color: colors.muted, fontWeight: 600, whiteSpace: "nowrap" } },
    MuiTableRow: { hover: { "&:hover": { backgroundColor: colors.elevated } } },
    MuiTab: { root: { minHeight: 48, textTransform: "none", fontWeight: 600, letterSpacing: 0, fontSize: 14 } },
    MuiTabs: { indicator: { height: 3, borderRadius: "3px 3px 0 0" } },
    MuiChip: { root: { borderRadius: 6, fontWeight: 500 } },
    MuiTooltip: { tooltip: { borderRadius: 6, fontSize: 12, padding: "8px 10px" } },
    MuiListItem: { root: { "&$selected, &$selected:hover": { backgroundColor: colors.selected } } },
    MuiMenu: { paper: { border: `1px solid ${colors.border}`, boxShadow: softShadow } },
    MuiBottomNavigation: { root: { borderBottom: `1px solid ${colors.border}`, backgroundColor: colors.surface } },
  };
  const components = Object.fromEntries(Object.entries(overrides).filter(([key]) => key !== "MuiCssBaseline").map(([key, styles]) => [key, { styleOverrides: styles }]));
  return {
    mode, palette, shape: { borderRadius: 8 },
    typography: { fontFamily: '"Segoe UI", "Helvetica Neue", Arial, sans-serif', fontSize: 14, allVariants: { letterSpacing: 0 }, h4: { fontWeight: 700 }, h5: { fontWeight: 700 }, h6: { fontWeight: 600 }, button: { textTransform: "none", letterSpacing: 0 } },
    overrides, components,
    scrollbarStyles: { "&::-webkit-scrollbar": { width: 6, height: 6 }, "&::-webkit-scrollbar-thumb": { backgroundColor: colors.border, borderRadius: 8 }, "&::-webkit-scrollbar-thumb:hover": { backgroundColor: colors.muted } },
    scrollbarStylesSoft: { "&::-webkit-scrollbar": { width: 6, height: 6 }, "&::-webkit-scrollbar-thumb": { backgroundColor: colors.border, borderRadius: 8 } },
  };
};
