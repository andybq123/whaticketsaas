import React from "react";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
	MainHeaderButtonsWrapper: {
		display: "flex",
        alignItems: "center",
        flexWrap: "wrap",
        gap: theme.spacing(1),
        minWidth: 0,
        [theme.breakpoints.down("xs")]: { width: "100%", marginLeft: 0 },
        flex: "none",
		marginLeft: "auto",
		"& > *": {
			margin: 0,
		},
	},
}));

const MainHeaderButtonsWrapper = ({ children }) => {
	const classes = useStyles();

	return <div className={classes.MainHeaderButtonsWrapper}>{children}</div>;
};

export default MainHeaderButtonsWrapper;
