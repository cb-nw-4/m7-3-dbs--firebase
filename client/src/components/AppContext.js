import React, { createContext, useEffect, useState } from 'react';

export const AppContext = createContext(null);

var firebaseConfig = {
  apiKey: "AIzaSyCvRLeMTytncXGfd2pKhsQlWqVljXGO9AY",
  authDomain: "user-app-2071b.firebaseapp.com",
  projectId: "user-app-2071b",
  storageBucket: "user-app-2071b.appspot.com",
  messagingSenderId: "832244567176",
  appId: "1:832244567176:web:5f307b24220f588f44233d"
};

const AppProvider = ({ children }) => {
  return <AppContext.Provider value={{}}>{children}</AppContext.Provider>;
};

export default AppProvider;
