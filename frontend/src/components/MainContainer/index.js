import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

const useStyles = makeStyles(theme => ({
	mainContainer: {
		flex: 1,
		padding: theme.spacing(3),
		height: "100%",
        minHeight: 0,
        minWidth: 0,
        [theme.breakpoints.down("sm")]: { padding: theme.spacing(2) },
		display: "flex",
		flexDirection: "column",
	},

	contentWrapper: {
		minHeight: 0,
        height: "100%",
		width: "100%",
		overflowY: "hidden",
		display: "flex",
		flexDirection: "column",
		flex: 1,
	},
}));

const MainContainer = ({ children }) => {
	const classes = useStyles();

	return (
		<Container className={classes.mainContainer} maxWidth={false} disableGutters>
			<div className={classes.contentWrapper}>{children}</div>
		</Container>
	);
};

export default MainContainer;
