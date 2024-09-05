import React, { useState } from 'react';
import axios from 'axios';

const TopBar = () => {
  const [search, setSearch] = useState('');
  const [products, setProducts] = useState([]);

  const handleSearch = async (e) => {
    setSearch(e.target.value);
    if (e.target.value.length > 2) {
      const response = await axios.get(`${'http://localhost:3000/api/products'}?query=${e.target.value}`);
      setProducts(response.data);
    } else {
      setProducts([]);
    }
  };

  return (
    <div className="top-bar">
      <input type="text" value={search} onChange={handleSearch} placeholder="Search for products..." />
      <ul>
        {products.map(product => <li key={product.id}>{product.product_info}</li>)}
      </ul>
    </div>
  );
};

export default TopBar;
