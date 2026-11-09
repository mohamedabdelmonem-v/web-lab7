import React from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from './NavBar';

const Layout = ({ theme, toggleTheme }) => {
    return (
        <div className={`app-wrapper ${theme}`} style={{ minHeight: '100vh', padding: '10px' }}>
            <NavBar theme={theme} toggleTheme={toggleTheme} />
            <main style={{ padding: '20px' }}>
        <Outlet />
      </main>
      <footer style={{ marginTop: 'auto', textAlign: 'center', padding: '10px', borderTop: '1px solid #ccc' }}>
        Online Shop © 2026
      </footer>
    </div>
  );
};

export default Layout;