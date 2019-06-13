import React, { useState } from 'react';
import { useStateValue } from 'react-conflux';
import { userContext } from '../../conflux/userReducer';
const axios = require('axios');

const NewQuestion = props => {
    const [state] = useStateValue(userContext);
    const [input, setInput] = useState({
        question: '',
        answer: ''
    });
    const addQuestion = e => {
        e.preventDefault();
        axios
            .post(
                'https://us-central1-jeopardy-firebase.cloudfunctions.net/jeopardy/addQuestion',
                {
                    uid: state.userProfile.uid,
                    question: input.question,
                    answer: input.answer,
                    gameID: props.gameID
                }
            )
            .then(res => console.log(res.data))
            .catch(err => console.log('ERROR: ', err));

        setInput('');
    };
    const handleChange = e => {
        e.preventDefault();
        const { name, value } = e.target;
        setInput({ ...input, [name]: value });
    };
    return (
        <form onSubmit={e => addQuestion(e)}>
            <input
                name="question"
                placeholder="Question"
                value={input.question}
                onChange={handleChange}
            />
            <input
                name="answer"
                placeholder="Answer"
                value={input.answewr}
                onChange={handleChange}
            />
            <button>Add Question</button>
        </form>
    );
};

export default NewQuestion;
