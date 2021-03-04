import React, { createContext, useEffect, useState } from "react";
import withFirebaseAuth from "react-with-firebase-auth";
import firebase from "firebase/app";
import "firebase/auth";

export const AppContext = createContext(null);

const firebaseConfig = {
  apiKey: "AIzaSyBlhJ2r1MKQj9EiAYZMe7YbJO1jVIGgl5I",
  authDomain: "user-app-8387b.firebaseapp.com",
  projectId: "user-app-8387b",
  storageBucket: "user-app-8387b.appspot.com",
  messagingSenderId: "445162899133",
  appId: "1:445162899133:web:a85b12587348c464ab99d4",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const firebaseAppAuth = firebaseApp.auth();

const providers = {
  googleProvider: new firebase.auth.GoogleAuthProvider(),
};

const AppProvider = ({ children, signInWithGoogle, signOut, user }) => {
  const [appUser, setAppUser] = useState({});
  const [message, setMessage] = useState("");
  const handleSignOut = () => {
    signOut();
    setAppUser({});
  };
  useEffect(() => {
    if (user) {
      fetch(`/users`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
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
    <AppContext.Provider
      value={{ appUser, signInWithGoogle, handleSignOut, message }}
    >
      {children}
    </AppContext.Provider>
  );
};
export default withFirebaseAuth({
  providers,
  firebaseAppAuth,
})(AppProvider);
