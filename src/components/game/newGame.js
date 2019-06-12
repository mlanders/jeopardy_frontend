import React, { useState } from 'react';
import { addGame } from '../firebaseFunctions';
const axios = require('axios');

const NewGame = ({ user }) => {
    const [input, setInput] = useState('');
    const addGame = e => {
        e.preventDefault();
        axios
            .post(
                'https://us-central1-jeopardy-firebase.cloudfunctions.net/jeopardy/addGame',
                {
                    uid: user.uid,
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
        <form
            onSubmit={e => {
                e.preventDefault();
                addGame(input, user.uid);
            }}>
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
