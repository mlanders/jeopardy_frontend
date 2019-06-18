import React, { useState } from 'react';
import styled from 'styled-components';
import { useStateValue } from 'react-conflux';
import { userContext } from '../../conflux/userReducer';
import { SET_INPUT } from '../../conflux/constants';

const axios = require('axios');

const NewGame = ({ user }) => {
    const [input, setInput] = useState('');
    // const [state, dispatch] = useStateValue(userContext);

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
        <NewGameForm onSubmit={addGame}>
            <input
                name="name"
                placeholder="Game name"
                value={input}
                onChange={handleChange}
            />
            <button>Add Game</button>
        </NewGameForm>
    );
};

export default NewGame;

const NewGameForm = styled.form`
    margin: 10px 0;
`;
