import React from 'react';
import axios from 'axios';
import { StateProvider, useStateValue } from 'react-conflux';
import { userContext, userReducer } from '../../conflux/userReducer';
import history from '../../index';

const GameView = (props, db) => {
    const [state] = useStateValue(userContext);
    let game = state.games.filter(game => {
        return game.id === props.match.params.id;
    });

    const deleteGame = async () => {
        await axios
            .delete(
                `https://us-central1-jeopardy-firebase.cloudfunctions.net/jeopardy/deleteGame/${
                    game[0].id
                }`
            )
            .then(res => console.log(res.data))
            .catch(err => console.log('ERROR: ', err));
        history.push('/games');
    };
    if (game.length === 0) {
        history.push('/games');
    } else {
        return (
            <StateProvider reducer={userReducer} stateContext={userContext}>
                <div>
                    <p>Game ID: {game[0].id}</p>
                    <p>Game Name: {game[0].gameName}</p>
                    <p>Game Author: {game[0].author}</p>
                    <button onClick={deleteGame}>Delete Game</button>
                </div>
            </StateProvider>
        );
    }
};

export default GameView;
