import React from 'react';
import { Link } from 'react-router-dom';
import NewGame from './newGame';

import { StateProvider, useStateValue } from 'react-conflux';
import { userContext, userReducer } from '../../conflux/userReducer';

const Games = ({ db }) => {
    const [state] = useStateValue(userContext);
    console.log('GAMES COMPONENT: ', state);

    return (
        <div>
            <NewGame user={state.userProfile} />
            <h1>Games</h1>
            <ul>
                {state.games.map(game => {
                    return (
                        <li key={game.id}>
                            <Link to={`/games/${game.id}`}>
                                {game.gameName}
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default Games;
