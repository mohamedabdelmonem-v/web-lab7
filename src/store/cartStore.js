import { create } from 'zustand';

const getInitialCart = () => {
    try {
    const saved = localStorage.getItem('cart_items');
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
};