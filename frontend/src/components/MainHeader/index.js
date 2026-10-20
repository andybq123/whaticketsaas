import React from "react";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
	contactsHeader: {
		display: "flex",
		alignItems: "center",
		padding: theme.spacing(0, 0, 2),
        gap: theme.spacing(2),
        flexWrap: "wrap",
        flexShrink: 0,
        minHeight: 64,
        borderBottom: `1px solid ${theme.palette.divider}`,
        marginBottom: theme.spacing(2),
	},
}));

const MainHeader = ({ children }) => {
	const classes = useStyles();

	return <div className={classes.contactsHeader}>{children}</div>;
};

export default MainHeader;
