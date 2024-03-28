import React, { useEffect } from 'react'
import "./Footer.css"
import { BiPhoneCall } from "react-icons/bi";
import { CiMail } from "react-icons/ci";
import { CiLocationOn } from "react-icons/ci";
import logo from "../assets/logo.png";
import { Link } from 'react-router-dom';
const Footer = () => {
  useEffect(()=>{

    window.scroll({top:0})
  },[])
  return (
    <div>
      {/* footer */}
      <footer>
        <div className="footer">
          {/* logo in footer */}
          <div className="logo-footer">
            <img src={logo} alt="" />
          </div>
          {/* link of all the pages */}
          <div className="allPages">
            <h2>Pages</h2>
            <ul>
              <li>
                <Link to={"/"}>Home</Link></li>
              <li><Link to={"/styles"}>Styles</Link></li>
              
              <li>Fabrics</li>
              <li>About</li>
              <li>Contact Us</li>
            </ul>
          </div>
          {/* contact information */}
          <div className="Contactus">
            <h2>Contact Us</h2>
            <ul>
              <li>
                {" "}
                <BiPhoneCall /> 98243-87234
              </li>
              <li>
                <CiMail /> Vasara@gmail.com
              </li>
              <li>
                <CiLocationOn /> Mit adt university
              </li>
            </ul>
          </div>
        </div>
        <div className="copyright">Copyright © VASARA. All rights reserved</div>
      </footer>
    </div>
  )
}

export default Footer
