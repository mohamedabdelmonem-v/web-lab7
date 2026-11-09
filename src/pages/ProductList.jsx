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