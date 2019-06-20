import React, { useEffect, useState } from 'react';
//Conflux
import { useStateValue } from 'react-conflux';
import { userContext } from '../../conflux/userReducer';
import { SET_QUESTIONS, SET_QUESTIONS_FILTERED } from '../../conflux/constants';
//Components
import QuestionView from './QuestionView';
import NewQuestion from './NewQuestion';
//Firebase
let firebase = require('firebase/app');
require('firebase/firestore');
require('firebase/auth');
// firebase.initializeApp(fbaseConfig);
let db = firebase.firestore();

const Questions = () => {
    const [state, dispatch] = useStateValue(userContext);
    const [filter, setFilter] = useState({
        points: ''
    });

    useEffect(() => {
        db.collection('questions')
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
    }, [dispatch, state.userProfile.uid]);

    const handleChange = e => {
        const { name, value } = e.target;
        setFilter({ ...filter, [name]: value });
        let filtered = state.questions.filter(
            question => question.points === value
        );
        dispatch({ type: SET_QUESTIONS_FILTERED, payload: filtered });
    };
    let displayQuestions = [];
    if (state.questionsFiltered) {
        displayQuestions = state.questionsFiltered;
    } else {
        displayQuestions = state.questions;
    }

    console.log('Filter: ', filter.points);
    return (
        <div>
            <NewQuestion />
            <div className="container">
                <label htmlFor="points">Filter by points</label>
                <select name="points" id="points" onChange={handleChange}>
                    <option name="points" value="all">
                        -- Select One --
                    </option>
                    <option name="points" value="200">
                        $200
                    </option>
                    <option name="points" value="400">
                        $400
                    </option>
                    <option name="points" value="600">
                        $600
                    </option>
                    <option name="points" value="800">
                        $800
                    </option>
                    <option name="points" value="1000">
                        $1000
                    </option>
                </select>
            </div>
            <div className="container">
                {displayQuestions.length === 0 ? (
                    <div>No questions available. Create one above!</div>
                ) : (
                    displayQuestions.map(q => {
                        return <QuestionView key={q.id} q={q} />;
                    })
                )}
            </div>
        </div>
    );
};

export default Questions;
