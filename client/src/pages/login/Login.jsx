import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import "./Login.css";

const Login = () => {

    const [credentials,setCredentials] =useState({
        email:undefined,
        password:undefined
    })
    const {loading,error,dispatch}=useContext(AuthContext);

    const handleChange =(e)=>{
        setCredentials((pre)=>({
            ...pre,
            [e.target.id]:[e.target.value]
        }))
    }
    const navigate = useNavigate();
    const handleClick =async e=>{
        e.preventDefault();
        dispatch({type:"LOGIN_START"});
        try {
            const res = await axios.post('/auth/login',credentials);
            dispatch({type:"LOGIN_SUCCESS",payload:res.data})
             navigate('/');
        } catch (error) {
            dispatch({type:"LOGIN_FAILURE",payload:error.response.data})
        }
    };
  return (
    <div className="login">
        <div className="lContainer">
            <input type="email" placeholder="email" id="email" onChange={handleChange} className='lInput'/>
            <input type="type" placeholder="password" 
            id="password" onChange={handleChange} className='lInput'
            required/>
            <button className="lButton" disabled={loading} onClick={handleClick}>Login</button>
        </div>
        {error && 
            <span>{error}</span>
        }
    </div>
  )
}

export default Login