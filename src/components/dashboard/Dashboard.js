import React, { useEffect } from "react";
import { Route } from "react-router-dom";
import { GlobalStyles } from "../../styles";
import styled from "styled-components";

//Conflux
import { useStateValue } from "react-conflux";
import { userContext } from "../../conflux/userReducer";
import { SET_USER, SET_GAMES } from "../../conflux/constants";
//Components
import Login from "../authentication/login";
import UserInfo from "../user/UserInfo.js";
import GameView from "../game/GameView";

import Games from "../game/Games";
import Questions from "../questions/Questions";
import NavBar from "../navigation/NavBar";
// import Sidebar from "./Sidebar";

//Firebase
require("firebase/firestore");
require("firebase/auth");
let firebase = require("firebase/app");
firebase.auth().useDeviceLanguage();
let db = firebase.firestore();

//Component
function Dashboard(props) {
	const [state, dispatch] = useStateValue(userContext);

	useEffect(() => {
		firebase.auth().onAuthStateChanged(function(user) {
			if (user) {
				// User is signed in.
				let userProfile = {
					uid: user.uid,
					email: user.email,
					photo: user.photoURL,
					name: user.displayName,
				};
				// setUser(userProfile);
				dispatch({ type: SET_USER, payload: userProfile });
				// console.log("Already signed in!", userProfile);
			} else {
				// No user is signed in.
				console.log("Not signed in!");
			}
		});
	}, [dispatch, state.userProfile.uid]);

	useEffect(() => {
		db.collection("games")
			.where("author", "==", state.userProfile.uid)
			.onSnapshot(function(snapshot) {
				// let changes = snapshot.docChanges();
				let update = [];
				snapshot.docs.forEach(doc => {
					let document = doc.data();
					document.id = doc.id;
					update.push(document);
				});
				update.sort(function(a, b) {
					let gameA = a.gameName.toLowerCase();
					let gameB = b.gameName.toLowerCase();
					if (gameA < gameB)
						//sort string ascending
						return -1;
					if (gameA > gameB) return 1;
					return 0; //default return value (no sorting)
				});
				dispatch({ type: SET_GAMES, payload: update });
			});
	}, [dispatch, state.userProfile.uid]);

	return (
		<>
			<GlobalStyles />
			<NavBar />
			{state.userProfile.uid !== "" ? (
				<div className="body">
					{/* <Sidebar /> */}
					<Route path="/" render={props => <Games {...props} />} />
					<Route exact path="/user" render={props => <UserInfo {...props} />} />
					<Route path="/games/:id" render={props => <GameView {...props} db={props.db} />} />
					<Route exact path="/questions" render={props => <Questions {...props} />} />
				</div>
			) : null}
		</>
	);
}

export default Dashboard;
