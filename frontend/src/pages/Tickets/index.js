import React from "react";
import { useParams } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { makeStyles, useTheme } from "@material-ui/core/styles";

import TicketsManager from "../../components/TicketsManagerTabs/";
import Ticket from "../../components/Ticket/";
import ChatizyBrand from "../../components/ChatizyBrand";

const useStyles = makeStyles(theme => ({
	chatContainer: {
		flex: 1,
		padding: theme.spacing(2),
		height: "100%",
		minHeight: 0,
		maxHeight: "100%",
		overflowY: "hidden",
		display: "flex",
		flexDirection: "column",
	},

	contactsWrapper: {
        paddingRight: theme.spacing(1.5),
		display: "flex",
		flex: 1,
		minHeight: 0,
		height: "100%",
		flexDirection: "column",
		overflowY: "hidden",
	},
	messagesWrapper: {
		display: "flex",
		flex: 1,
		minHeight: 0,
		height: "100%",
		flexDirection: "column",
	},
	welcomeMsg: {
		backgroundColor: theme.palette.background.paper,
        borderRadius: theme.chatizy.radius,
        border: `1px solid ${theme.palette.divider}`,
		display: "flex",
		justifyContent: "space-evenly",
		alignItems: "center",
		flex: 1,
		minHeight: 0,
		height: "100%",
		textAlign: "center",
	},
}));

const Chat = () => {

	const classes = useStyles();
	const theme = useTheme();
	const logoSource = `${process.env.REACT_APP_BACKEND_URL}/public/logotipos/${theme.palette.type === "light" ? "interno.png" : "logo_w.png"}`;
	const { ticketId } = useParams();

	return (
		<div className={classes.chatContainer}>
			<Grid container spacing={0} style={{ flex: 1, minHeight: 0, height: "100%" }}>
				<Grid item xs={4} className={classes.contactsWrapper}>
					<TicketsManager />
				</Grid>
				<Grid item xs={8} className={classes.messagesWrapper}>
					{ticketId ? (
						<Ticket />
					) : (
						<Paper variant="outlined" className={classes.welcomeMsg}>
							<ChatizyBrand size="large" source={logoSource} />
						</Paper>
					)}
				</Grid>
			</Grid>
		</div>
	);
};

export default Chat;
