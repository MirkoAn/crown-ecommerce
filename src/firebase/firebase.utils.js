import firebase from 'firebase/app';
import  'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyCALQeOW62AwQK7h_5ICt9VD26ctKbriMI",
    authDomain: "crown-db-a273e.firebaseapp.com",
    databaseURL: "https://crown-db-a273e.firebaseio.com",
    projectId: "crown-db-a273e",
    storageBucket: "crown-db-a273e.appspot.com",
    messagingSenderId: "848776988716",
    appId: "1:848776988716:web:74c29ad8bdbf24f227e989",
    measurementId: "G-X07XTSF072"
  };

  export const createUserProfileDocument = async (userAuth, additionalData) => {
    if(!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`)

    const snapShot = await userRef.get()

    if(!snapShot.exists) {
      const { displayName, email } = userAuth
      const createdAt = new Date()

      try {
        await userRef.set({
          displayName,
          email,
          createdAt,
          ...additionalData
        })

      } catch(error){
        console.log('error creating user', error.message)
      }

    }

    return userRef 

    console.log(snapShot)
  }

  firebase.initializeApp(config)

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({ prompt:'select_account' });
  export const signInWithGoogle = () => auth.signInWithPopup(provider);

  export default firebase;