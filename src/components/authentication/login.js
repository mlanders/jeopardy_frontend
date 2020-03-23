import React from "react";
import history from "../../index";
import styled from "styled-components";
import { useStateValue } from "react-conflux";
import { userContext } from "../../conflux/userReducer";
import { SET_USER } from "../../conflux/constants";

// Material  UI
import Button from "@material-ui/core/Button";
import { IconButton } from "@material-ui/core";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

//Firebase
import firebase from "./firebase";
require("firebase/firestore");
require("firebase/auth");
let provider = new firebase.auth.GoogleAuthProvider();
firebase.auth().useDeviceLanguage();

const Login = () => {
	const [state, dispatch] = useStateValue(userContext);

	const handleLogin = () => {
		firebase
			.auth()
			.signInWithPopup(provider)
			.then(function(result) {
				// This gives you a Google Access Token. You can use it to access the Google API.
				// let token = result.credential.accessToken;
				// The signed-in user info.
				let user = result.user;
				let userProfile = {
					uid: user.uid,
					email: user.email,
					photo: user.photoURL,
					name: user.displayName,
				};

				dispatch({ type: SET_USER, payload: userProfile });
				history.push("/");
			})
			.catch(function(error) {
				// Handle Errors here.
				let errorCode = error.code;
				let errorMessage = error.message;
				// The email of the user's account used.
				let email = error.email;
				// The firebase.auth.AuthCredential type that was used.
				let credential = error.credential;

				console.error("Login Error: ", errorCode, errorMessage, email, credential);
				// ...
			});
	};
	const handleLogout = () => {
		firebase
			.auth()
			.signOut()
			.then(function() {
				// Sign-out successful.
				let userProfile = {
					uid: "",
					email: "",
					photo: "",
					name: "",
				};
				dispatch({ type: SET_USER, payload: userProfile });
				history.push("/");
				console.log("Signout success!");
			})
			.catch(function(error) {
				// An error happened.
				console.error("Signout Error", error);
			});
	};

	return state.userProfile.uid ? (
		<IconButton
			aria-label="delete"
			color="primary"
			onClick={state.userProfile.uid ? () => handleLogout() : null}
		>
			<ExitToAppIcon />
		</IconButton>
	) : (
		<Button variant="contained" onClick={state.userProfile.uid ? null : () => handleLogin()}>
			Login
		</Button>
	);

	// <Styles>
	//     <div
	//         className="LoginButton"
	//         onClick={
	//             state.userProfile.uid
	//                 ? () => handleLogout()
	//                 : () => handleLogin()
	//         }>
	//         {state.userProfile.uid ? `Logout` : `Login`}
	//     </div>
	// </Styles>
};
const Styles = styled.div`
	.LoginButton {
		width: 70px;
		padding: 5px 10px;
		margin: 20px;
		text-align: center;
		border: 1px solid black;
		border-radius: 4px;
		cursor: pointer;
		background-color: #fff;
	}
`;

export default Login;
