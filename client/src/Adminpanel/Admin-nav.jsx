import React, { useState } from 'react';
import './Admin_nav.css';
import logo from '../assets/only_logo.png';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import LogoutIcon from '@mui/icons-material/Logout';
import {Link} from 'react-router-dom';

const Admin_nav = () => {
  const [activeItem, setActiveItem] = useState(sessionStorage.getItem('activeItem') || 'Users');

  const handleItemClick = (item) => {
    sessionStorage.setItem('activeItem', item);
    setActiveItem(item);
  };

  return (
    <div className='admin-nav'>
      <Link to={"/"}>
      <div className="logo">
        <img src={logo} alt="Logo" />
        <h1>Vasara</h1>
      </div></Link>
      <Link to={"/admin/users"}>
      <div 
        className={`nav-item ${activeItem === 'Users' ? 'active' : ''}`} 
        onClick={() => handleItemClick('Users')}
      >
        <PeopleAltIcon/>
        <h2>Users</h2>
      </div></Link>
      <Link to={"/admin/colors"}>
      <div 
        className={`nav-item ${activeItem === 'Colors' ? 'active' : ''}`} 
        onClick={() => handleItemClick('Colors')}
      >
        <PeopleAltIcon/>
        <h2>Colors</h2>
      </div></Link>
      <div className="nav-item nav-item-logout">
        <LogoutIcon/>
        <h2>Logout</h2>
      </div>
    </div>
  );
}

export default Admin_nav;
