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

  return (
    <nav style={{ display: 'flex', gap: '15px', padding: '15px', borderBottom: '1px solid #ccc', alignItems: 'center' }}>
    <NavLink to="/" end className={({ isActive }) => (isActive ? 'active-link' : '')}>Home</NavLink>
      <NavLink to="/products" className={({ isActive }) => (isActive ? 'active-link' : '')}>Products</NavLink>
      <NavLink to="/cart" className={({ isActive }) => (isActive ? 'active-link' : '')}>Cart ({totalCount})</NavLink>

      <button onClick={toggleTheme} style={{ marginLeft: 'auto' }}>
        {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
      </button>

      {user ? (
        <>
          <span>Welcome, {user.username}</span>
          <button onClick={() => dispatch({ type: 'LOGGED_OUT' })}>Logout</button>
        </>
      ) : (
        <NavLink to="/login">Login</NavLink>
      )}
    </nav>
  );
};

export default NavBar;