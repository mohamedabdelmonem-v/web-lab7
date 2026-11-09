import React from 'react';
import { Link } from 'react-router-dom';

export const Home = () => (
  <div>
   <h1>Welcome to Online Shop</h1>
    <p>Discover top rated products with effortless navigation.</p>
    <Link to="/products">Shop Now</Link>
  </div>
);