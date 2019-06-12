import React from 'react';
import { StateProvider, useStateValue } from 'react-conflux';
import { userContext, userReducer } from '../../conflux/userReducer';

const UserInfo = () => {
    const [state] = useStateValue(userContext);
    // console.log('USER INFO: ', state.userProfile);
    return (
        <StateProvider reducer={userReducer} stateContext={userContext}>
            <div>
                <p>{state.userProfile.name}</p>
                <img
                    src={state.userProfile.photo}
                    alt={state.userProfile.name}
                    style={{ width: '150px' }}
                />
                <p>User ID: {state.userProfile.uid}</p>
            </div>
        </StateProvider>
    );
};

export default UserInfo;
