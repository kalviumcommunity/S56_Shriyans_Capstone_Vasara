import React, { useState,useEffect } from 'react'
import "./ColorsPage.css"
import Navbar from '../Components/Navbar'
import ColorCard from '../Components/ColorCard'
import axios from 'axios'
const ColorsPage = () => {

const [data,setData] = useState([])
useEffect(() => {
    axios.get("http://localhost:3001/colors")
    .then((res)=>{
        // console.log(res.data)
        setData(res.data)
    })
    .catch((err)=>{
        console.log(err)
    })
}
,[])
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
