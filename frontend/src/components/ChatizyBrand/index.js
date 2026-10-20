import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import mark from "../../assets/chatizy-mark.png";

const useStyles = makeStyles(theme => ({
  brand: { display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 10, color: theme.palette.text.primary, flexShrink: 0 },
  mark: { width: 36, height: 36, objectFit: "contain" },
  word: { fontSize: 25, lineHeight: 1.2, fontWeight: 700, letterSpacing: 0 },
  large: { gap: 14, "& img": { width: 60, height: 60 }, "& span": { fontSize: 38 } },
  compact: { "& img": { width: 30, height: 30 }, "& span": { fontSize: 22 } },
  tenant: { maxWidth: "80%", maxHeight: 96, objectFit: "contain" },
}));

export default function ChatizyBrand({ size = "regular", symbolOnly = false, className = "", source }) {
  const classes = useStyles();
  const [failedSource, setFailedSource] = useState(null);
  if (source && source !== failedSource) {
    return <img className={`${classes.tenant} ${className}`} src={source} alt="Logo" onError={() => setFailedSource(source)} />;
  }
  return <div className={`${classes.brand} ${classes[size] || ""} ${className}`} aria-label="Chatizy">
    <img className={classes.mark} src={mark} alt="" width={60} height={60} />
    {!symbolOnly && <span className={classes.word}>Chatizy</span>}
  </div>;
}
