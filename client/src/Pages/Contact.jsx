import React, { useEffect, useState } from 'react'
import Navbar from '../Components/Navbar'
import "./Contact.css"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
const Contact = () => {
    const [data,setData] = useState({ 
        name: "",
        email: "",
        message: ""
    })
    const handlesubmit = (e) => {
        e.preventDefault();
        console.log(data)
        // alert("Your message has been sent successfully! We will get back to you soon.")

        axios.post(`${API_URI}/feedback`,data)
        .then((res)=>{
            console.log(res.data)
            toast.success('Message sent', {
                position: "top-center",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                });
            setData({
                name: "",
                email: "",
                message: ""
            })
        })
        .catch((error)=>{
            toast.error(`${error.message}`, {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                });
  
  
            })
        }


  return (
    <div className='contact_container'>
              <ToastContainer/>
      <Navbar/>
      <div className="contact-form-container">
        <div className='contact-form'>


        <div className="form">
            <h1>Contact Us</h1>
            <form onSubmit={handlesubmit}>
                <label htmlFor="name">Name</label>
                <input type="text" name="name" placeholder="Your name.." value={data.name} required onChange={(e)=>setData({...data,name:e.target.value})}/>
                <label htmlFor="email">Email</label>
                <input type="email" name="email" placeholder="Your email.." value={data.email} required onChange={(e)=>setData({...data,email:e.target.value})}/>
                <label htmlFor="subject">Message</label>
                <br />
                <textarea id="subject" name="subject" placeholder="Write something.." value={data.message} required onChange={(e)=>setData({...data,message:e.target.value})}></textarea>
                <div className="submit-btn">

                <input type="submit" value="Submit"/>
                </div>
            </form>
        </div>
        <div className="contact-image">
        </div>
        </div>
        </div>
    </div>
  )
}

export default Contact
