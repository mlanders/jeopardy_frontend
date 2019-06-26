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
			<div className='gameSidebar '>
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
			</div>
			{gameState ? (
				<div className='newGameWrapper'>
					<NewGame user={state.userProfile} />
					<button
						className='btn primary close'
						onClick={() => setGameState(false)}
					>
						Close
					</button>
				</div>
			) : (
				<button className='btn primary open' onClick={() => setGameState(true)}>
					New Game
				</button>
			)}
		</Styles>
	);
};

export default Games;

const Styles = styled.div`
	display: flex;
	flex-direction: row;
	/* max-width: 800px; */
	width: 100%;
	margin: 0 auto;
	/* padding: 10px; */
	.selected {
		background-color: #337ab7;
		color: #fff;
	}
	.gameSidebar {
		width: 400px;
		height: 100vh;
		display: flex;
		flex-direction: column;
		background-color: #313638;
	}
	.newGameWrapper {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
	}
	.close {
		height: 59px;
	}
	.open {
		height: 59px;
		justify-content: flex-end;
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
