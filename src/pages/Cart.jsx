import React from 'react';
import { Link } from 'react-router-dom';
import { useCartStore } from '../store/cartStore';

const Cart = () => {
    const items = useCartStore((state) => state.items);
  const removeItem = useCartStore((state) => state.removeItem);
  const setQuantity = useCartStore((state) => state.setQuantity);
  const clear = useCartStore((state) => state.clear);

  // Derived totals calculated on render
  const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (items.length === 0) {
    return (
      <div>
        <h2>Your Shopping Cart</h2>
        <p>Your cart is empty.</p>
        <Link to="/products">Browse Catalogue</Link>
      </div>
    );
  }