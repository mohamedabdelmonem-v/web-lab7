import React from 'react';
import { Link } from 'react-router-dom';

export const NotFound = () => (
  <div>
    <h2>404 - Page Not Found</h2>
    <p>The page you are looking for does not exist.</p>
    <Link to="/">Back to Home</Link>
  </div>
);