import React, { useState,useEffect } from 'react'
import "./ColorsPage.css"
import Navbar from '../Components/Navbar'
import ColorCard from '../Components/ColorCard'
import axios from 'axios'
const ColorsPage = () => {

const [data,setData] = useState([])
const [loading,setLoading] = useState(true)
const [favorites, setFavorites] = useState(sessionStorage.getItem('favorites') ? JSON.parse(sessionStorage.getItem('favorites')) : [] )
useEffect(() => {
    const fetchData = async () => {
        try {
            const favoritesResponses = await Promise.all(
                favorites.map(fav => axios.get(`${API_URI}/colordetail/${fav}`))
            );
            const favoritesData = favoritesResponses.map(response => response.data);

            const colorsResponse = await axios.get(`${API_URI}/colors`);
            const colorsData = colorsResponse.data;

            // Combine both datasets
            const newsColors = colorsData.filter(color => !favorites.includes(color._id));
            setData([...favoritesData, ...newsColors]);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    fetchData();
}, [favorites]); // Including `favorites` in the dependency array in case it changes

  return (
    <div>
        <Navbar/>
        {loading ? <h1>Loading...</h1> : (        <div className="color-card-container">
        {data.map((color,i) => {
            return (
            <ColorCard  key ={i} props={color}/>
            )
        })}

        </div>)}

    </div>
  )
}

export default ColorsPage
