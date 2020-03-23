import firebase from "firebase/app";
const config = {
	apiKey: "AIzaSyDM_iydE8RWYCObY2X_L-YontgTisoxSB8",
	authDomain: "jeopardy-firebase.firebaseapp.com",
	databaseURL: "https://jeopardy-firebase.firebaseio.com",
	projectId: "jeopardy-firebase",
	storageBucket: "jeopardy-firebase.appspot.com",
	messagingSenderId: "943149393812",
	appId: "1:943149393812:web:6cc237b2d12982036d9181",
};
firebase.initializeApp(config);
export default firebase;
