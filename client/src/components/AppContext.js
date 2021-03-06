import React, { createContext, useEffect, useState } from 'react';
import withFirebaseAuth from "react-with-firebase-auth";
import * as firebase from "firebase";
import "firebase/auth";

export const AppContext = createContext(null);

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_FE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_FE_AUTHDOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_FE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_FE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_FE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_FE_API_ID
};


const firebaseApp = firebase.initializeApp(firebaseConfig);
const firebaseAppAuth = firebaseApp.auth();

const providers = {
  googleProvider: new firebase.auth.GoogleAuthProvider(),
};

const AppProvider = ({ children, signInWithGoogle, user, signOut }) => {
  const [appUser, setAppUser] = useState({});
  const [message, setMessage] = useState('');

  const handleSignOut = () => {
      signOut();
      setAppUser({});
  };

  useEffect(()=>{
    if (user) {
      fetch('/users', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          displayName: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
        }),
      })
      .then((res) => res.json())
      .then((json) => {
        setAppUser(json.data);
        setMessage(json.message);
      })      
    }
  }, [user]);

  return <AppContext.Provider value={{appUser, signInWithGoogle, handleSignOut, message}}>
          {children}
        </AppContext.Provider>;
};

 export default withFirebaseAuth({
     providers,
     firebaseAppAuth,
   })(AppProvider);
