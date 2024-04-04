import React from 'react'
import "./ColorsPage.css"
import Navbar from '../Components/Navbar'
import ColorCard from '../Components/ColorCard'
import data from '../Colors.json'
const ColorsPage = () => {



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
