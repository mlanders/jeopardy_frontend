import React, { useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { StateProvider, useStateValue } from 'react-conflux';
import { userContext, userReducer } from '../../conflux/userReducer';
import history from '../../index';
import NewQuestion from './newQuestion';
import { SET_QUESTIONS } from '../../conflux/constants';
import QuestionView from './questionView';
import { Redirect } from 'react-router-dom';

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
        return <Redirect to="/" />;
    } else {
        return (
            <StateProvider reducer={userReducer} stateContext={userContext}>
                <GameViewContainer>
                    <Link to="/games">{'<- Back to Games'}</Link>
                    <H1>{game[0].gameName}</H1>
                    <br />
                    <button onClick={deleteGame}>Delete Game</button>
                    <NewQuestion gameID={props.match.params.id} />
                    {state.questions.map(q => {
                        console.log(q);
                        return <QuestionView q={q} />;
                    })}
                </GameViewContainer>
            </StateProvider>
        );
    }
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
