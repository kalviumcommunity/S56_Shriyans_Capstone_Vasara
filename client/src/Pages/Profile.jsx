import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import "./Profile.css";
import Cookies from "js-cookie";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
const Profile = () => {

  let [data,setData]=useState()
  let [loading,setLoading] = useState(true)
  let handleFileChange =  (e) => {
    e.preventDefault();
    const formData = new FormData();
    const tokenFromCookie = Cookies.get("token");
    formData.append('image', e.target.files[0]);
    axios.put(`${API_URI}/profile/${tokenFromCookie}`, formData).then((res) => {
      console.log(res);
    }).catch((err) => {
      console.log(err);
    });
  }; 
  useEffect(() => {
    const fetchProfileData = async () => {
      const tokenFromCookie = Cookies.get("token");
      try {
        const response = await axios.get(`${API_URI}/profile/${tokenFromCookie}`);
        
        console.log(response.data);
        setData(response.data);
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
      finally {
        // Code to stop loader
        setLoading(false);

      }

    };

    fetchProfileData();
  }, [handleFileChange]);



  return (
    <div>
      <Navbar />

      {loading ? <h1>Loading...</h1> :
      (<div>
      <div className="profile-container">

        <Link   to={`/updateProfile/${data._id}`}>
        <button className="edit-profile">Edit</button>
        </Link>
        <div className="profile-img-container">
          <div className="lines"></div>
          <div className="lines"></div>
          <div className="lines"></div>
          <div className="card-header">
            <div className="outer-circle">
              <div className="profile-picture" style={{backgroundImage: `url(${data.Image})`}}>
              <form  className="upload-profile-pic">
        <input type="file" onChange={handleFileChange} />
      </form>
        <h2 className="upload-image">Upload Image</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="details-container">
        <div className="details">
          <div className="detail-group">
            <p>Name: </p>
            <p>{data.firstName} {data.lastName}</p>
          </div>
          <hr />
          <div className="detail-group">
            <p>Age: </p>
            <p>{data.age}</p>
          </div>
          <hr />
          <div className="detail-group">
            <p>Gender: </p>
            <p>{data.gender}</p>
          </div>
          <hr />
          <div className="detail-group">
            <p>Email: </p>
            <p>{data.email}</p>
          </div>
        </div>

        <div className="user-favourites">
          <div className="favourite-colors">
            <h2>Favourite Colors</h2>
            <div className="colors">
              <div className="color1 color" style={{backgroundColor:`${data.Colors.Color1}`}}></div>
              <div className="color2 color"style={{backgroundColor:`${data.Colors.Color2}`}}></div>
              <div className="color3 color"style={{backgroundColor:`${data.Colors.Color3}`}}></div>
              <div className="color4 color" style={{backgroundColor:`${data.Colors.Color4}`}}></div>
            </div>
          </div>

        </div>
      </div>
      </div>)
      }
    </div>
  );
};

export default Profile;
