import React, { useEffect } from 'react';
import axios from 'axios';
import { StateProvider, useStateValue } from 'react-conflux';
import { userContext, userReducer } from '../../conflux/userReducer';
import history from '../../index';
import NewQuestion from './newQuestion';
import { SET_QUESTIONS } from '../../conflux/constants';
import QuestionView from './questionView';

const GameView = props => {
    const [state, dispatch] = useStateValue(userContext);
    let game = state.games.filter(game => {
        return game.id === props.match.params.id;
    });

    useEffect(() => {
        props.db
            .collection('questions')
            .where('gameID', '==', props.match.params.id)
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
    }, [dispatch, props.db, props.match.params.id, state.userProfile.uid]);

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
                    <NewQuestion gameID={props.match.params.id} />
                    {state.questions.map(q => {
                        console.log(q);
                        return <QuestionView q={q} />;
                    })}
                </div>
            </StateProvider>
        );
    }
};

export default GameView;
