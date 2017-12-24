import * as firebase from "firebase";
//configuracion de firebase
const config = {
    apiKey: "AIzaSyCN8zthcTm74zFg-YNyh07DyI0_duARB_k",
    authDomain: "musicnow-3e3c7.firebaseapp.com",
    databaseURL: "https://musicnow-3e3c7.firebaseio.com",
    projectId: "musicnow-3e3c7",
    storageBucket: "",
    messagingSenderId: "872176174724"
};
firebase.initializeApp(config);
//solo pude haber solo un default 
//y const muchos pero debe referenciar con el mismo nombre
export const firebaseAuth = firebase.auth();
// Get a reference to the database service
export const database = firebase.database();
export default firebase;