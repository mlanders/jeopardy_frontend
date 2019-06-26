import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import Skeleton from "react-loading-skeleton";
import { Link } from "react-router-dom";
//Conflux
import { StateProvider, useStateValue } from "react-conflux";
import { userContext, userReducer } from "../../conflux/userReducer";
import { SET_QUESTIONS, SET_CURRENT_GAME } from "../../conflux/constants";
//Components
import history from "../../index";
import NewQuestion from "../questions/NewQuestion";
import QuestionView from "../questions/QuestionView";
//Firebase
let firebase = require("firebase/app");
require("firebase/firestore");
require("firebase/auth");
// firebase.initializeApp(fbaseConfig);
let db = firebase.firestore();

//Component
const GameView = props => {
	const [state, dispatch] = useStateValue(userContext);
	const [currentGame, setCurrentGame] = useState({
		gameName: false,
		author: false
	});

	if (state.currentGame === null) {
		axios
			.get(
				`https://us-central1-jeopardy-firebase.cloudfunctions.net/jeopardy/getGame/${
					props.match.params.id
				}`
			)
			.then(res => {
				console.log(res.data.data);
				dispatch({ type: SET_CURRENT_GAME, payload: res.data.data });
				// setCurrentGame({
				// 	gameName: res.data.data.gameName,
				// 	author: res.data.data.author
				// });
			})
			.catch(err => console.log("ERROR: ", err));
	}

	useEffect(() => {
		db.collection("questions")
			.where("gameID", "==", props.match.params.id)
			.onSnapshot(function(snapshot) {
				// let changes = snapshot.docChanges();
				let update = [];
				snapshot.docs.forEach(doc => {
					let document = doc.data();
					document.id = doc.id;
					update.push(document);
				});
				update.sort(function(a, b) {
					let questionA = a.question.toLowerCase();
					let questionB = b.question.toLowerCase();
					if (questionA < questionB)
						//sort string ascending
						return -1;
					if (questionA > questionB) return 1;
					return 0; //default return value (no sorting)
				});
				dispatch({ type: SET_QUESTIONS, payload: update });
			});
	}, [dispatch, props.match.params.id, state.userProfile.uid]);

	const deleteGame = async () => {
		await axios
			.delete(
				`https://us-central1-jeopardy-firebase.cloudfunctions.net/jeopardy/deleteGame/${
					props.match.params.id
				}`
			)
			.then(res => console.log(res.data))
			.catch(err => console.log("ERROR: ", err));
		history.push("/games");
	};
	console.log(state.currentGame);
	return (
		<StateProvider reducer={userReducer} stateContext={userContext}>
			<GameViewContainer>
				<GameSettings>
					<Link to='/games'>{"<- Back to Games"}</Link>
					<button className='btn danger' onClick={deleteGame}>
						Delete Game
					</button>
				</GameSettings>
				<GameTitle className='container h1'>
					{state.currentGame === null ? (
						<Skeleton />
					) : (
						state.currentGame.gameName
					)}
					<br />
				</GameTitle>
				<NewQuestion
					className='container'
					gameID={props.match.params.id}
					author={currentGame.author}
				/>
				<div className='container'>
					{state.questions.length === 0 ? (
						<div>No questions available. Create one above!</div>
					) : (
						state.questions.map(q => {
							return <QuestionView key={q.id} q={q} />;
						})
					)}
				</div>
			</GameViewContainer>
		</StateProvider>
	);
};

export default GameView;

const GameSettings = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
`;

const GameViewContainer = styled.div`
	max-width: 800px;
	width: 100%;
	margin: 10px auto;
	padding: 10px;
`;
const GameTitle = styled.div`
	display: flex;
	justify-content: space-between;
`;

const H1 = styled.div`
	font-size: 2rem;
	margin-top: 10px;
`;
