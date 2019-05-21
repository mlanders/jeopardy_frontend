import React, { Component } from 'react';
import firebase from 'firebase';
import firebaseui from 'firebaseui';
import 'firebase/auth';
import firebaseConfig from '../firebaseConfig';
firebase.initializeApp(firebaseConfig);

const ui = new firebaseui.auth.AuthUI(firebase.auth());

// Initialize the FirebaseUI Widget using Firebase.
const uiConfig = {
    callbacks: {
        signInSuccessWithAuthResult: function(authResult, redirectUrl) {
            // User successfully signed in.
            // Return type determines whether we continue the redirect automatically
            // or whether we leave that to developer to handle.
            return true;
        }
    },
    // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
    signInFlow: 'popup',
    signInSuccessUrl: 'http://localhost:3000',
    signInOptions: [
        // Leave the lines as is for the providers you want to offer your users.
        firebase.auth.GoogleAuthProvider.PROVIDER_ID
    ],
    // Terms of service url.
    tosUrl: '<your-tos-url>',
    // Privacy policy url.
    privacyPolicyUrl: '<your-privacy-policy-url>'
};
ui.start('#firebaseui-auth-container', uiConfig);
export default function(Component) {
    return class Authenticate extends React.Component {
        render() {
            const user = localStorage.getItem('firebaseui::rememberedAccounts');
            const notLoggedIn = (
                <header>
                    <h1>Not logged In</h1>
                    <div id="firebaseui-auth-container" />
                    <div id="loader">Loading...</div>
                </header>
            );
            return <>{user ? <Component {...this.props} /> : notLoggedIn}</>;
        }
    };
}
