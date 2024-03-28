import React, { useRef } from 'react';
import { Link } from "react-router-dom";
import Navbar from "../Components/Navbar";
import "./HomePage.css";
import logo from "../assets/logo.png";
import Style_img from "../assets/what_is_style.png";
import Style1 from "../assets/style1.png";
import Style2 from "../assets/style2.png";


import Footer from "../Components/Footer";

const HomePage = () => {
  const scrolldiv = useRef(null);

  const scrollToDiv = () => {
    if (scrolldiv.current) {
      scrolldiv.current.scrollIntoView({ behavior: 'smooth' });
    }
  };
  return (
    <div>
      <Navbar />
      {/* Hero section */}
      <div className="herosection">
        <div className="hero-heading">
          {/* text in hero section */}
          <h1>Discover your perfect look, uniquely curated by Vasara.</h1>
          <button onClick={scrollToDiv}>Explore</button>
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
      <div className="explore" ref={scrolldiv}>
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
          <Link to={"/styles"}><button>Explore More</button></Link>
          
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default HomePage;
