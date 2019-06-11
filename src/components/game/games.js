import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import NewGame from './newGame';
import QuestionView from './questionView';
import GameView from './gameView';

import { StateProvider, useStateValue } from 'react-conflux';
import { userReducer } from '../../store/reducers/userReducer';
import { userContext } from '../../store/context';
import { SET_GAMES } from '../../store/constants';

const Games = ({ db, user }) => {
    const [state, dispatch] = useStateValue(userContext);

    useEffect(() => {
        db.collection('games')
            .where('author', '==', user.uid)
            .onSnapshot(function(snapshot) {
                // let changes = snapshot.docChanges();
                let update = [];
                snapshot.docs.forEach(doc => {
                    let document = doc.data();
                    document.id = doc.id;
                    update.push(document);
                });
                // setData(update);
                dispatch({ type: SET_GAMES, payload: update });
            });
    }, [db, dispatch, user.uid]);

    return (
        <StateProvider reducer={userReducer} stateContext={userContext}>
            <div>
                <NewGame user={user} />
                <QuestionView />
                <h1>Games</h1>
                <ul>
                    {state.games.map(game => {
                        return (
                            // <p>{game.gameName}</p>
                            <li key={game.id}>
                                <Link to={`/games/${game.id}`}>
                                    {game.gameName}
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </StateProvider>
    );
};

export default Games;
