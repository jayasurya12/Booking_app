import React from 'react'
import {Avatar, Button, Checkbox, FormControlLabel, Grid,Paper, TextField,Typography,Link} from '@mui/material'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LoginPage = ({signupChange}) => {
    const PaperStyle ={
        padding:20,
        height:'70vh',
        width:300,
        margin:"0 auto" 
    }
    const avatarStyle ={
        backgroundColor:"#6076d7"
    }
    const buttonStyle ={
        margin:'15px 0'
    }
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
            toast.error(error.response.data, {
                position: "top-left",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });
        }
    };
  return (
        <Grid>
            <Paper style={PaperStyle}>
                <Grid  align="center">
                <Avatar style={avatarStyle}><LockOutlinedIcon/></Avatar>
                <h2>Sign in</h2>
                </Grid>
                            <TextField
                            type="email"
                            label='Email Id' placeholder='booking@gmail.com'
                            variant='standard' fullWidth required
                            onChange={handleChange}
                            id="email"
                            />
                            <TextField
                                label='Password' placeholder='Enter your password'
                                type="password"
                                variant='standard' fullWidth required
                                id="password"
                                onChange={handleChange}
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                    name="checkDb"
                                    color='primary'
                                    />
                                }
                                label="Remember me"
                            />
                            <Button color="primary" 
                            disabled={loading} onClick={handleClick}
                            type="submit" variant ='contained' fullWidth style={buttonStyle}>Sign in</Button>
                            <Typography>
                                <Link href="#">ForgetPassword</Link>
                            </Typography>
                            <Typography>Do you have an account?
                                <Link href="#" onClick={()=>signupChange("event",1)}> Sign Up?</Link>
                            </Typography>
                            <ToastContainer 
                                position="top-left"
                                autoClose={5000}
                                hideProgressBar={false}
                                newestOnTop={false}
                                closeOnClick
                                rtl={false}
                                pauseOnFocusLoss
                                draggable
                                pauseOnHover
                            />
            </Paper>
        </Grid>
  )
}

export default LoginPage