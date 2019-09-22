import firebase from 'firebase/app'
import 'firebase/firestore';
import 'firebase/messaging';

const config = {
    apiKey: "AIzaSyBqvWw8W2rRHLlce0LEC1_dFFox1lWL4ns",
    authDomain: "myweatherapp-99612.firebaseapp.com",
    databaseURL: "https://myweatherapp-99612.firebaseio.com",
    projectId: "myweatherapp-99612",
    storageBucket: "",
    messagingSenderId: "948980683654",
    appId: "1:948980683654:web:7160b239fe42d1dec1d207"
}

firebase.initializeApp(config)

// Initialize Cloud Firestore through Firebase
let db = firebase.firestore();

db.enablePersistence({experimentalTabSynchronization:true});

export default {
  db
}