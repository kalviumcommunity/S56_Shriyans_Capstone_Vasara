import React from "react";
import "./Signup.css";
import Navbar from "../Components/Navbar";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AppleIcon from '@mui/icons-material/Apple';
import Footer from "../Components/Footer";

const Signup = () => {
  const navigate = useNavigate();
  const [regist, setRegist] = useState(false);
  let Colors = {
    Color1: "",
    Color2: "",
    Color3: "",
    Color4: "",
  };
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (val) => {
    console.log(val)
    let loading = toast.loading("Registering...", {
      position: "top-center",
    });
    axios
      .post(`${API_URI}/signup`, {
        firstName: val.firstName,
        lastName: val.lastName,
        age: val.age,
        gender: val.gender,
        email: val.email.toLowerCase(),
        password: val.password,
        Colors,
        Image: "",
        favColors:[]
      })
      .then((res) => {
        setRegist(true);
        toast.update(loading, {
          render: "Registration Successful!",
          type: "success",
          isLoading: false,
          position: "top-center",
          autoClose: 2000,
        });
        setTimeout(() => {
          navigate("/login");
        }, 1000);
      })
      .catch((error) => {
        toast.update(loading, {
          render: `${error.response.data}`,
          type: "error",
          isLoading: false,
          position: "top-center",
          autoClose: 2000,
        });
      });
  };

  return (
    <div className="signup">
      <Navbar />
      <div className="sigun_container">
        <div className="signup_image">
          {/* <img src={Singup_image} alt="" /> */}

        </div>
        <div className="login-cont">
          <form className="form" onSubmit={handleSubmit(onSubmit)}>
          <h1 className="Register">Register</h1>
            <div className="inputForm">
              <input
                type="text"
                className='input'
                placeholder='Enter your First Name'
                {...register("firstName", { required: "First Name is required" })}
              />
            </div>
              {errors.firstName && <p className='err'>{errors.firstName.message}</p>}

            <div className="inputForm">
              <input
                type="text"
                className='input'
                placeholder='Enter your Last Name'
                {...register("lastName")}
              />
            </div>
              {errors.lastName && <p className='err'>{errors.lastName.message}</p>}

            <div className="inputForm">
              <input
                type="number"
                className='input'
                placeholder='Enter your Age'
                {...register("age")}
              />
            </div>
              {errors.age && <p className='err'>{errors.age.message}</p>}
              <div className="inputForm">
  <select
    className='input'
    {...register("gender", { required: "Gender is required" })}
  >
    <option value="">Select Gender</option>
    <option value="Male">Male</option>
    <option value="Female">Female</option>
    <option value="Other">Other</option>
    {/* Add more options as needed */}
  </select>
</div>
{errors.gender && <p className='err'>{errors.gender.message}</p>}


            <div className="inputForm">
              <input
                type="email"
                className='input'
                placeholder='Enter your email'
                {...register("email", { required: "Email is required", pattern: { value: /^\S+@\S+$/i, message: "Invalid Email" } })}
              />
            </div>
              {errors.email && <p className='err'>{errors.email.message}</p>}

            <div className="inputForm">
              <input
                type="password"
                className='input'
                placeholder='Enter your password'
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 5,
                    message: "Password must be more than 4 characters",
                  },
                  maxLength: {
                    value: 20,
                    message: "Password cannot be more than 20 characters",
                  },
                })}
              />
            </div>
              {errors.password && <p className='err'>{errors.password.message}</p>}

            <button className="button-submit" type="submit">Sign Up</button>
            <p className="p">Already have an account? <Link to={"/login"} className="span">Sign In</Link></p>
          </form>
        </div>
      </div>
      <ToastContainer />
      <Footer/>
    </div>
  );
};

export default Signup;
