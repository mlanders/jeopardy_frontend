import React, { useState, useEffect } from 'react';
import Home from './components/marketing/home';
import Index from './components/app/index';
import firebaseConfig from '../src/components/authentication/firebaseConfig';
import NewGame from './components/newGame';

const axios = require('axios');
//Firebase
const firebase = require('firebase/app');
require('firebase/auth');
firebase.initializeApp(firebaseConfig);
let provider = new firebase.auth.GoogleAuthProvider();

// let user = firebase.auth().currentUser;
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
    const getMessages = () => {
        let config = {
            headers: {
                uid: `${user.uid}`
            }
        };
        axios({
            method: 'get',
            url:
                'https://us-central1-jeopardy-firebase.cloudfunctions.net/readMessages',
            config
        })
            .then(res => setData(res.data))
            .catch(err => console.log(err));
    };
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
                setUser('');
                setData('');
                console.log('Signout success!');
            })
            .catch(function(error) {
                // An error happened.
                console.log('Signout fail!');
            });
    };
    const userInfo = () => {
        return (
            <>
                <p>{user.name}</p>
                <img src={user.photo} alt="none" />
                <p>User ID: {user.uid}</p>
            </>
        );
    };
    return (
        <div>
            <div onClick={user ? () => signOut() : () => login()}>
                {user ? <p>Logout</p> : <p>Login</p>}
            </div>
            {/* <div onClick={signOut}>Logout</div> */}
            {/* <p>{user.profile.email}</p> */}
            {user ? userInfo() : null}
            {/* {user ? <Index /> : <Home />} */}
            <button onClick={getMessages}>Get Messages</button>
            {data
                ? data.map((i, index) => <p key={index}>{i.original}</p>)
                : null}

            <NewGame user={user} />
        </div>
    );
}

export default App;
