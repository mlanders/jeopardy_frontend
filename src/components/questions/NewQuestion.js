import React, { useState } from 'react';
import styled from 'styled-components';
import { useStateValue } from 'react-conflux';
import { userContext } from '../../conflux/userReducer';
const axios = require('axios');

const NewQuestion = props => {
    // const [state] = useStateValue(userContext);
    const [input, setInput] = useState({
        question: '',
        answer: ''
    });
    const addQuestion = e => {
        console.log(props.author);
        e.preventDefault();
        if (input.question === '' || input.answer === '') {
            console.log('Invalid Input');
            return;
        }
        axios
            .post(
                'https://us-central1-jeopardy-firebase.cloudfunctions.net/jeopardy/addQuestion',
                {
                    uid: props.author,
                    question: input.question,
                    answer: input.answer,
                    gameID: props.gameID
                }
            )
            .then(res => console.log(res.data))
            .catch(err => console.log('ERROR: ', err));

        setInput({ question: '', answer: '' });
    };
    const handleChange = e => {
        e.preventDefault();
        const { name, value } = e.target;
        setInput({ ...input, [name]: value });
    };
    return (
        <NewQuestionForm className="container" onSubmit={addQuestion}>
            <input
                name="question"
                placeholder="Question"
                value={input.question}
                onChange={handleChange}
            />
            <input
                name="answer"
                placeholder="Answer"
                value={input.answer}
                onChange={handleChange}
            />
            <button>Add Question</button>
        </NewQuestionForm>
    );
};

export default NewQuestion;

const NewQuestionForm = styled.form`
    margin: 10px 0;
`;
