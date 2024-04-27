import React, { useEffect } from 'react'
import "./ColorCard.css"
import { useState } from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'
import { Link } from 'react-router-dom'
const ColorCard = ({props}) => {
    let data = props
    let color1 = data.color1.code
    let color2 = data.color2.code
    let token = Cookies.get('token')

    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
      axios.get(`${API_URI}/favorites/${token}`)
      .then(res => {
        setFavorites(res.data.favColors || []);
      })
      .catch(err => console.log(err));
    }
    , []);

  const handleFav = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.get(`${API_URI}/favorites/${token}`);
      const favColors = res.data.favColors || [];
  
      if (favColors.includes(data._id)) {
        const updatedFavorites = favColors.filter(id => id !== data._id);
        await axios.put(`${API_URI}/favorites/${token}`, { favColors: updatedFavorites });
        setFavorites(updatedFavorites);
      } else {
        const updatedFavorites = [...favColors, data._id];
        await axios.put(`${API_URI}/favorites/${token}`, { favColors: updatedFavorites });
        setFavorites(updatedFavorites);
      }
    } catch (error) {
      console.error('Error handling favorites:', error);
    }
  };
  return (
<div className="color-container">
  <div className="palette">
    <div className="color" style={{backgroundColor: color1}}><span>{data.color1.name}</span></div>
    <div className="color" style={{backgroundColor: color2}}><span>{data.color2.name}</span></div>
    {/* <div className="color"><span>E9C46A</span></div> */}
  </div>
  <div className='color-name-container'> 

    <Link to={`../colordetails/${data._id}`}>
    <h2>{data.name}</h2>
    </Link>

    <div className="heart-container" title="Like" onClick={handleFav}>
            <input type="checkbox" className="checkbox" id="Give-It-An-Id" checked={favorites.includes(data._id)}/>
            <div className="svg-container">
                <svg viewBox="0 0 24 24" className="svg-outline" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17.5,1.917a6.4,6.4,0,0,0-5.5,3.3,6.4,6.4,0,0,0-5.5-3.3A6.8,6.8,0,0,0,0,8.967c0,4.547,4.786,9.513,8.8,12.88a4.974,4.974,0,0,0,6.4,0C19.214,18.48,24,13.514,24,8.967A6.8,6.8,0,0,0,17.5,1.917Zm-3.585,18.4a2.973,2.973,0,0,1-3.83,0C4.947,16.006,2,11.87,2,8.967a4.8,4.8,0,0,1,4.5-5.05A4.8,4.8,0,0,1,11,8.967a1,1,0,0,0,2,0,4.8,4.8,0,0,1,4.5-5.05A4.8,4.8,0,0,1,22,8.967C22,11.87,19.053,16.006,13.915,20.313Z">
                    </path>
                </svg>
                <svg viewBox="0 0 24 24" className="svg-filled" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17.5,1.917a6.4,6.4,0,0,0-5.5,3.3,6.4,6.4,0,0,0-5.5-3.3A6.8,6.8,0,0,0,0,8.967c0,4.547,4.786,9.513,8.8,12.88a4.974,4.974,0,0,0,6.4,0C19.214,18.48,24,13.514,24,8.967A6.8,6.8,0,0,0,17.5,1.917Z">
                    </path>
                </svg>
                <svg className="svg-celebrate" width="100" height="100" xmlns="http://www.w3.org/2000/svg">
                    <polygon points="10,10 20,20"></polygon>
                    <polygon points="10,50 20,50"></polygon>
                    <polygon points="20,80 30,70"></polygon>
                    <polygon points="90,10 80,20"></polygon>
                    <polygon points="90,50 80,50"></polygon>
                    <polygon points="80,80 70,70"></polygon>
                </svg>
            </div>
        </div>
        </div>
</div>
  )
}

export default ColorCard
