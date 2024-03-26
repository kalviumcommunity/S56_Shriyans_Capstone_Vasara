import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../Components/Navbar";
import "./HomePage.css";
import logo from "../assets/logo.png";
import Style_img from "../assets/what_is_style.png";
import Style1 from "../assets/style1.png";
import Style2 from "../assets/style2.png";

import { BiPhoneCall } from "react-icons/bi";
import { CiMail } from "react-icons/ci";
import { CiLocationOn } from "react-icons/ci";

const HomePage = () => {
  return (
    <div>
      <Navbar />
      {/* Hero section */}
      <div className="herosection">
        <div className="hero-heading">
          {/* text in hero section */}
          <h1>Discover your perfect look, uniquely curated by Vasara.</h1>
          <button>Explore</button>
        </div>
      </div>
      {/* what is style section */}
      <div className="styles">
        <div className="style-heading">What is Style?</div>
        <div className="style-about">
          {/* what is style image */}
          <div className="style-img">
            <img src={Style_img} alt="" />
          </div>
          <div className="style_intro">
            {/* what is style text*/}
            <h3>
              The world of clothes is bursting with styles! From the sharp lines
              of classic threads to the carefree flow of boho looks, there's an
              outfit for every mood and occasion. Styles aren't just about what
              you wear, they're a way to express yourself, build confidence, and
              navigate the world with your own unique flair. So get ready to
              explore, experiment, and discover the styles that speak to you!
            </h3>
          </div>
        </div>
      </div>
      {/* explore different styles */}
      <div className="explore">
        <div className="style-heading">Explore Different Styles</div>
        <div className="diff-styles">
          {/* first style */}
          <div className="explore_style-about">
            <div className="explore_style_intro">
              <h1>Boho Style</h1>
              <div className="heading_underline"></div>
              {/* about first style */}
              <h3>
                This is all about expressing yourself with a free-spirited vibe.
                It's influenced by hippie fashion and features loose, flowing
                silhouettes, natural fabrics, and plenty of colorful prints and
                textures. Think maxi dresses, embroidered blouses, crochet tops,
                and layered accessories. It's a style that's perfect for feeling
                comfortable and confident, all while looking effortlessly
                put-together.
              </h3>
            </div>
            {/* first style iamge */}
            <div className="explore_style_img">
              <img src={Style1} alt="" />
            </div>
          </div>
          {/* first style */}
          <div className="explore_style-about">
            {/* first style iamge */}
            <div className="explore_style_img">
              <img src={Style2} alt="" />
            </div>
            <div className="explore_style_intro">
              <h1>Business casual</h1>
              {/* about first style */}
              <div className="heading_underline"></div>
              <h3>
                Business casual is a dress code that blends professionalism with
                comfort. It's more relaxed than suits and ties, but still puts
                together a polished look. Think khakis or dress pants paired
                with button-down shirts or blouses. Blazers, sweaters, and
                tasteful accessories can add a touch of personality.
              </h3>
            </div>
          </div>
        </div>
        <div className="explore_more_btn">
          {/* explore more button */}
          <button>Explore More</button>
        </div>
      </div>
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
              <li>Home</li>
              <li>Styles</li>
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
  );
};

export default HomePage;
