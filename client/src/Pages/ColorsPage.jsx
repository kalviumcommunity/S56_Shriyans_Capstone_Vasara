import React, { useState,useEffect } from 'react'
import "./ColorsPage.css"
import Navbar from '../Components/Navbar'
import ColorCard from '../Components/ColorCard'
import axios from 'axios'
const ColorsPage = () => {

const [data,setData] = useState([])
const [loading,setLoading] = useState(true)
useEffect(() => {
    const fetchData = async () => {
        try {
            const response = await axios.get(`${API_URI}/colors`);
            setData(response.data);
        } catch (error) {
            console.log(error);
        }
        finally{
            setLoading(false)
        }
    };

    fetchData();

}, []);
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
