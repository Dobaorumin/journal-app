import firebase from 'firebase/compat/app';
import "firebase/compat/auth"
import "firebase/compat/firestore";


const firebaseConfig = {
    apiKey: "AIzaSyBQf4_BVQhMRTTobAEfJ5EU0ctecDviQUk",
    authDomain: "journalapp-d4ca4.firebaseapp.com",
    projectId: "journalapp-d4ca4",
    storageBucket: "journalapp-d4ca4.appspot.com",
    messagingSenderId: "710096946896",
    appId: "1:710096946896:web:50969d2d01553a186440d5"
  };

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore()

const googleAuthProvider = new firebase.auth.GoogleAuthProvider()

export{
    db,
    googleAuthProvider,
    firebase
}