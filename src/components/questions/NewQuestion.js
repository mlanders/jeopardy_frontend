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
        <Styles className="container">
            <div className="h3">Add Question</div>
            <div className="NewQuestionForm" onSubmit={addQuestion}>
                <div className="InputContainer">
                    <label for="question">Question</label>
                    <input
                        className="input"
                        name="question"
                        placeholder="Question"
                        value={input.question}
                        onChange={handleChange}
                    />
                </div>
                <div className="InputContainer">
                    <label for="answer">Answer</label>
                    <input
                        className="input"
                        name="answer"
                        placeholder="Answer"
                        value={input.answer}
                        onChange={handleChange}
                    />
                </div>
                <div className="InputContainer">
                    <label for="tags">Tags</label>
                    <input
                        className="input"
                        name="tags"
                        placeholder="Tags"
                        value={input.answer}
                        onChange={handleChange}
                    />
                </div>
            </div>
            <button className="btn success">Add Question</button>
        </Styles>
    );
};

export default NewQuestion;

const Styles = styled.div`
    display: flex;
    flex-direction: column;
    .NewQuestionForm {
        display: flex;
        justify-content: space-between;
        margin: 10px 0;
    }
    .InputContainer {
        width: 200px;
        display: flex;
        flex-direction: column;
    }
    .btn {
        width: auto;
        align-self: flex-end;
    }
`;
