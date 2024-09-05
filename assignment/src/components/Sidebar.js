import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => (
  <div className="sidebar">
    <Link to="/">Dashboard</Link>
    <Link to="/new-item">New Item</Link>
  </div>
);

export default Sidebar;
