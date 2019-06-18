import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import NewGame from './newGame';

import { useStateValue } from 'react-conflux';
import { userContext } from '../../conflux/userReducer';

const Games = ({ db }) => {
    const [state] = useStateValue(userContext);

    const renderGames = () => {
        if (state.games === []) {
            return;
        }
    };

    return (
        <GamesContainer>
            <div className="container h1">Games</div>
            <NewGame user={state.userProfile} />
            <div className="container ">
                {state.games.length === 0 ? (
                    <div>No games available. Create on above!</div>
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
        </GamesContainer>
    );
};

export default Games;

const GamesContainer = styled.div`
    max-width: 800px;
    width: 100%;
    margin: 0 auto;
    padding: 10px;
`;

const StyledLink = styled(Link)`
    background-color: #fff;
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 10px;
    text-decoration: none;

    :hover {
        background-color: blue;
        color: #fff;
    }
`;
