import React from 'react';
import { Link } from 'react-router-dom';
import Index from '../app/index';

const Home = () => {
    return (
        <>
            <h1>Home</h1>

            <Link to="/app">About</Link>
        </>
    );
};

export default Home;
