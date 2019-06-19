import React, { useState } from 'react';
import styled from 'styled-components';

const axios = require('axios');

const NewGame = ({ user }) => {
    const [input, setInput] = useState('');

    const addGame = e => {
        e.preventDefault();
        if (input === '') {
            return;
        }
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
        <NewGameForm className="container" onSubmit={addGame}>
            <input
                className="input"
                name="name"
                placeholder="Game name"
                value={input}
                onChange={handleChange}
            />
            <button className="btn success">Add Game</button>
        </NewGameForm>
    );
};

export default NewGame;

const NewGameForm = styled.form`
    display: flex;
    justify-content: space-between;
`;
