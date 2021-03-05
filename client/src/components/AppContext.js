import React, { createContext, useEffect, useState } from 'react';

import withFirebaseAuth from 'react-with-firebase-auth';
import * as firebase from 'firebase';
import 'firebase/auth';

export const AppContext = createContext(null);

var firebaseConfig = {
  apiKey: "AIzaSyCvRLeMTytncXGfd2pKhsQlWqVljXGO9AY",
  authDomain: "user-app-2071b.firebaseapp.com",
  projectId: "user-app-2071b",
  storageBucket: "user-app-2071b.appspot.com",
  messagingSenderId: "832244567176",
  appId: "1:832244567176:web:5f307b24220f588f44233d"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const firebaseAppAuth = firebaseApp.auth();

const providers = {
  googleProvider: new firebase.auth.GoogleAuthProvider()
};

const AppProvider = ({ children, signInWithGoogle, signOut, user }) => {
  const [appUser, setAppUser] = useState({});
  const [message, setMessage] = useState('');

  const handleSignOut = () => {
    signOut();
    setAppUser({});
  };

  useEffect(() => {
    if (user) {
      fetch('/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          displayName: user.displayName,
          email: user.email,
          photoURL: user.photoURL
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
  firebaseAppAuth
})(AppProvider);
