import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import "./UpdateProfile.css"
import AlertDialog from './Alert'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from './Footer'

const UpdateUserData = () => {
const {id} = useParams()
let [loading,setLoading] = useState(true)
let [data,setData] = useState();
let [Colors,setColors] = useState()
useEffect(() => {
    axios.get(`${API_URI}/updateProfile/${id}`).then((res) => {
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
    axios.put(`${API_URI}/updateProfile/${id}`,{...data,Colors}).then((res) => {
        console.log(res);
        toast.update(loading,{render:"Profile Updated!",type:"success",isLoading:false,position: "top-center",autoClose: 2000})  
      }
    ).catch((err) => {
        console.log(err);
        toast.update(loading,{render:"Try Again Later!",type:"error",isLoading:false,position: "top-center",autoClose: 2000})  
    }
    )
  };

  return (
    <div >
      <Navbar/>
      {loading ? <h1>Loading...</h1> :
      <div className="update-profile-container">
       
      <div className="login-cont">
      <form className="form" onSubmit={handleSubmit}>
        <h1>Update Profile</h1>
  <div className="flex-column">
    <label>First Name </label></div>
    <div className="inputForm">

<input type="text" className='input' required value={data.firstName} onChange={(e)=>setData({...data,firstName:e.target.value})} />
    </div>

    <div className="flex-column">
    <label>Last Name</label></div>
    <div className="inputForm">

{/* <input type="text" className='input' placeholder='Enter Color1 Name' /> */}
<input type="text" className='input' required value={data.lastName} onChange={(e)=>setData({...data,lastName:e.target.value})} />
    </div>

    <div className="flex-column">
    <label>Age</label></div>
    <div className="inputForm">

{/* <input type="text" className='input' placeholder='Enter Color2 Name' /> */}
<input type="number" className='input' required value={data.age} onChange={(e)=>setData({...data,age:e.target.value})} />
    </div>

  <div className="flex-column">
    <label>Favourite Color 1</label></div>
    <div className="inputForm">

<input type="color" className='input' value={Colors.Color1} onChange={(e)=>setColors({...Colors,Color1:e.target.value})} />
    </div>
  <div className="flex-column">
    <label>Favourite Color 2</label></div>
    <div className="inputForm">

<input type="color" className='input' value={Colors.Color2} onChange={(e)=>setColors({...Colors,Color2:e.target.value})} />
    </div>
  <div className="flex-column">
    <label>Favourite Color 3</label></div>
    <div className="inputForm">

<input type="color" className='input' value={Colors.Color3} onChange={(e)=>setColors({...Colors,Color3:e.target.value})} />
    </div>
  <div className="flex-column">
    <label>Favourite Color 4</label></div>
    <div className="inputForm">

<input type="color" className='input' value={Colors.Color4} onChange={(e)=>setColors({...Colors,Color4:e.target.value})} />
    </div>


  <button className="button-submit">Submit</button>
</form>
    </div>
      
</div>
}
<ToastContainer />
<Footer/>
    </div>
  )
}

export default UpdateUserData
