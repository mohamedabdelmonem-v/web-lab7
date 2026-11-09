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

  const handleSearchChange = (e) => {
    const newParams = new URLSearchParams(searchParams);
    if (e.target.value) {
      newParams.set('q', e.target.value);
    } else {
      newParams.delete('q');
    }
    setSearchParams(newParams);
  };

  const handleCategoryChange = (e) => {
    const newParams = new URLSearchParams(searchParams);
    if (e.target.value) {
      newParams.set('category', e.target.value);
    } else {
      newParams.delete('category');
    }
    setSearchParams(newParams);
  };

  if (loading) return <p>Loading catalogue...</p>;
  if (error) return <p style={{ color: 'red' }}>Error: {error}</p>;

  return (
    <div>
        <h2>Product Catalogue</h2>
      
      {/* Filter Controls */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <input 
          type="text" 
          placeholder="Search by title..." 
          value={searchQuery} 
          onChange={handleSearchChange} 
        />
        <select value={categoryFilter} onChange={handleCategoryChange}>
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      {filteredProducts.length === 0 ? (
        <p>No products match your filter criteria.</p>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '15px' }}>
          {filteredProducts.map((p) => (
            <div key={p.id} style={{ border: '1px solid #ddd', padding: '10px', borderRadius: '5px' }}>
              <img src={p.thumbnail} alt={p.title} style={{ width: '100%', height: '120px', objectFit: 'cover' }} />
              <h3>{p.title}</h3>
              <p>${p.price}</p>
              <Link to={`/products/${p.id}`}>View Details</Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductList;