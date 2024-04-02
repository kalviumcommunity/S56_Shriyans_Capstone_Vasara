import React from 'react'
import Navbar from "../Components/Navbar";
import "./StylesPage.css"
import style1 from "../assets/bohemian.png"
import style2 from "../assets/artsy.png"
import style3 from "../assets/Biker_clothing.png"
import style4 from "../assets/Casual_wear.png"
import style5 from "../assets/Gothic.png"
import style6 from "../assets/Military_style.png"
import style7 from "../assets/Streetwear.png"
import style8 from "../assets/Crape_Georgette.png"
import style9 from "../assets/kurta.png"
import style10 from "../assets/Sherwani.png"
import style11 from "../assets/lehenga.png"
import Footer from '../Components/Footer';
const StylesPage = () => {
  return (
    <div>
      <Navbar/>
      <div className="style_hero"></div>

      <div className="explore_styles">
        <div className="style_card">
          <div className="style_img">
          <img src={style1} loading="lazy" alt="" />
          </div>
          <div className="style_name">
            <h1>Bohemian</h1>
          </div>
        </div>
        <div className="style_card">
          <div className="style_img">
          <img src={style2} loading="lazy" alt="" />
          </div>
          <div className="style_name">
            <h1>Artsy</h1>
          </div>
        </div>
        <div className="style_card">
          <div className="style_img">
          <img src={style3} loading="lazy" alt="" />
          </div>
          <div className="style_name">
            <h1>Biker clothing</h1>
          </div>
        </div>
        <div className="style_card">
          <div className="style_img">
          <img src={style4} loading="lazy" alt="" />
          </div>
          <div className="style_name">
            <h1>Casuals</h1>
          </div>
        </div>
        <div className="style_card">
          <div className="style_img">
          <img src={style5} loading="lazy" alt="" />
          </div>
          <div className="style_name">
            <h1>Gothic</h1>
          </div>
        </div>
        <div className="style_card">
          <div className="style_img">
          <img src={style6} loading="lazy" alt="" />
          </div>
          <div className="style_name">
            <h1>Military</h1>
          </div>
        </div>
        <div className="style_card">
          <div className="style_img">
          <img src={style7} loading="lazy" alt="" />
          </div>
          <div className="style_name">
            <h1>Streetwear</h1>
          </div>
        </div>
        <div className="style_card">
          <div className="style_img">
          <img src={style8} loading="lazy" alt="" />
          </div>
          <div className="style_name">
            <h1>Crape Georgette</h1>
          </div>
        </div>
        <div className="style_card">
          <div className="style_img">
          <img src={style9} loading="lazy" alt="" />
          </div>
          <div className="style_name">
            <h1>Kurta</h1>
          </div>
        </div>
        <div className="style_card">
          <div className="style_img">
          <img src={style10} loading="lazy" alt="" />
          </div>
          <div className="style_name">
            <h1>Sherwani</h1>
          </div>
        </div>
        <div className="style_card">
          <div className="style_img">
          <img src={style11} loading="lazy" alt="" />
          </div>
          <div className="style_name">
            <h1>Lehenga</h1>
          </div>
        </div>

      </div>
      <Footer/>
    </div>
  )
}

export default StylesPage
