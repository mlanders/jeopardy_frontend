import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
//Comflux
import { useStateValue } from "react-conflux";
import { userContext } from "../../conflux/userReducer";
import { SET_CURRENT_GAME } from "../../conflux/constants";

//Components
import NewGame from "./NewGame";

//Component
const Games = ({ db }) => {
	const [state, dispatch] = useStateValue(userContext);
	const [gameState, setGameState] = useState(false);
	const setCurrentGame = game => {
		dispatch({ type: SET_CURRENT_GAME, payload: game });
	};
	return (
		<Styles>
			{gameState ? (
				<div className='newGameWrapper'>
					<NewGame user={state.userProfile} />
					{/* <button
							className='btn primary close'
							onClick={() => setGameState(false)}
						>
							Close
						</button> */}
				</div>
			) : (
				<button className='btn primary open' onClick={() => setGameState(true)}>
					New Game
				</button>
			)}
			{state.games.length === 0 ? (
				<div>No games available.</div>
			) : (
				state.games.map(game => {
					return (
						<StyledLink
							activeClassName='selected'
							key={game.id}
							to={`/games/${game.id}`}
							onClick={() => setCurrentGame(game)}
						>
							{game.gameName}
						</StyledLink>
					);
				})
			)}
		</Styles>
	);
};

export default Games;

const Styles = styled.div`
	display: flex;
	flex-direction: row;

	/* max-width: 800px; */
	/* width: 100%;
	margin: 0 auto; */
	/* padding: 10px; */
	background-color: #fff;
	box-shadow: 1px 1px 4px gray;
	margin: 0 0 10px 0;
	padding: 10px;
	max-width: 335px;
	width: 100%;
	/* width: 400px; */
	height: 100vh;
	display: flex;
	flex-direction: column;
	background-color: #313638;
	.gamesRight {
	}
	.selected {
		background-color: #337ab7;
		color: #fff;
	}

	.newGameWrapper {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: center;
	}
	.close {
		border-radius: 0px;
		margin: 0 0 10px 0;
	}
	.open {
		border-radius: 0px;
		margin: 0 0 10px 0;
	}
`;
// const NewGameWrapper = styled.div`
// `;

// const GamesContainer = styled.div`
// `;

const StyledLink = styled(Link)`
	background-color: #fff;
	color: #337ab7;
	display: flex;
	flex-direction: column;
	width: 100%;
	padding: 10px;
	text-decoration: none;

	:hover {
		background-color: #337ab7;
		color: #fff;
	}
`;
