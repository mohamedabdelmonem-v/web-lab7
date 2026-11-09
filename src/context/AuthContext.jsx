import React, { createContext, useContext, useReducer } from 'react';

const AuthContext = createContext(null);

const authReducer = (state, action) => {