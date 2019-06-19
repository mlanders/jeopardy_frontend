import React, { useEffect } from 'react';
//Conflux
import { useStateValue } from 'react-conflux';
import { userContext } from '../../conflux/userReducer';
import { SET_QUESTIONS } from '../../conflux/constants';
//Components
import QuestionView from './QuestionView';
//Firebase
let firebase = require('firebase/app');
require('firebase/firestore');
require('firebase/auth');
// firebase.initializeApp(fbaseConfig);
let db = firebase.firestore();

const Questions = () => {
    const [state, dispatch] = useStateValue(userContext);

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

    return (
        <div>
            <div className="container">
                {state.questions.length === 0 ? (
                    <div>No questions available. Create one above!</div>
                ) : (
                    state.questions.map(q => {
                        return <QuestionView key={q.id} q={q} />;
                    })
                )}
            </div>
        </div>
    );
};

export default Questions;
