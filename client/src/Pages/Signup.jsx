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
import AppleIcon from "@mui/icons-material/Apple";
import Footer from "../Components/Footer";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { GoogleLogin } from "@react-oauth/google";

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
    console.log(val);
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
        favColors: [],
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

  let SignupwithGoogle = (credentialResponse) => {
    console.log("Google");
    console.log(credentialResponse);

    let loading = toast.loading("Registering...", {
      position: "top-center",
    });
    axios
      .post(`${API_URI}/signup_with_google`, {
        token: credentialResponse.credential,
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
                className="input"
                placeholder="Enter your First Name"
                {...register("firstName", {
                  required: "First Name is required",
                })}
              />
            </div>
            {errors.firstName && (
              <p className="err">{errors.firstName.message}</p>
            )}

            <div className="inputForm">
              <input
                type="text"
                className="input"
                placeholder="Enter your Last Name"
                {...register("lastName")}
              />
            </div>
            {errors.lastName && (
              <p className="err">{errors.lastName.message}</p>
            )}

            <div className="inputForm">
              <input
                type="number"
                className="input"
                placeholder="Enter your Age"
                {...register("age")}
              />
            </div>
            {errors.age && <p className="err">{errors.age.message}</p>}
            <div className="inputForm">
              <select
                className="input"
                {...register("gender", { required: "Gender is required" })}
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
                {/* Add more options as needed */}
              </select>
            </div>
            {errors.gender && <p className="err">{errors.gender.message}</p>}

            <div className="inputForm">
              <input
                type="email"
                className="input"
                placeholder="Enter your email"
                {...register("email", {
                  required: "Email is required",
                  pattern: { value: /^\S+@\S+$/i, message: "Invalid Email" },
                })}
              />
            </div>
            {errors.email && <p className="err">{errors.email.message}</p>}

            <div className="inputForm">
              <input
                type="password"
                className="input"
                placeholder="Enter your password"
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
            {errors.password && (
              <p className="err">{errors.password.message}</p>
            )}

            <button className="button-submit" type="submit">
              Sign Up
            </button>
            <p className="p">
              Already have an account?{" "}
              <Link to={"/login"} className="span">
                Sign In
              </Link>
            </p>
            <p className="p line">Or With</p>

            <div className="flex-row">
              {/* <button className="btn google"> */}
              {/* <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="25" height="25" viewBox="0 0 48 48">
<path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path><path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path><path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path><path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
</svg>
    Google  */}
              <GoogleOAuthProvider clientId="430112489474-l6g9p9p6oojc2r393irlur8r20bv8np0.apps.googleusercontent.com">
                <GoogleLogin
                  text="signup_with"
                  onSuccess={SignupwithGoogle}
                  onError={() => {
                    console.log("Login Failed");
                  }}
                />
              </GoogleOAuthProvider>
              {/* </button> */}
              <button className="btn apple">
                <AppleIcon />
                Apple
              </button>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer />
      <Footer />
    </div>
  );
};

export default Signup;
