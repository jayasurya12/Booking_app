import './Navbar.css';
import {Link, useNavigate} from 'react-router-dom'
import { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import {Avatar,Menu,IconButton,Typography,MenuItem} from '@mui/material'

const Navbar = () => {
  const [anchorElUser, setAnchorElUser] =useState(null);

 
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const settings =['Logout']
  const {user,dispatch} =useContext(AuthContext);
  const navigate =useNavigate();
  const LogOut=()=>{
    dispatch({type:"LOGIN_OUT",payload:null});
    navigate('/')

  }
  return (
    <div className="navbar">
        <div className="navContainer">
          <Link to='/' style={{color:'inherit',textDecoration:'none'}}>
            <span className="logo">Roombooking</span>
          </Link>
          {user? 
            // <Avatar style={{marginTop:"10px"}}>{user.username.slice(0,2).toUpperCase()}</Avatar>
            <div>
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="">{user?.username?.slice(0,2).toUpperCase()}</Avatar>
                </IconButton>
              <Menu
                sx={{ mt: '30px',ml:'-50px', height:'60vh'}}
                id="menu-appbar"
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem key={setting} onClick={handleCloseUserMenu}>
                    <Typography textAlign="center" onClick={LogOut}>{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
              </div>
            :
            <div className="navItems">
              <Link to='/LoginSignup'>
                <button className="navButton">Register</button>
              </Link>
              <Link to='/LoginSignup'>
                <button className="navButton">Login</button>
              </Link>
              
            </div>
          }
        </div>
    </div>
  )
}

export default Navbar