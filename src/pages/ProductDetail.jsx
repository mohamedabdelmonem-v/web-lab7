import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useFetch } from '../hooks/useFetch';
import { fetchProduct } from '../api/productsApi';
import { useCartStore } from '../store/cartStore';

const ProductDetail = () => {
  const { id } = useParams(); // URL string parameter
  const navigate = useNavigate();
  const addItem = useCartStore((state) => state.addItem);