import React, { useState } from 'react';
import styled from 'styled-components';
import { useStateValue } from 'react-conflux';
import { userContext } from '../../conflux/userReducer';
const axios = require('axios');

const NewQuestion = props => {
    const [state] = useStateValue(userContext);
    const [input, setInput] = useState({
        question: '',
        answer: '',
        tags: '',
        points: '200'
    });
    const addQuestion = e => {
        e.preventDefault();
        if (input.question === '' || input.answer === '') {
            console.log('Invalid Input');
            return;
        }
        console.log(props.gameID);
        let game_id;
        if (props.gameID === undefined) {
            game_id = null;
        } else {
            game_id = props.gameID;
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
                    gameID: game_id
                }
            )
            .then(res => console.log(res.data))
            .catch(err => console.log('ERROR: ', err));

        setInput({ question: '', answer: '', tags: '' });
        props.toggleQuestion();
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
                <div className="inputs">
                    <div className="formLeft">
                        <div className="InputContainer">
                            <label htmlFor="question">Question</label>
                            <textarea
                                className="input textarea"
                                name="question"
                                placeholder="What is 2 + 2?"
                                value={input.question}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="InputContainer">
                            <label htmlFor="answer">Answer</label>
                            <textarea
                                className="input textarea"
                                name="answer"
                                placeholder="4"
                                value={input.answer}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className="formRight">
                        <div className="InputContainer">
                            <label htmlFor="tags">
                                Tags{' '}
                                <span className="subText">Comma separated</span>
                            </label>

                            <input
                                className="input"
                                name="tags"
                                placeholder="Math, Addition"
                                value={input.tags}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="InputContainer">
                            <label htmlFor="points">Select a point value</label>
                            <select
                                className="select"
                                name="points"
                                id="points"
                                onChange={handleChange}>
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
                    </div>
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
    width: 100%;
    .NewQuestionForm {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        margin: 10px 0;
    }
    .InputContainer {
        width: 200px;
        display: flex;
        flex-direction: column;
        margin: 10px;
    }
    .inputs {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }
    .textarea {
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        width: 100%;
        height: 100px;
    }
    .formLeft {
        display: flex;
        flex-direction: column;
        width: 50%;
    }
    .formRight {
        display: flex;
        flex-direction: column;
        width: 50%;
    }
    .btn {
        width: auto;
        align-self: flex-end;
    }
`;
