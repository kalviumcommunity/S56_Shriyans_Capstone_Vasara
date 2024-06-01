import React from 'react'
import "./AddDress.css"
import { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const AddDress = () => {
  const [step, setStep] = useState(1);
    const [flavors, setFlavors] = useState({
        Tops: false,
        Bottoms: false,
        Outerwear: false,
        Dresses: false,
        Accessories: false,
        Shoes: false,
      });
    
      const handleCheckboxChange = (event) => {
        const { name, checked } = event.target;
        setFlavors((prevFlavors) => ({
          ...prevFlavors,
          [name]: checked,
        }));
      };

      const handleSubmit = async (e) => {
        e.preventDefault();
        try {
        // console.log(e.target.image.files[0]);
        let loading = toast.loading("Uploading...",{position: "top-center"})
        const file = await removeBackground(e.target.image.files[0]);
        // console.log(file);
        const formData = new FormData();
        formData.append('image', file);

          axios.post(`${API_URI}/add-dress/${Cookies.get('token')}`, formData).then((res) => {
            // console.log(res);
            toast.update(loading,{render:"Image Added",type:"success",isLoading:false,position: "top-center",autoClose: 1000})
            setStep(2);
          }
          ).catch((err) => {
            console.log(err);
          });

        } catch (error) {
          console.error(error);
        }
      };
    
      const handleImageUpload = (e) => {
        const file = e.target.files[0];
        removeBackground(file);
      };

      const removeBackground = (file) => {
        return new Promise((resolve, reject) => {
          const formData = new FormData();
          formData.append('image_file', file);
          formData.append('size', 'auto');
      
          const apiKey = 'QEfgAYoARWTLf2yKsbQNaJb4';
      
          fetch('https://api.remove.bg/v1.0/removebg', {
            method: 'POST',
            headers: {
              'X-Api-Key': apiKey,
            },
            body: formData,
          })
            .then((response) => {
              if (!response.ok) {
                throw new Error('Network response was not ok');
              }
              return response.blob();
            })
            .then((blob) => {
              const processedFile = new File([blob], file.name, { type: blob.type });
              resolve(processedFile);
            })
            .catch((error) => {
              console.error('Error:', error);
              reject(error);
            });
        });
      };
      

  return (
    <div>
      {step === 1 && ( <div className='form-cont'>
      <h1>Add Item</h1>
      <form className="form" onSubmit={handleSubmit} >
    <div className="flex-column">
      <label>Add Image </label></div>
      <div className="inputForm">

<input type="file" className='input'  name='image' onChange={handleImageUpload}  />
      </div>
      <button className="button-submit" >Add</button>
</form>
    </div>
      )}
   
    {
      step === 2 && (
        <div className='form-cont'>
          <h1>Item Added</h1>
          <div className="flex-column"> 
      <label>category </label></div>

   <div className="flavor-selector">
      <div className="flavors">
        {Object.keys(flavors).map((flavor) => (
          <label key={flavor} style={{ fontSize: 12}} className="flavor-option" >
            <input
              type="checkbox"
              className='input'
              name={flavor}
              checked={flavors[flavor]}
              onChange={handleCheckboxChange}
            />
            {flavor.charAt(0).toUpperCase() + flavor.slice(1)}
          </label>
        ))}
        <button className="button-submit">Submit</button>
      </div>
    </div>

        </div>
      )
    }
    <ToastContainer />
    </div>
  )
}

export default AddDress
