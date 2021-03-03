import React, { createContext, useEffect, useState } from 'react';
import withFirebaseAuth from 'react-with-firebase-auth';
import * as firebase from 'firebase';
import 'firebase/auth';


export const AppContext = createContext(null);

var firebaseConfig = {
  apiKey: "AIzaSyCpDijK1Z2StIqprKYw1K114XQ0P9K9C4Y",
  authDomain: "user-app-26886.firebaseapp.com",
  projectId: "user-app-26886",
  storageBucket: "user-app-26886.appspot.com",
  messagingSenderId: "728550764355",
  appId: "1:728550764355:web:a10b803162e8d8248dc9f6"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const firebaseAppAuth = firebaseApp.auth();


const providers ={
  googleProvider: new firebase.auth.GoogleAuthProvider(),
};

const AppProvider = ({ children, signInWithGoogle, signOut, user }) => {

  const [appUser, setAppUser] = useState({});
  const [message, setMessage] = useState('');

  const handleSignOut = () =>{
    signOut();
    setAppUser({});
  }

  useEffect(() =>{
    if(user){
      fetch(`/users`, {
        method: 'post',
        headers:{
          "Content-Type": 'application/json',
        },
        body: JSON.stringify({
          displayName: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
        }),
      })
      .then((res) => res.json())
      .then((json) => {
        setAppUser(json.data)
        setMessage(json.message)
      })
    }

  }, [user])

  return <AppContext.Provider value={{appUser, signInWithGoogle, handleSignOut, message}}>{children}</AppContext.Provider>;
};

export default withFirebaseAuth({
  providers,
  firebaseAppAuth,
})(AppProvider);
