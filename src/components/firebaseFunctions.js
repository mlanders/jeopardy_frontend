import fbaseConfig from './authentication/fbaseConfig';

//Firebase
let firebase = require('firebase/app');
require('firebase/firestore');
require('firebase/functions');
firebase.initializeApp(fbaseConfig);
// let db = firebase.firestore();

export const addGame = firebase.functions().httpsCallable('addGame');
export const getGames = firebase.functions().httpsCallable('getGames');

// export const addGame = (name, uid) => {
//     db.collection('games')
//         .add({
//             gameName: name,
//             author: uid
//         })
//         .then(console.log('Success'))
//         .catch(error => {
//             console.log('Unable to add game', error);
//         });
// };
