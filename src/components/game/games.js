import React, { useEffect } from 'react';
import axios from 'axios';
import { Link, Redirect } from 'react-router-dom';
import history from '../../index';
import NewGame from './newGame';

import { StateProvider, useStateValue } from 'react-conflux';
import { userContext, userReducer } from '../../conflux/userReducer';
import { SET_USER, SET_GAMES } from '../../conflux/constants';

const Games = ({ db }) => {
    const [state, dispatch] = useStateValue(userContext);
    // console.log('GAMES COMPONENT: ', state);
    useEffect(() => {
        db.collection('games')
            .where('author', '==', state.userProfile.uid)
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
    }, [db, dispatch, state.userProfile.uid]);

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
