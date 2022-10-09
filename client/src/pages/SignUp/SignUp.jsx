import React from 'react'
import {Avatar, Button, Checkbox, FormControlLabel, Grid,Paper, TextField,Typography,Link} from '@mui/material'
import {AddCircleOutlineOutlined} from '@mui/icons-material/';
import useForm from '../../hooks/useForm'
import validate from '../../components/utils/validate'
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SignUp = () => {
    const PaperStyle ={
        padding:20,
        height:'90vh',
        width:300,
        margin:"0 auto" 
    }
    const avatarStyle ={
        backgroundColor:"#6076d7"
    }
    const buttonStyle ={
        margin:'15px 0'
    };
    const {error}=useContext(AuthContext);
    const {handleChange,values,handleSubmit,errors}=useForm(validate); 
  return (
    <div className='login'>
        <Grid>
            <Paper style={PaperStyle}>
                <Grid  align="center">
                    <Avatar style={avatarStyle}><AddCircleOutlineOutlined/></Avatar>
                    <h2>Sign up</h2>
                    <Typography variant='caption'>Please fill this form to create an account</Typography>
                </Grid>
                <TextField
                    type="text" placeholder='Enter your name'
                    variant='standard' fullWidth required
                    onChange={handleChange}
                    id="username"
                    name="username"
                    value={values.username}
                    error={errors.username && errors.username}
                    label={errors.username ? errors.username:"User Name"}
                    />
                <TextField
                    type="email"
                    placeholder='booking@gmail.com'
                    variant='standard' fullWidth required
                    onChange={handleChange}
                    id="email"
                    name="email"
                    value={values.email}
                    error={errors.email && errors.email}
                    label={errors.email ? errors.email:"Email Id"}
                    />
                    <TextField
                        placeholder='Enter your password'
                        type="password"
                        variant='standard' fullWidth required
                        id="password"
                        name="password"
                        value={values.password}
                        onChange={handleChange}
                        error={errors.password && errors.password}
                        label={errors.password ? errors.password:"Password"}
                    />
                    <TextField
                        placeholder='Confirm password'
                        type="text"
                        variant='standard' fullWidth required
                        name="confirmPassword"
                        value={values.confirmPassword}
                        onChange={handleChange}
                        error={errors.confirmPassword && errors.confirmPassword}
                        label={errors.confirmPassword ? errors.confirmPassword:"ConfirmP assword"}
                    />
                    <Button color="primary" 
                        onClick={handleSubmit}
                        type="button" variant ='contained' 
                        fullWidth style={buttonStyle}
                    >
                        Sign Up
                    </Button>
            </Paper>
        </Grid>
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
    </div>
  )
}

export default SignUp