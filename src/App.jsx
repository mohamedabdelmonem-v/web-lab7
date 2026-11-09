import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { useLocalStorage } from './hooks/useLocalStorage';

import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';