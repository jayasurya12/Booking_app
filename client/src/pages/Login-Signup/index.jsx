import { Paper, Tab, Tabs,Box,Typography  } from '@mui/material'
import React, { useState } from 'react'
import LoginPage from '../login/LoginPage';
import SignUp from '../SignUp/SignUp';

const Index = () => {
    const paperStyle={
        width:340,
        margin:"20px auto",
       }
    function TabPanel(props) {
        const { children, value, index, ...other } = props;
      
        return (
          <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
          >
            {value === index && (
              <Box>
                <Typography>{children}</Typography>
              </Box>
            )}
          </div>
        );
      }
      
    const [value,setValue]=useState(0);

    const handleChange =(event,newValue)=>{
        setValue(newValue)
    }
  return (
    <Paper elevation={20} square style={paperStyle}> 
        <Tabs 
            value={value}
            indicatorColor='primary'
            textColor='primary'
            onChange={handleChange}
            aria-label="disabled tabs example"
        >
            <Tab label='Sign in' style={{width:100,marginLeft:50}}/>
            <Tab label='Sign up' style={{width:100,marginLeft:20}}/>
        </Tabs>
        <TabPanel value={value} index={0}>
            <LoginPage signupChange={handleChange}/>
        </TabPanel>
        <TabPanel value={value} index={1}>
            <SignUp/>
        </TabPanel>
    </Paper>
  )
}

export default Index