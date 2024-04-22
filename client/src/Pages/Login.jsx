import React from 'react'
import "./Login.css"
import loginbg from "../assets/login_background.png"
import { useForm } from "react-hook-form"
import { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from "react-router-dom";
import axios from 'axios'
import Cookies from "js-cookie"
import { useNavigate } from 'react-router-dom'
import Navbar from '../Components/Navbar';
import AppleIcon from '@mui/icons-material/Apple';
import Footer from '../Components/Footer';

const Login = () => {
    const [regist,setRegist] = useState(false)
    const navigate = useNavigate()
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm()

      const onSubmit=(val)=>{
        // console.log(val)
        let loading = toast.loading("Logging in...",{position: "top-center"})
          axios.post(`${API_URI}/login`,{email:val.email.toLowerCase(),password:val.password})
          .then((res)=>{
            Cookies.set('token', res.data.token, { expires: 7 , path: ''})
            // console.log(res.data)
            setRegist(true)
            toast.update(loading,{render:"Login Successful!",type:"success",isLoading:false,position: "top-center",autoClose: 2000})
              setTimeout(() => {
                
                navigate("/")
              }, 1500);
          })
          .catch((error)=>{
            console.log(error.response.data)
            toast.update(loading,{render:`${error.response.data}`,type:"error",isLoading:false,position: "top-center",autoClose: 2000})

          
          })

      }
  return (
    <div className='Login'>
      <ToastContainer/>
      <Navbar/>
      <div className="login-cont">
        <form className="form" onSubmit={handleSubmit(onSubmit)}>
          <h1>Login</h1>
    <div className="flex-column">
      <label>Email </label></div>
      <div className="inputForm">
        <svg height="20" viewBox="0 0 32 32" width="20" xmlns="http://www.w3.org/2000/svg"><g id="Layer_3" data-name="Layer 3"><path d="m30.853 13.87a15 15 0 0 0 -29.729 4.082 15.1 15.1 0 0 0 12.876 12.918 15.6 15.6 0 0 0 2.016.13 14.85 14.85 0 0 0 7.715-2.145 1 1 0 1 0 -1.031-1.711 13.007 13.007 0 1 1 5.458-6.529 2.149 2.149 0 0 1 -4.158-.759v-10.856a1 1 0 0 0 -2 0v1.726a8 8 0 1 0 .2 10.325 4.135 4.135 0 0 0 7.83.274 15.2 15.2 0 0 0 .823-7.455zm-14.853 8.13a6 6 0 1 1 6-6 6.006 6.006 0 0 1 -6 6z"></path></g></svg>

<input type="email" className='input' placeholder='Enter your Email' name='email' {...register("email",{required:"Email is required", pattern:{value:/^\S+@\S+$/i,message:"Invalid Email"}}) } />
      </div>
{errors.email && <p className='err'>{errors.email.message}</p>}
    
    <div className="flex-column">
      <label>Password </label></div>
      <div className="inputForm">
        <svg height="20" viewBox="-64 0 512 512" width="20" xmlns="http://www.w3.org/2000/svg"><path d="m336 512h-288c-26.453125 0-48-21.523438-48-48v-224c0-26.476562 21.546875-48 48-48h288c26.453125 0 48 21.523438 48 48v224c0 26.476562-21.546875 48-48 48zm-288-288c-8.8125 0-16 7.167969-16 16v224c0 8.832031 7.1875 16 16 16h288c8.8125 0 16-7.167969 16-16v-224c0-8.832031-7.1875-16-16-16zm0 0"></path><path d="m304 224c-8.832031 0-16-7.167969-16-16v-80c0-52.929688-43.070312-96-96-96s-96 43.070312-96 96v80c0 8.832031-7.167969 16-16 16s-16-7.167969-16-16v-80c0-70.59375 57.40625-128 128-128s128 57.40625 128 128v80c0 8.832031-7.167969 16-16 16zm0 0"></path></svg>        
        <input type="password" className='input' placeholder='Enter your password' name='password' {...register("password",{required:"Password is required", minLength:{value:5, message:"Password must be more than 4 characters"}
        ,maxLength:{
          value:20,
          message:"Password cannot be more than 20 characters"
        }}) } />

      </div>
            {errors.password && <p className='err'>{errors.password.message}</p>}
    
    <div className="flex-row">
        <Link to={"/resetpassword"}>
      <span className="span">Forgot password?</span></Link>
    </div>
    <button className="button-submit">Sign In</button>
    <p className="p">Don't have an account? 
    <span className="span">Sign Up</span>

    </p><p className="p line">Or With</p>

    <div className="flex-row">
      <button className="btn google">
      <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="25" height="25" viewBox="0 0 48 48">
<path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path><path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path><path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path><path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
</svg>
        Google 
      </button><button className="btn apple">
        <AppleIcon/>
        Apple 
</button></div></form>
      </div>
      <Footer/>
    </div>
  )
}

export default Login
