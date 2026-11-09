import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCartStore } from '../store/cartStore';

const NavBar = ({ theme, toggleTheme }) => {
  const { user, dispatch } = useAuth();

  // Select primitive count to prevent unnecessary re-renders
  const totalCount = useCartStore((state) => 
    state.items.reduce((sum, item) => sum + item.quantity, 0)
  );