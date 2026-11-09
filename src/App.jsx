import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { useLocalStorage } from './hooks/useLocalStorage';

import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';

import { Home } from './pages/Home';
import ProductList from './pages/ProductList';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Login from './pages/Login';
import { NotFound } from './pages/NotFound';