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
          axios.post("https://s56-shriyans-capstone-vasara.onrender.com/login",{email:val.email.toLowerCase(),password:val.password})
          .then((res)=>{
            Cookies.set('token', res.data.token, { expires: 7 , path: ''})
            console.log(res.data)
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
      <div className="login-form">
        <h1>LOGIN</h1>
        <form action="" className='form' onSubmit={handleSubmit(onSubmit)}>
            <div className="inp">

            <input type="email" placeholder='Enter your Email' name='email' {...register("email",{required:"Email is required", pattern:{value:/^\S+@\S+$/i,message:"Invalid Email"}}) } />
            {errors.email && <p className='err'>{errors.email.message}</p>}
            </div>
            <div className="inp">

            <input type="password" placeholder='Enter your password' name='password' {...register("password",{required:"Password is required", minLength:{value:5, message:"Password must be more than 4 characters"}
        ,maxLength:{
          value:20,
          message:"Password cannot be more than 20 characters"
        }}) } />
            {errors.password && <p className='err'>{errors.password.message}</p>}
        </div>
            <input className='btn' type="submit" value="submit" />
            <br />
            <Link to={"/signup"} className='loginbtn'>Signup</Link>
            
        </form>
      </div>
    </div>
  )
}

export default Login
