import React, { createContext, useContext, useReducer } from 'react';

const AuthContext = createContext(null);

const authReducer = (state, action) => {
    switch (action.type) {
    case 'LOGGED_IN':
      return { user: action.payload };
    case 'LOGGED_OUT':
      return { user: null };
    default:
      return state;
  }
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, { user: null });

  return (
    <AuthContext.Provider value={{ user: state.user, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};