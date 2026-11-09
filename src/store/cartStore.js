import { create } from 'zustand';

const getInitialCart = () => {
    try {
    const saved = localStorage.getItem('cart_items');
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
};

export const useCartStore = create((set) => ({
  items: getInitialCart(),

  addItem: (product) => set((state) => {
    const existing = state.items.find((i) => i.id === product.id);