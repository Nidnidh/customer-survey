import React, { useState, useEffect } from 'react';
import axios from 'axios';


const Form = () => {
  const [formData, setFormData] = useState({
    supplierName: '',
    productInfo: '',
    websiteUrl: '',
    category: '',
    quantity: 0,
    timeline: '',
    location: '',
    requiredFor: ''
  });
  const [categories, setCategories] = useState([]);
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/api/categories').then(response => setCategories(response.data));
    axios.get('http://localhost:3000/api/locations').then(response => setLocations(response.data));
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('http://localhost:3000/api/new-item', {
      supplier_name: formData.supplierName,
      product_info: formData.productInfo,
      category_id: formData.category,
      quantity: formData.quantity,
      timeline: formData.timeline,
      location_id: formData.location,
      required_for: formData.requiredFor
    });
    alert('Request submitted successfully!');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="supplierName" placeholder="Supplier Name" value={formData.supplierName} onChange={handleChange} required />
      <input type="text" name="productInfo" placeholder="Product Information" value={formData.productInfo} onChange={handleChange} required />
      <input type="url" name="websiteUrl" placeholder="Product Website" value={formData.websiteUrl} onChange={handleChange} required />
      <select name="category" value={formData.category} onChange={handleChange}>
        {categories.map(cat => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
      </select>
      <input type="number" name="quantity" placeholder="Quantity Required" value={formData.quantity} onChange={handleChange} required />
      <input type="date" name="timeline" value={formData.timeline} onChange={handleChange} required />
      <select name="location" value={formData.location} onChange={handleChange}>
        {locations.map(loc => <option key={loc.id} value={loc.id}>{loc.name}</option>)}
      </select>
      <input type="text" name="requiredFor" placeholder="Required For" value={formData.requiredFor} onChange={handleChange} required />
      <button type="submit">Submit</button>
    </form>
  );
};

export default Form;
