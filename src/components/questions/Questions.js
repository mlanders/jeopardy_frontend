import React, { useEffect, useState } from 'react';
import axios from 'axios';
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
        points: [],
        selectedTags: [],
        tags: []
    });
    const [visible, setVisible] = useState({
        newQuestion: false,
        filter: false
    });

    // database listener for changes to questions and sets the questions to state
    useEffect(() => {
        db.collection('questions')
            .where('author', '==', state.userProfile.uid)
            .onSnapshot(function(snapshot) {
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

    // sets the tags for all questions to the filter.tags array
    // doesn't not add duplicate tags
    if (state.questions.length > 0) {
        state.questions.forEach(question =>
            question.tags.forEach(tag => {
                if (filter.tags.includes(tag) === false) {
                    filter.tags.push(tag);
                }
            })
        );
    }

    const handleChange = e => {
        e.preventDefault();
        const { name, value } = e.target;

        setFilter({
            ...filter,
            [name]: [...filter[name], value]
        });
    };

    const handleFilter = e => {
        e.preventDefault();
        const { points, selectedTags } = filter;
        axios
            .post(
                'https://us-central1-jeopardy-firebase.cloudfunctions.net/jeopardy/filterQuestions',
                {
                    uid: state.userProfile.uid,
                    tags: selectedTags,
                    points: points
                }
            )
            .then(res => {
                console.log(res.data.data);
                dispatch({
                    type: SET_QUESTIONS_FILTERED,
                    payload: res.data.data
                });
            })
            .catch(err => console.log('ERROR: ', err));
        setFilter({ ...filter, points: [], selectedTags: [] });
    };

    const clearFilter = e => {
        e.preventDefault();
        const data = [];
        dispatch({ type: SET_QUESTIONS_FILTERED, payload: data });
    };
    const toggleQuestion = () => {
        setVisible({ ...visible, question: !visible.question });
    };
    const toggleFilter = () => {
        setVisible({ ...visible, filter: !visible.filter });
    };
    return (
        <QuestionsContainer>
            <ButtonContainer>
                <button className="btn primary" onClick={toggleQuestion}>
                    New Question
                </button>
                <button className="btn primary" onClick={toggleFilter}>
                    Filter
                </button>
            </ButtonContainer>
            {visible.question ? (
                <NewQuestion
                    author={state.userProfile.uid}
                    toggleQuestion={toggleQuestion}
                />
            ) : null}
            {visible.filter ? (
                <div className="container">
                    <form>
                        <FilterRow>
                            <Tag
                                name="points"
                                value="200"
                                onClick={handleChange}>
                                $200
                            </Tag>
                            <Tag
                                name="points"
                                value="400"
                                onClick={handleChange}>
                                $400
                            </Tag>
                            <Tag
                                name="points"
                                value="600"
                                onClick={handleChange}>
                                $600
                            </Tag>
                            <Tag
                                name="points"
                                value="800"
                                onClick={handleChange}>
                                $800
                            </Tag>
                            <Tag
                                name="points"
                                value="1000"
                                onClick={handleChange}>
                                $1000
                            </Tag>
                        </FilterRow>
                        <FilterRow>
                            {filter.tags.map((tag, index) => (
                                <Tag
                                    key={index}
                                    name="selectedTags"
                                    value={tag}
                                    onClick={handleChange}>{`${tag}`}</Tag>
                            ))}
                        </FilterRow>

                        <button className="btn primary" onClick={handleFilter}>
                            Filter
                        </button>
                        <button className="btn primary" onClick={clearFilter}>
                            Clear
                        </button>
                    </form>
                </div>
            ) : null}
            <div className="container">
                {state.questionsFiltered.length > 0 ? (
                    state.questionsFiltered.map(q => {
                        return <QuestionView key={q.id} q={q} />;
                    })
                ) : state.questions.length === 0 ? (
                    <div>No questions available. Create one above!</div>
                ) : (
                    state.questions.map(q => {
                        return <QuestionView key={q.id} q={q} />;
                    })
                )}
            </div>
        </QuestionsContainer>
    );
};

export default Questions;
const ButtonContainer = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
`;
const QuestionsContainer = styled.div`
    max-width: 800px;
    width: 100%;
    margin: 10px auto;
    /* padding: 10px; */
`;
const Tag = styled.button`
    background-color: #5bc0de;
    color: #fff;
    font-size: 1rem;
    padding: 4px 4px;
    border-radius: 4px;
    margin: 5px 5px 5px 0;
    width: auto;
    cursor: pointer;
`;
const FilterRow = styled.div`
    height: 50px;
`;
