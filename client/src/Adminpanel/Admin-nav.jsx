import React from 'react'
import './Admin_nav.css'
import logo from '../assets/only_logo.png'
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import LogoutIcon from '@mui/icons-material/Logout';
const Admin_nav = () => {
  return (
    <div className='admin-nav'>
      <div className="logo">
        <img src={logo} alt="" />
        <h1>Vasara</h1>
      </div>
      <div className="nav-item active">
        <PeopleAltIcon/>
        <h2>Users</h2>
      </div>
      <div className="nav-item nav-item-logout">
        <LogoutIcon/>
        <h2>Logout</h2>
      </div>

    </div>
  )
}

export default Admin_nav
