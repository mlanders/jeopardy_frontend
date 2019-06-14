import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { StateProvider, useStateValue } from 'react-conflux';
import { userContext, userReducer } from '../../conflux/userReducer';
import { SET_USER, SET_GAMES } from '../../conflux/constants';
import Login from '../authentication/login';
import { GlobalStyles } from '../../styles/index';

const NavBar = () => {
    const [state, dispatch] = useStateValue(userContext);

    return (
        <Styles>
            <div className="NavBar">
                <Link to="/games" className="Logo">
                    Jeopardy
                </Link>

                <div className="MenuRight">
                    <Link to="/user">
                        <img
                            className="ProfileImg"
                            src={state.userProfile.photo}
                            alt={state.userProfile.name}
                        />
                    </Link>
                    <Login />
                </div>
            </div>
        </Styles>
    );
};

const Styles = styled.div`
    .Logo {
        font-size: 2rem;
        text-decoration: none;
    }
    .NavBar {
        width: 100%;
        height: 75px;
        display: flex;
        padding: 0 10px;
        justify-content: space-between;
        align-items: center;
        background-color: #e8e9eb;
    }
    .MenuRight {
        display: flex;
        align-items: center;
    }
    .ProfileImg {
        width: 50px;
        height: 50px;
        border-radius: 4px;
    }
`;

export default NavBar;
