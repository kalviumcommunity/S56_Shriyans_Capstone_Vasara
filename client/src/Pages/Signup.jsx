import React from "react";
import "./Signup.css";
import Navbar from "../Components/Navbar";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import axios from "axios";
const Signup = () => {
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
    // console.log(val);
    axios
      .post("https://s56-shriyans-capstone-vasara.onrender.com/signup", {
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
        toast.success("Registration Successful!", {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      })
      .catch((error) => {
        console.log(error.response.data);
        toast.error(`${error.response.data}`, {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
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
        <div className="signup_form">
          <h1 className="register">Register</h1>
          <form action="" className="form" onSubmit={handleSubmit(onSubmit)}>
            <div className="inp">
              <input
                type="text"
                placeholder="Enter your First Name"
                name="firstName"
                {...register("firstName", {
                  required: "First Name is required",
                })}
              />
              {errors.firstName && (
                <p className="err">{errors.firstName.message}</p>
              )}
            </div>
            <div className="inp">
              <input
                type="text"
                placeholder="Enter your Last Name"
                name="lastName"
                {...register("lastName")}
              />
              {errors.lastName && (
                <p className="err">{errors.lastName.message}</p>
              )}
            </div>
            <div className="inp">
              <input
                type="number"
                placeholder="Enter your Age"
                name="age"
                {...register("age")}
              />
              {errors.age && <p className="err">{errors.age.message}</p>}
            </div>

            <div className="inp">
              <select
                name="gender"
                className="gender-select"
                {...register("gender", {
                  required: "Gender is required",
                })}
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
              {errors.gender && <p className="err">{errors.gender.message}</p>}
            </div>

            <div className="inp">
              <input
                type="email"
                placeholder="Enter your Email"
                name="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: { value: /^\S+@\S+$/i, message: "Invalid Email" },
                })}
              />
              {errors.email && <p className="err">{errors.email.message}</p>}
            </div>
            <div className="inp">
              <input
                type="password"
                placeholder="Enter your password"
                name="password"
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
              {errors.password && (
                <p className="err">{errors.password.message}</p>
              )}
            </div>
            <input className="signup_btn btn" type="submit" value="Signup" />
            <br />
            <Link to={"/login"} className="loginbtn">
              Login
            </Link>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Signup;
