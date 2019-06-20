import React, { useState } from 'react';
import styled from 'styled-components';
import { useStateValue } from 'react-conflux';
import { userContext } from '../../conflux/userReducer';
const axios = require('axios');

const NewQuestion = props => {
    // const [state] = useStateValue(userContext);
    const [input, setInput] = useState({
        question: '',
        answer: '',
        tags: '',
        points: '200'
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
                    tags: input.tags,
                    points: input.points,
                    gameID: props.gameID
                }
            )
            .then(res => console.log(res.data))
            .catch(err => console.log('ERROR: ', err));

        setInput({ question: '', answer: '', tags: '' });
    };
    const handleChange = e => {
        e.preventDefault();
        const { name, value } = e.target;
        setInput({ ...input, [name]: value });
    };
    return (
        <Styles className="container">
            <div className="h3">Add Question</div>
            <form className="NewQuestionForm" onSubmit={addQuestion}>
                <div className="InputContainer">
                    <label htmlFor="question">Question</label>
                    <input
                        className="input"
                        name="question"
                        placeholder="Question"
                        value={input.question}
                        onChange={handleChange}
                    />
                </div>
                <div className="InputContainer">
                    <label htmlFor="answer">Answer</label>
                    <input
                        className="input"
                        name="answer"
                        placeholder="Answer"
                        value={input.answer}
                        onChange={handleChange}
                    />
                </div>
                <div className="InputContainer">
                    <label htmlFor="tags">Tags</label>
                    <input
                        className="input"
                        name="tags"
                        placeholder="Tags"
                        value={input.tags}
                        onChange={handleChange}
                    />
                </div>
                <div className="InputContainer">
                    <label for="points">Select a point value</label>
                    <select name="points" id="points" onChange={handleChange}>
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
                <button className="btn success" type="submit">
                    Add Question
                </button>
            </form>
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
