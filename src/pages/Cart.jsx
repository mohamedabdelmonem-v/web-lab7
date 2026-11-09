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

  return (
    <div>
      <h2>Your Shopping Cart</h2>
      <ul>
        {items.map((item) => (
          <li key={item.id} style={{ marginBottom: '10px' }}>
            <strong>{item.title}</strong> - ${item.price} x {item.quantity}
            <button onClick={() => setQuantity(item.id, item.quantity - 1)}>-</button>
            <button onClick={() => setQuantity(item.id, item.quantity + 1)}>+</button>
            <button onClick={() => removeItem(item.id)}>Remove</button>
          </li>
        ))}
      </ul>
      <h3>Total: ${totalPrice.toFixed(2)}</h3>
      <button onClick={clear}>Clear Cart</button>
    </div>
  );
};

export default Cart;