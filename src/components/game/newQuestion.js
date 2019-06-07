import React, { useState } from 'react';
const axios = require('axios');

const NewQuestion = props => {
    const [input, setInput] = useState({
        question: '',
        answer: '',
        gameID: '',
    });
    const addGame = e => {
        e.preventDefault();
        axios
            .post(
                'https://us-central1-jeopardy-firebase.cloudfunctions.net/jeopardy/addQuestion',
                {
                    uid: props.user.uid,
                    question: input.question,
                    answer: input.answer,
                    gameID: input.gameID
                }
            )
            .then(res => console.log(res.data))
            .catch(err => console.log('ERROR: ', err));

        setInput('');
    };
    const handleChange = e => {
        e.preventDefault();
        setInput(e.target.value);
    };
    return (
        <form onSubmit={e => addGame(e)}>
            <input
                name="name"
                laceholder="Game name"
                value={input}
                onChange={handleChange}
            />
            <button>Add Game</button>
        </form>
    );
};

export default NewQuestion;
