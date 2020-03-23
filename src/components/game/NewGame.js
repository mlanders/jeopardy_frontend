import React, { useState } from "react";
import styled from "styled-components";

const axios = require("axios");

const GameView = ({ setGameState, user }) => {
	const [input, setInput] = useState("");

	const addGame = e => {
		e.preventDefault();
		if (input === "") {
			return;
		}
		axios
			.post("https://us-central1-jeopardy-firebase.cloudfunctions.net/jeopardy/addGame", {
				uid: user.uid,
				name: input,
			})
			.then(res => console.log(res.data))
			.catch(err => console.error(err));
		setGameState(false);
		setInput("");
	};
	const handleChange = e => {
		e.preventDefault();
		setInput(e.target.value);
	};
	return (
		<NewGameForm className="container" onSubmit={addGame}>
			<input
				className="input"
				name="name"
				placeholder="Game name"
				value={input}
				onChange={handleChange}
			/>
			<button className="btn success">Add Game</button>
		</NewGameForm>
	);
};

export default GameView;

const NewGameForm = styled.form`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	.input {
		margin: 0 5px;
		width: 180px;
	}
`;
