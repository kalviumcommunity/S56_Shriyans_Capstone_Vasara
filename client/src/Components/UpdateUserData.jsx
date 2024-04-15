import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import "./UpdateProfile.css"
import AlertDialog from './Alert'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UpdateUserData = () => {
const {id} = useParams()
let [loading,setLoading] = useState(true)
let [data,setData] = useState();
let [Colors,setColors] = useState()
const navigate = useNavigate()
useEffect(() => {
    axios.get(`https://s56-shriyans-capstone-vasara.onrender.com/updateProfile/${id}`).then((res) => {
      setData(res.data);
      setColors(res.data.Colors);
    }).catch((err) => {
      console.log(err);
    }).finally(() => {
      setLoading(false);
    });
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();
    let loading = toast.loading("Updating...",{position: "top-center"})
    axios.put(`https://s56-shriyans-capstone-vasara.onrender.com/updateProfile/${id}`,{...data,Colors}).then((res) => {
        console.log(res);
        toast.update(loading,{render:"Profile Updated!",type:"success",isLoading:false,position: "top-center",autoClose: 2000})  
      }
    ).catch((err) => {
        console.log(err);
        toast.update(loading,{render:"Try Again Later!",type:"success",isLoading:false,position: "top-center",autoClose: 2000})  
    }
    )
  };

  return (
    <div >
      <Navbar/>
      {loading ? <h1>Loading...</h1> :
      <div className="update-profile-container">
      <form action="" className='update-profile-form' onSubmit={handleSubmit}>
        <h1>Update Profile</h1>
        <label htmlFor="">First Name</label>
      <input type="text" placeholder='name' value={data.firstName} onChange={(e)=>setData({...data,firstName:e.target.value})}/> 
        <label htmlFor="">Last Name</label>
        <input type="text" placeholder='lastname' value={data.lastName} onChange={(e)=>setData({...data,lastName:e.target.value})}/>
        <label htmlFor="">Age</label>
        <input type="text" placeholder='age' value={data.age} onChange={(e)=>setData({...data,age:e.target.value})}/>
        <label htmlFor="">Favourite Color 1</label>
        <input type="text" placeholder='color1' value={Colors.Color1} onChange={(e)=>setColors({...Colors,Color1:e.target.value})}/>
        <label htmlFor="">Favourite Color 2</label>
        <input type="text" placeholder='color2' value={Colors.Color2} onChange={(e)=>setColors({...Colors,Color2:e.target.value})}/>
        <label htmlFor="">Favourite Color 3</label>
        <input type="text" placeholder='color3' value={Colors.Color3} onChange={(e)=>setColors({...Colors,Color3:e.target.value})}/>
        <label htmlFor="">Favourite Color 4</label>
        <input type="text" placeholder='color4' value={Colors.Color4} onChange={(e)=>setColors({...Colors,Color4:e.target.value})}/>
        <div style={{textAlign:"center"}}>

        <button type="submit">Submit</button>
        <AlertDialog className="alert"/>
        </div>
      </form>
      </div>
}
<ToastContainer />
    </div>
  )
}

export default UpdateUserData
