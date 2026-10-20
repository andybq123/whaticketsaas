import React from "react";
import Typography from "@material-ui/core/Typography";

export default function Title(props) {
	return (
		<Typography variant="h5" color="textPrimary" component="h1">
			{props.children}
		</Typography>
	);
}
