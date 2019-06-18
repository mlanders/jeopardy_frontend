import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { StateProvider, useStateValue } from 'react-conflux';
import { userContext, userReducer } from '../../conflux/userReducer';
import history from '../../index';
import NewQuestion from './newQuestion';
import { SET_QUESTIONS } from '../../conflux/constants';
import QuestionView from './questionView';
import Skeleton from 'react-loading-skeleton';

//Firebase
let firebase = require('firebase/app');
require('firebase/firestore');
require('firebase/auth');
// firebase.initializeApp(fbaseConfig);
let db = firebase.firestore();

const GameView = props => {
    const [state, dispatch] = useStateValue(userContext);
    const [currentGame, setCurrentGame] = useState({
        gameName: false,
        author: false
    });

    if (currentGame.author === false) {
        axios
            .get(
                `https://us-central1-jeopardy-firebase.cloudfunctions.net/jeopardy/getGame/${
                    props.match.params.id
                }`
            )
            .then(res => {
                setCurrentGame({
                    gameName: res.data.data.gameName,
                    author: res.data.data.author
                });
            })
            .catch(err => console.log('ERROR: ', err));
    }

    useEffect(() => {
        db.collection('questions')
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
    }, [dispatch, props.match.params.id, state.userProfile.uid]);

    const deleteGame = async () => {
        await axios
            .delete(
                `https://us-central1-jeopardy-firebase.cloudfunctions.net/jeopardy/deleteGame/${
                    props.match.params.id
                }`
            )
            .then(res => console.log(res.data))
            .catch(err => console.log('ERROR: ', err));
        history.push('/games');
    };
    return (
        <StateProvider reducer={userReducer} stateContext={userContext}>
            <GameViewContainer>
                <Link to="/games">{'<- Back to Games'}</Link>
                <div className="container h1">
                    {currentGame.gameName || <Skeleton />}
                    <br />
                    <button onClick={deleteGame}>Delete Game</button>
                </div>
                <NewQuestion
                    className="container"
                    gameID={props.match.params.id}
                />
                <div className="container">
                    {state.questions.map(q => {
                        return <QuestionView key={q.id} q={q} />;
                    })}
                </div>
            </GameViewContainer>
        </StateProvider>
    );
};

export default GameView;

const GameViewContainer = styled.div`
    max-width: 800px;
    width: 100%;
    margin: 10px auto;
    padding: 10px;
`;

const H1 = styled.div`
    font-size: 2rem;
    margin-top: 10px;
`;
