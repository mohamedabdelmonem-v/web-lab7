import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useFetch } from '../hooks/useFetch';
import { fetchProduct } from '../api/productsApi';
import { useCartStore } from '../store/cartStore';

const ProductDetail = () => {
  const { id } = useParams(); // URL string parameter
  const navigate = useNavigate();
  const addItem = useCartStore((state) => state.addItem);

  // Convert string id to number for custom fetch call dependency
  const { data: product, loading, error } = useFetch(
    (signal) => fetchProduct(id, signal),
    [id]
  );

  if (loading) return <p>Loading product details...</p>;
  if (error) return <p style={{ color: 'red' }}>Product Not Found (ID: {id})</p>;

  return (
    <div>
    <button onClick={() => navigate('/products')}>← Back to Products</button>
     <h2>{product.title}</h2>
      <img src={product.thumbnail} alt={product.title} style={{ width: '250px' }} />
      <p><strong>Category:</strong> {product.category}</p>
      <p>{product.description}</p>
       <h3>${product.price}</h3>
      <button onClick={() => addItem(product)}>Add to Cart</button>
    </div>