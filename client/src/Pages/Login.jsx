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
import { GoogleOAuthProvider } from "@react-oauth/google";
import { GoogleLogin } from "@react-oauth/google";

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
      const SigninwithGoogle = (response) => {
        let token = response.credential
        // console.log(token)
        let loading = toast.loading("Logging in...",{position: "top-center"})

        axios.post(`${API_URI}/signin_with_google`,{token})
        .then((res)=>{
          // console.log(res)
          Cookies.set('token', res.data.token, { expires: 7 , path: ''})
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
      <div className="loginContainer">
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
    <GoogleOAuthProvider clientId="430112489474-l6g9p9p6oojc2r393irlur8r20bv8np0.apps.googleusercontent.com">
                <GoogleLogin
                  onSuccess={SigninwithGoogle}
                  onError={() => {
                    console.log("Login Failed");
                  }}
                />
              </GoogleOAuthProvider>
      <button className="btn apple">
        <AppleIcon/>
        Apple 
</button></div></form>
      </div>
      </div>
      <Footer/>
    </div>
  )
}

export default Login
