import axios from 'axios';
import React, { useContext, useState } from 'react'
import { AuthContext } from '../context/AuthContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UseForm = (validate) => {
    const [values,setValues]=useState({
        username:"",
        email:"",
        password:"",
        confirmPassword:"",
    })
    const [errors,setErrors]=useState({});

    const handleChange =(e)=>{
        const {name,value}=e.target;
        setValues((pre)=>({
            ...pre,
            [name]:value
        }))
    }
    const {loading,error,dispatch}=useContext(AuthContext);
    const handleSubmit =async(event)=>{
        event.preventDefault();
        setErrors(validate(values));
        try {
            const {data} =await axios.post('/auth/register',values);
            toast.success(data.msg, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });
        } catch (error) {
            toast.error(error.response.data.msg, {
                position: "top-left",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });
        }
    }
  return {handleChange,values,handleSubmit,errors}
}

export default UseForm