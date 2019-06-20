import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
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
        points: '',
        selectedTags: [],
        tags: []
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
                dispatch({ type: SET_QUESTIONS_FILTERED, payload: update });
            });
    }, [dispatch, state.userProfile.uid]);

    const handleChange = e => {
        const { name, value } = e.target;
        console.log(name, value);
        if (name === undefined) {
            //Need to figure out why these items are showing up as undefined
            // need to remove it from selectedTags when clicking on it again
            setFilter({
                ...filter,
                selectedTags: [...filter.selectedTags, value]
            });
        } else {
            setFilter({ ...filter, [name]: value });
        }
    };

    state.questions.forEach(question =>
        question.tags.forEach(tag => {
            if (filter.tags.includes(tag)) {
                return null;
            } else {
                filter.tags.push(tag);
            }
        })
    );
    const handleFilter = () => {
        const { points, tags } = filter;
        if (points && tags.length === 0) {
            let filtered = state.questions.filter(
                question => question.points === points
            );
            dispatch({ type: SET_QUESTIONS_FILTERED, payload: filtered });
        } else {
            let filtered = state.questions.filter(
                question =>
                    question.points === points &&
                    question.tags.some(t => tags.include(t))
            );
            dispatch({ type: SET_QUESTIONS_FILTERED, payload: filtered });
        }
    };

    return (
        <div>
            <NewQuestion />
            <div className="container">
                <form>
                    <label htmlFor="points">Filter by points</label>
                    <select name="points" id="points" onChange={handleChange}>
                        <option name="points" value="">
                            -- All --
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
                    <div>
                        {filter.tags.map((tag, index) => (
                            <Tag
                                key={index}
                                name="selectedTags"
                                value={tag}
                                onClick={handleChange}>{`${tag}`}</Tag>
                        ))}
                    </div>

                    <button className="primary" onClick={handleFilter}>
                        Filter
                    </button>
                </form>
            </div>
            <div className="container">
                {state.questionsFiltered.length === 0 ? (
                    <div>No questions available. Create one above!</div>
                ) : (
                    state.questionsFiltered.map(q => {
                        return <QuestionView key={q.id} q={q} />;
                    })
                )}
            </div>
        </div>
    );
};

export default Questions;

const Tag = styled.span`
    background-color: #5bc0de;
    color: #fff;
    font-size: 1rem;
    padding: 4px 4px;
    border-radius: 4px;
    margin: 5px 5px 5px 0;
    width: auto;
    cursor: pointer;
`;
