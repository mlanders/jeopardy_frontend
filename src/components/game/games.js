import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
//Comflux
import { useStateValue } from 'react-conflux';
import { userContext } from '../../conflux/userReducer';
//Components
import NewGame from './NewGame';

//Component
const Games = ({ db }) => {
    const [state] = useStateValue(userContext);
    const [gameState, setGameState] = useState(false);

    return (
        <Styles>
            {gameState ? (
                <div className="newGameWrapper">
                    <NewGame user={state.userProfile} />
                    <button
                        className="btn primary close"
                        onClick={() => setGameState(false)}>
                        Close
                    </button>
                </div>
            ) : (
                <button
                    className="btn primary open"
                    onClick={() => setGameState(true)}>
                    New Game
                </button>
            )}
            <div className="container ">
                {state.games.length === 0 ? (
                    <div>No games available. Create one above!</div>
                ) : (
                    state.games.map(game => {
                        return (
                            <StyledLink key={game.id} to={`/games/${game.id}`}>
                                {game.gameName}
                            </StyledLink>
                        );
                    })
                )}
            </div>
        </Styles>
    );
};

export default Games;

const Styles = styled.div`
    max-width: 800px;
    width: 100%;
    margin: 0 auto;
    /* padding: 10px; */
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
