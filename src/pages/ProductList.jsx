import React from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { useFetch } from '../hooks/useFetch';
import { fetchProducts } from '../api/productsApi';

const ProductList = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { data: products, loading, error } = useFetch(fetchProducts, []);

  const categoryFilter = searchParams.get('category') || '';
  const searchQuery = searchParams.get('q') || '';

  const categories = products 
    ? Array.from(new Set(products.map((p) => p.category))) 
    : [];

    // Derived State (Calculated on the fly during render)
  const filteredProducts = (products || []).filter((product) => {
    const matchesCategory = categoryFilter ? product.category === categoryFilter : true;
    const matchesSearch = searchQuery ? product.title.toLowerCase().includes(searchQuery.toLowerCase()) : true;
    return matchesCategory && matchesSearch;
  });