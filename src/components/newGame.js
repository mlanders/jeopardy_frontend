import React, { useState } from 'react';
const axios = require('axios');

const NewGame = props => {
    const [input, setInput] = useState({ name: '' });
    const addGame = e => {
        // console.log('UID: ', props.user.uid);
        // console.log('NAME: ', input.name);
        e.preventDefault();
        // let config = {
        //     headers: {},
        //     body: {
        //         uid: `${props.user.uid}`,
        //         name: input.name
        //     }
        // };
        // console.log(config);
        axios
            .post(
                'https://us-central1-jeopardy-firebase.cloudfunctions.net/addGame',
                {
                    headers: {
                        'Content-Type': 'application/json',
                        uid: props.user.uid
                    },

                    uid: props.user.uid,
                    name: input.name
                }
            )
            .then(res => console.log(res.data))
            .catch(err => console.log('ERROR: ', err));
    };
    const handleChange = e => {
        e.preventDefault();
        setInput({ name: e.target.value });
    };
    return (
        <form onSubmit={e => addGame(e)}>
            <input
                name="name"
                laceholder="Game name"
                value={input.name}
                onChange={handleChange}
            />
            <button>Add Game</button>
        </form>
    );
};

export default NewGame;
