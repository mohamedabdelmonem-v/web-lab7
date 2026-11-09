// Data-fetching operations for products API (No JSX, No React imports)

export const fetchProducts = async (signal) => {
    const response = await fetch('https://dummyjson.com/products?limit=100', { signal });
  if (!response.ok) {
    throw new Error(`Failed to fetch products: ${response.statusText}`);
  }
  const data = await response.json();
  return data.products;
};