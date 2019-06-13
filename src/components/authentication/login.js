import React from 'react';
import history from '../../index';
import { useStateValue } from 'react-conflux';
import { userContext } from '../../conflux/userReducer';
import { SET_USER } from '../../conflux/constants';

//Firebase
let firebase = require('firebase/app');
require('firebase/firestore');
require('firebase/auth');
let provider = new firebase.auth.GoogleAuthProvider();
firebase.auth().useDeviceLanguage();

const Login = () => {
    const [state, dispatch] = useStateValue(userContext);

    const handleLogin = () => {
        firebase
            .auth()
            .signInWithPopup(provider)
            .then(function(result) {
                // This gives you a Google Access Token. You can use it to access the Google API.
                let token = result.credential.accessToken;
                // The signed-in user info.
                let user = result.user;
                let userProfile = {
                    uid: user.uid,
                    email: user.email,
                    photo: user.photoURL,
                    name: user.displayName
                };

                dispatch({ type: SET_USER, payload: userProfile });
                history.push('/user');
            })
            .catch(function(error) {
                // Handle Errors here.
                let errorCode = error.code;
                let errorMessage = error.message;
                // The email of the user's account used.
                let email = error.email;
                // The firebase.auth.AuthCredential type that was used.
                let credential = error.credential;

                console.error(
                    'Login Error: ',
                    errorCode,
                    errorMessage,
                    email,
                    credential
                );
                // ...
            });
    };
    const handleLogout = () => {
        firebase
            .auth()
            .signOut()
            .then(function() {
                // Sign-out successful.
                let userProfile = {
                    uid: '',
                    email: '',
                    photo: '',
                    name: ''
                };
                dispatch({ type: SET_USER, payload: userProfile });
                history.push('/');
                console.log('Signout success!');
            })
            .catch(function(error) {
                // An error happened.
                console.error('Signout Error', error);
            });
    };

    return (
        <div
            onClick={
                state.userProfile.uid
                    ? () => handleLogout()
                    : () => handleLogin()
            }
            style={{
                width: '50px',
                padding: '5px 10px',
                margin: '20px',
                textAlign: 'center',
                border: '1px solid black',
                borderRadius: '4px',
                cursor: 'pointer'
            }}>
            {state.userProfile.uid ? `Logout` : `Login`}
        </div>
    );
};
export default Login;
