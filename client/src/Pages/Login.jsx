import React from 'react'
import "./Login.css"
import loginbg from "../assets/login_background.png"
import { useForm } from "react-hook-form"
import { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
    const [regist,setRegist] = useState(false)
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm()

      const onSubmit=(val)=>{
        console.log(val)
        setRegist(true)
        toast.success('Login Successful!', {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          });
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
            Signup
        </form>
      </div>
    </div>
  )
}

export default Login
