import React from 'react';
import { Link } from 'react-router-dom';
import { useCartStore } from '../store/cartStore';

const Cart = () => {
    const items = useCartStore((state) => state.items);
  const removeItem = useCartStore((state) => state.removeItem);