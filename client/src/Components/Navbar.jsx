import React, { useEffect, useState } from 'react'
import "./Navbar.css"
import logo from "../assets/logo.png"
import AccountMenu from './AccountMenu'
import { Link } from 'react-router-dom'
import Cookies from "js-cookie"
import DrawerMobileNavigation from './Mobile_navigation'

const Navbar = () => {
  let token = Cookies.get("token")
  const [isloggedin,SetIsloggedin]=useState(false)
  var [w,setW] = useState(window.innerWidth)
    useEffect(()=>{
    setW(window.innerWidth);

  })
  useEffect(()=>{
    if(token){
      SetIsloggedin(true)
    }

},[])
  return (
    <div>
      <nav>
      {/* Navbar */}
        <div className="navbar">
        {/* Navitems */}
        <div className='nav-items'>

{w>900?(     <ul>
            <li><Link to={"/"}>Home</Link></li>
                
                <li>
                  <Link to={"/colors"}>Colors</Link></li>
                <li>About</li>
                <li>
                  <Link to={"/contact_us"}>
                  Contact Us
                  </Link>
                  </li>
            </ul>):(
                      <div>
            
                      <DrawerMobileNavigation/>
                      </div>
        )}

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
