import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useStateValue } from 'react-conflux';
import { userContext } from '../../conflux/userReducer';
import Login from '../authentication/login';

const NavBar = () => {
    const [state] = useStateValue(userContext);

    return (
        <Styles>
            <div className="NavBar">
                <Link to="/" className="Logo">
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
        color: #f09d51;
    }
    .NavBar {
        width: 100%;
        height: 75px;
        display: flex;
        padding: 0 10px;
        justify-content: space-between;
        align-items: center;
        background-color: #313638;
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
