import React, { useState,useEffect } from 'react'
import "./ColorsPage.css"
import Navbar from '../Components/Navbar'
import ColorCard from '../Components/ColorCard'
import axios from 'axios'
const ColorsPage = () => {

const [data,setData] = useState([])
useEffect(() => {
    const fetchData = async () => {
        try {
            const response = await axios.get(`${API_URI}/colors`);
            setData(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    fetchData();

}, []);
  return (
    <div>
        <Navbar/>
        <div className="color-card-container">
        {data.map((color,i) => {
            return (
            <ColorCard  key ={i} props={color}/>
            )
        })}

        </div>
    </div>
  )
}

export default ColorsPage
