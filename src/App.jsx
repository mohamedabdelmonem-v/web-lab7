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

function App() {
  const [theme, setTheme] = useLocalStorage('theme', 'light');

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout theme={theme} toggleTheme={toggleTheme} />}>
            <Route index element={<Home />} />
            
            {/* Nested routes under /products */}
            <Route path="products" element={<ProductList />} />
            <Route path="products/:id" element={<ProductDetail />} />