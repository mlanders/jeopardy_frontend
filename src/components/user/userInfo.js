import React from "react";
import styled from "styled-components";
import { useStateValue } from "react-conflux";
import { userContext } from "../../conflux/userReducer";

// Material UI
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles(theme => ({
	paper: {
		margin: 10,
		padding: 10,
		width: "100%",
	},
}));

const UserInfo = () => {
	const classes = useStyles();

	const [state] = useStateValue(userContext);

	return (
		<Paper elevation={3} className={classes.paper}>
			<H1>{state.userProfile.name}</H1>
			<UID>UID: {state.userProfile.uid}</UID>
			<UserImg src={state.userProfile.photo} alt={state.userProfile.name} />
		</Paper>
	);
};

export default UserInfo;

const UserImg = styled.img`
	width: 100px;
	border-radius: 4px;
	margin-top: 10px;
`;
const H1 = styled.div`
	font-size: 2rem;
`;

const UID = styled.p`
	color: lightgray;
`;
