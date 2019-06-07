import React, { useState } from 'react';
const axios = require('axios');

const NewGame = props => {
    const [input, setInput] = useState('');
    const addGame = e => {
        e.preventDefault();
        axios
            .post(
                'https://us-central1-jeopardy-firebase.cloudfunctions.net/jeopardy/addGame',
                {
                    uid: props.user.uid,
                    name: input
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

export default NewGame;
