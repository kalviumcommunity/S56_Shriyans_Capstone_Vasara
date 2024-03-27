import React, { useState } from 'react'
import "./Navbar.css"
import logo from "../assets/logo.png"
import AccountMenu from './AccountMenu'
import { Link } from 'react-router-dom'
const Navbar = () => {
    const [isloggedin,SetIsloggedin]=useState(false)
  return (
    <div>
      <nav>
      {/* Navbar */}
        <div className="navbar">
        {/* Navitems */}
        <div className='nav-items'>
            <ul>
            <li><Link to={"/"}>Home</Link></li>
                
                <li>Colors</li>
                <li>About</li>
                <li>Contact Us</li>
            </ul>
        </div>
        {/* Logo */}
        <div className='logo'>
            <img src={logo} alt="" />
        </div>
        {/* Login box */}
        <div className='login'>
            {isloggedin===true ? (
                <AccountMenu/>
):(            <div>
  {/* Sign in /singup buttonss */}
  <Link to={"/login"}><button className='Signin'>Sign in</button></Link>
  <Link to={"/signup"}><button className='Signup'>Sign up</button></Link>
    
    </div>)}
            {/* <button className='Signin'>Sign in</button>
            <button className='Signup'>Sign up</button> */}
            
        </div>
        </div>

      </nav>
    </div>
  )
}

export default Navbar
