import React, { useState } from 'react';
import './Admin_nav.css';
import logo from '../assets/only_logo.png';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import LogoutIcon from '@mui/icons-material/Logout';

const Admin_nav = () => {
  const [activeItem, setActiveItem] = useState('Users');

  const handleItemClick = (item) => {
    setActiveItem(item);
  };

  return (
    <div className='admin-nav'>
      <div className="logo">
        <img src={logo} alt="Logo" />
        <h1>Vasara</h1>
      </div>
      <div 
        className={`nav-item ${activeItem === 'Users' ? 'active' : ''}`} 
        onClick={() => handleItemClick('Users')}
      >
        <PeopleAltIcon/>
        <h2>Users</h2>
      </div>
      <div 
        className={`nav-item ${activeItem === 'Colors' ? 'active' : ''}`} 
        onClick={() => handleItemClick('Colors')}
      >
        <PeopleAltIcon/>
        <h2>Colors</h2>
      </div>
      <div className="nav-item nav-item-logout">
        <LogoutIcon/>
        <h2>Logout</h2>
      </div>
    </div>
  );
}

export default Admin_nav;
