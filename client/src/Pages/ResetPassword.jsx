import React, { useState,useEffect } from "react";
import Navbar from "../Components/Navbar";
import "./ResetPassword.css";
import Footer from "../Components/Footer";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { PinInput, PinInputField, HStack } from "@chakra-ui/react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ResetPassword = () => {
  let navigate = useNavigate();
  let [steps, setSteps] = useState(1);
  let [email, setEmail] = useState("");
  let [otp, setOtp] = useState("");
  let [pin,setPin] = useState(['','','','','',''])

  let handlePinChange =(i,val)=>{
    let newPin = [...pin]
    newPin[i] = val
    setPin(newPin)
  }

  let submitEmail = (e) => {
    e.preventDefault();
    let loading = toast.loading("Sending...",{position: "top-center"})

    axios
      .post(`${API_URI}/resetPassword`, { email: email })
      .then((res) => {
        toast.update(loading,{render:"OTP SENT",type:"success",isLoading:false,position: "top-center",autoClose: 1000})
        setOtp(res.data.otp);
        setSteps(2);

      })
      .catch((err) => {
        // console.log(err.response.data.message);
        toast.update(loading,{render:`${err.response.data.message}`,type:"error",isLoading:false,position: "top-center",autoClose: 1000})
      });
  };

  let handleOTP = (e) => {
    e.preventDefault();
    // console.log("OTP Submitted",pin.join(''));
    if (parseInt(pin.join('')) !== otp) {
      toast.error("Invalid OTP", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
      return;
    }
      setSteps(3);
  };

  let updatePass = (e) => {
    e.preventDefault();
    // console.log("Password Updated",e.target[0].value);
    axios.post(`${API_URI}/updatePassword`, { email: email, password: e.target[0].value}).then((res) => {
      // console.log(res.data);
      toast.success("Password Updated", {
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
      .catch((err) => {
        console.log(err);
      });

    navigate("/login");
  };

  return (
    <div>
      <Navbar />
      <div className="reset-Cont">
        {steps === 1 && (
          <form className="form" onSubmit={submitEmail}>
            <h1 style={{fontWeight:400, margin:'20px'}}>RESET PASSWORD</h1>
            <div className="flex-column">
              <label>Email </label>
            </div>
            <div className="inputForm">
              <svg
                height="20"
                viewBox="0 0 32 32"
                width="20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="Layer_3" data-name="Layer 3">
                  <path d="m30.853 13.87a15 15 0 0 0 -29.729 4.082 15.1 15.1 0 0 0 12.876 12.918 15.6 15.6 0 0 0 2.016.13 14.85 14.85 0 0 0 7.715-2.145 1 1 0 1 0 -1.031-1.711 13.007 13.007 0 1 1 5.458-6.529 2.149 2.149 0 0 1 -4.158-.759v-10.856a1 1 0 0 0 -2 0v1.726a8 8 0 1 0 .2 10.325 4.135 4.135 0 0 0 7.83.274 15.2 15.2 0 0 0 .823-7.455zm-14.853 8.13a6 6 0 1 1 6-6 6.006 6.006 0 0 1 -6 6z"></path>
                </g>
              </svg>
              <input
                type="text"
                className="input"
                placeholder="Enter your Email"
                onChange={(e) => setEmail((e.target.value).trim())}
              />
            </div>

            <button className="button-submit">Send OTP</button>
          </form>
        )}

        {steps === 2 && (
          <div className="otp-box">
            <form className="form" onSubmit={handleOTP}>
              {" "}
              {/* <div className="title">OTP</div>{" "} */}
              <div className="title">Enter OTP</div>{" "}
              <p className="message">
                We have sent a verification code to your Email
              </p>{" "}
              <div className="inputs">
              <HStack>
      <PinInput>
        {pin.map((value, index) => (
          <PinInputField
            key={index}
            value={value}
            onChange={(e) => handlePinChange(index, e.target.value)}
          />
        ))}
      </PinInput>
    </HStack>
              </div>{" "}
              <button className="action">verify me</button>{" "}
            </form>
          </div>
        )}

        {steps === 3 && (
          <form className="form" onSubmit={updatePass}>
            <h1>RESET PASSWORD</h1>
            <div className="flex-column">
              <label>Enter New Password </label>
            </div>
            <div className="inputForm">
              <svg
                height="20"
                viewBox="-64 0 512 512"
                width="20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="m336 512h-288c-26.453125 0-48-21.523438-48-48v-224c0-26.476562 21.546875-48 48-48h288c26.453125 0 48 21.523438 48 48v224c0 26.476562-21.546875 48-48 48zm-288-288c-8.8125 0-16 7.167969-16 16v224c0 8.832031 7.1875 16 16 16h288c8.8125 0 16-7.167969 16-16v-224c0-8.832031-7.1875-16-16-16zm0 0"></path>
                <path d="m304 224c-8.832031 0-16-7.167969-16-16v-80c0-52.929688-43.070312-96-96-96s-96 43.070312-96 96v80c0 8.832031-7.167969 16-16 16s-16-7.167969-16-16v-80c0-70.59375 57.40625-128 128-128s128 57.40625 128 128v80c0 8.832031-7.167969 16-16 16zm0 0"></path>
              </svg>
              <input
                type="password"
                className="input"
                placeholder="Enter your password"
              />
            </div>

            <button className="button-submit">Update</button>
          </form>
        )}
      </div>
      <Footer />
      <ToastContainer/>
    </div>
  );
};

export default ResetPassword;
