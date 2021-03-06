import React, { createContext, useEffect, useState } from 'react';
import withFirebaseAuth from "react-with-firebase-auth";
import * as firebase from "firebase";
import "firebase/auth";

export const AppContext = createContext(null);

var firebaseConfig = {
  apiKey: "AIzaSyDAmYZ3cbuVE1_uxe0VjFcajIwr4XBfl0I",
  authDomain: "user-app-c1e62.firebaseapp.com",
  projectId: "user-app-c1e62",
  storageBucket: "user-app-c1e62.appspot.com",
  messagingSenderId: "1081781484410",
  appId: "1:1081781484410:web:128ef112ac8e583475f4c3"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const firebaseAppAuth = firebaseApp.auth();

const providers = { 
  googleProvider: new firebase.auth.GoogleAuthProvider(),
};

const AppProvider = ({ children, signInWithGoogle, signOut, user }) => {
  const [appUser, setAppUser] = useState({});
  const [message, setMessage] = useState('');

  const handleSignOut = () => {
    signOut();
    setAppUser({});
    setMessage('');
  };

  useEffect(() => {
    if (user) {
      fetch(`/users`, {
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
      });
    }
  }, [user]);

  return (
    <AppContext.Provider value={{ appUser, signInWithGoogle, handleSignOut, message }}>
      {children}
    </AppContext.Provider>
  );
};

export default withFirebaseAuth({
  providers,
  firebaseAppAuth,
})(AppProvider);

