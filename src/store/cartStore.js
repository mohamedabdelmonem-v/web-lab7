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
    if (existing) {
      return {
        items: state.items.map((i) =>
          i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i
        )
      };
    }
    return { items: [...state.items, { id: product.id, title: product.title, price: product.price, quantity: 1 }] };
  }),

  removeItem: (id) => set((state) => ({
    items: state.items.filter((i) => i.id !== id)
  })),

  setQuantity: (id, quantity) => set((state) => {
    if (quantity < 1) {
      return { items: state.items.filter((i) => i.id !== id) };
    }
    return {
      items: state.items.map((i) => (i.id === id ? { ...i, quantity } : i))
    };
  }),

  clear: () => set({ items: [] })
}));

// Outside React persistence subscription
useCartStore.subscribe((state) => {
  try {
    localStorage.setItem('cart_items', JSON.stringify(state.items));
  } catch (e) {
    console.error('Failed to sync cart to localStorage', e);
  }
});