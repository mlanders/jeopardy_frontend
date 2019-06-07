import React, { useState, useEffect } from 'react';
import { Route } from 'react-router-dom';
import fbaseConfig from '../src/components/authentication/fbaseConfig';
// import NewGame from './components/newGame';
import Games from './components/game/games';
import QuestionView from './components/game/questionView';
import UserInfo from './components/user/userInfo';
import GameView from './components/game/gameView';

const axios = require('axios');
//Firebase
const firebase = require('firebase/app');
require('firebase/firestore');
require('firebase/auth');
firebase.initializeApp(fbaseConfig);
let provider = new firebase.auth.GoogleAuthProvider();
let db = firebase.firestore();

firebase.auth().useDeviceLanguage();

function App() {
    const [user, setUser] = useState();
    const [data, setData] = useState();

    useEffect(() => {
        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                // User is signed in.
                let userProfile = {
                    uid: user.uid,
                    email: user.providerData[0].email,
                    photo: user.providerData[0].photoURL,
                    name: user.providerData[0].displayName
                };
                setUser(userProfile);
                // console.log(userProfile);
                console.log('Already signed in!');
            } else {
                // No user is signed in.
                console.log('Not signed in!');
            }
        });
    }, []);
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
                    email: user.providerData[0].email,
                    photo: user.providerData[0].photoURL,
                    name: user.providerData[0].displayName
                };
                setUser(userProfile);
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
                // ...
            });
    };
    const signOut = () => {
        firebase
            .auth()
            .signOut()
            .then(function() {
                // Sign-out successful.
                setData(false);
                setUser(false);
                console.log('Signout success!');
            })
            .catch(function(error) {
                // An error happened.
                console.log('Signout fail!');
            });
    };

    const render = () => {
        return (
            <>
                <UserInfo user={user} />
                <Games db={db} data={data} setData={setData} user={user} />
            </>
        );
    };

    return (
        <div>
            <Route path="/games" exact component={Games} />
            <Route path="/games/:gameID" exact component={GameView} />
            <div
                onClick={user ? () => signOut() : () => login()}
                style={{
                    padding: '5px 10px',
                    width: '80px',
                    margin: '20px',
                    textAlign: 'center',
                    border: '1px solid black',
                    borderRadius: '4px',
                    cursor: 'pointer'
                }}>
                {user ? <p>Logout</p> : <p>Login</p>}
            </div>
            {user ? render() : null}
        </div>
    );
}

export default App;
