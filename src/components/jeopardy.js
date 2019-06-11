import React, { useState, useEffect } from 'react';
// import { provider, db, firebase } from './authentication/auth';
import fbaseConfig from './authentication/fbaseConfig';
import history from '../index';

import { StateProvider, useStateValue } from 'react-conflux';
import { userReducer } from '../store/reducers/userReducer';
import { userContext } from '../store/context';
import { SET_USER } from '../store/constants';
import AppView from './appView';
let firebase = require('firebase/app');

//Firebase

require('firebase/firestore');
require('firebase/auth');
firebase.initializeApp(fbaseConfig);
let provider = new firebase.auth.GoogleAuthProvider();
let db = firebase.firestore();

firebase.auth().useDeviceLanguage();

function Jeopardy() {
    const [state, dispatch] = useStateValue(userContext);

    useEffect(() => {
        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                // User is signed in.
                let userProfile = {
                    uid: user.uid,
                    email: user.email,
                    photo: user.photoURL,
                    name: user.displayName
                };
                // setUser(userProfile);
                dispatch({ type: SET_USER, payload: userProfile });
                // console.log(userProfile);
                console.log('Already signed in!');
            } else {
                // No user is signed in.
                console.log('Not signed in!');
            }
        });
    }, [dispatch]);
    const login = () => {
        firebase
            .auth()
            .signInWithPopup(provider)
            .then(function(result) {
                // This gives you a Google Access Token. You can use it to access the Google API.
                let token = result.credential.accessToken;
                // The signed-in user info.
                let user = result.additionalUserInfo;
                let userProfile = {
                    uid: user.uid,
                    email: user.email,
                    photo: user.photoURL,
                    name: user.displayName
                };
                // setUser(userProfile);
                dispatch({ type: SET_USER, payload: userProfile });
                history.push('/user');
                // ...
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
                    // errorCode,
                    errorMessage
                    // email,
                    // credential
                );
                // ...
            });
    };
    const logOut = () => {
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
        <StateProvider reducer={userReducer} stateContext={userContext}>
            <div>
                <div
                    onClick={
                        state.userProfile.uid ? () => logOut() : () => login()
                    }
                    style={{
                        padding: '5px 10px',
                        width: '80px',
                        margin: '20px',
                        textAlign: 'center',
                        border: '1px solid black',
                        borderRadius: '4px',
                        cursor: 'pointer'
                    }}>
                    {state.userProfile.uid ? <p>Logout</p> : <p>Login</p>}
                </div>
                {state.userProfile.uid ? (
                    <AppView db={db} user={state.userProfile} />
                ) : null}
            </div>
        </StateProvider>
    );
}

export default Jeopardy;
