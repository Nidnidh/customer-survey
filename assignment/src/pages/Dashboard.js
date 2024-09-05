import React, { useState } from 'react';
import axios from 'axios';


const Dashboard = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [products, setProducts] = useState([]);

  const handleSearch = async (e) => {
    setSearchTerm(e.target.value);
    if (e.target.value) {
      const response = await axios.get(`${'http://localhost:3000/api/products'}?query=${e.target.value}`);
      setProducts(response.data);
    } else {
      setProducts([]);
    }
  };

  return (
    <div className="dashboard">
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearch}
        placeholder="Search for products..."
      />
      <ul>
        {products.map(product => (
          <li key={product.id}>{product.product_info}</li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
