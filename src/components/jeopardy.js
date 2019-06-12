import React, { useEffect } from 'react';
import { Link, Route } from 'react-router-dom';
import Games from './game/games';

import UserInfo from './user/userInfo';
import GameView from './game/gameView';

import fbaseConfig from './authentication/fbaseConfig';
import history from '../index';

import { StateProvider, useStateValue } from 'react-conflux';
import { userContext, userReducer } from '../conflux/userReducer';
import { SET_USER, SET_GAMES } from '../conflux/constants';

//Firebase
let firebase = require('firebase/app');
require('firebase/firestore');
require('firebase/auth');
// firebase.initializeApp(fbaseConfig);
let provider = new firebase.auth.GoogleAuthProvider();
let db = firebase.firestore();
firebase.auth().useDeviceLanguage();

function Jeopardy() {
    const [state, dispatch] = useStateValue(userContext);

    useEffect(() => {
        db.collection('games')
            .where('author', '==', state.userProfile.uid)
            .onSnapshot(function(snapshot) {
                // let changes = snapshot.docChanges();
                let update = [];
                snapshot.docs.forEach(doc => {
                    let document = doc.data();
                    document.id = doc.id;
                    update.push(document);
                });

                dispatch({ type: SET_GAMES, payload: update });
            });
    }, [dispatch, state.userProfile.uid]);

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
                console.log('Already signed in!');
            } else {
                // No user is signed in.
                console.log('Not signed in!');
            }
        });
    }, [dispatch, state.userProfile.uid]);
    // console.log('FIREBASE AUTH: ', state);
    const login = () => {
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
    // console.log('JEOPARDY: ', state);
    const Links = () => {
        return (
            <>
                <Link to="/user" style={{ margin: '5px' }}>
                    User
                </Link>
                <Link to="/games" style={{ margin: '5px' }}>
                    Games
                </Link>
            </>
        );
    };

    return (
        <div>
            <div
                onClick={state.userProfile.uid ? () => logOut() : () => login()}
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
            {state.userProfile.uid ? Links() : null}
            <Route path="/user" render={props => <UserInfo {...props} />} />
            <Route
                exact
                path="/games"
                render={props => <Games {...props} db={db} />}
            />
            <Route
                path="/games/:id"
                render={props => <GameView {...props} db={db} />}
            />
        </div>
    );
}

export default Jeopardy;
