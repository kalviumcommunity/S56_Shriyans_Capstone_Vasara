import React from 'react'
import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'
import "./AddColors.css"
import { useState } from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddColors = () => {
    const [name, setName] = useState('')
    const [color1, setColor1] = useState('')
    const [color2, setColor2] = useState('')
    const [climate, setClimate] = useState('')
    const [mood, setMood] = useState('')
    const [style, setStyle] = useState('')

    const id = Cookies.get('token')

    const handleSubmit = async(e) => {
        e.preventDefault()
        let loading = toast.loading("Logging in...",{position: "top-center"})
        let color1code = color1.substring(1)
        let color2code = color2.substring(1)
        const color1name = await axios.get(`https://www.thecolorapi.com/id?hex=%23${color1code}&format=JSON`)
        const color2name = await axios.get(`https://www.thecolorapi.com/id?hex=%23${color2code}&format=JSON`)
        let data ={
            name: name,
            color1: {name: color1name.data.name.value, code: color1},
            color2: {name: color2name.data.name.value, code: color2},
            climate: climate,
            mood: mood,
            style: style
        }
        axios.post(`http://localhost:3001/addcolors/${id}`,data)
        .then((el) => {
          toast.update(loading,{render:"Data Added",type:"success",isLoading:false,position: "top-center",autoClose: 2000})
        })
        .catch(err => {
          toast.update(loading,{render:`${err.response.data.error}`,type:"error",isLoading:false,position: "top-center",autoClose: 2000})
        });

    }

  return (
    <div>
      <Navbar/>
      <div className="add-colors-container">
      <div className="login-cont">
        <form className="form" onSubmit={handleSubmit}>
          <h1>Add Colors</h1>
    <div className="flex-column">
      <label>Name </label></div>
      <div className="inputForm">

<input type="text" className='input' onChange={(e)=>setName(e.target.value)} />
      </div>

      <div className="flex-column">
      <label>Color1</label></div>
      <div className="inputForm">

{/* <input type="text" className='input' placeholder='Enter Color1 Name' /> */}
<input type="color" className='input'  onChange={(e)=>setColor1(e.target.value)}/>
      </div>

      <div className="flex-column">
      <label>Color2</label></div>
      <div className="inputForm">

{/* <input type="text" className='input' placeholder='Enter Color2 Name' /> */}
<input type="color" className='input' onChange={(e)=>setColor2(e.target.value)}  />
      </div>

    <div className="flex-column">
      <label>Climate</label></div>
      <div className="inputForm">

<input type="text" className='input' onChange={(e)=>setClimate(e.target.value)}/>
      </div>

    <div className="flex-column">
      <label>Mood</label></div>
      <div className="inputForm">

<input type="text" className='input' onChange={(e)=>setMood(e.target.value)} />
      </div>


    
    <div className="flex-column">
      <label>Style </label></div>
      <div className="inputForm">
        <input type="text" className='input'  onChange={(e)=>setStyle(e.target.value)}/>

      </div>

    <button className="button-submit">Submit</button>
</form>
      </div>
      </div>
      <Footer/>
      <ToastContainer/>
    </div>
  )
}

export default AddColors
