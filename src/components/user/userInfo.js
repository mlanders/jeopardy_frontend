import React from 'react';
import styled from 'styled-components';
import { StateProvider, useStateValue } from 'react-conflux';
import { userContext, userReducer } from '../../conflux/userReducer';
import { Redirect } from 'react-router-dom';

const UserInfo = () => {
    const [state] = useStateValue(userContext);

    return (
        <StateProvider reducer={userReducer} stateContext={userContext}>
            <UserContainer>
                <H1>{state.userProfile.name}</H1>
                <UID>UID: {state.userProfile.uid}</UID>
                <UserImg
                    src={state.userProfile.photo}
                    alt={state.userProfile.name}
                />
            </UserContainer>
        </StateProvider>
    );
};

export default UserInfo;

const UserContainer = styled.div`
    max-width: 800px;
    width: 100%;
    margin: 10px auto;
    padding: 10px;
`;

const UserImg = styled.img`
    width: 100px;
    border-radius: 4px;
    margin-top: 10px;
`;
const H1 = styled.div`
    font-size: 2rem;
`;

const UID = styled.p`
    color: lightgray;
`;
