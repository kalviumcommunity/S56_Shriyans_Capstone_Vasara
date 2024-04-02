import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import "./Profile.css";
import Cookies from "js-cookie";
import axios from "axios";
const Profile = () => {

  return (
    <div>
      <Navbar />

      <div className="profile-container">
        <button className="edit-profile">Edit</button>
        <div className="profile-img-container">
          <div className="lines"></div>
          <div className="lines"></div>
          <div className="lines"></div>
          <div className="card-header">
            <div className="outer-circle">
              <div className="profile-picture"></div>
            </div>
          </div>
        </div>
      </div>
      <div className="details-container">
        <div className="details">
          <div className="detail-group">
            <p>Name: </p>
            <p>Shriyans</p>
          </div>
          <hr />
          <div className="detail-group">
            <p>Age: </p>
            <p>18</p>
          </div>
          <hr />
          <div className="detail-group">
            <p>Gender: </p>
            <p>Male</p>
          </div>
          <hr />
          <div className="detail-group">
            <p>Email: </p>
            <p>Shriyansjindal@gmail.com</p>
          </div>
        </div>

        <div className="user-favourites">
          <div className="favourite-colors">
            <h2>Colors</h2>
            <div className="colors">
              <div className="color1 color"></div>
              <div className="color2 color"></div>
              <div className="color3 color"></div>
              <div className="color4 color"></div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Profile;
