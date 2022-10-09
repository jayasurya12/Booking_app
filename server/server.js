const express = require('express');
const app = express();
const api = require('./router');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config({path:"./config.env"});
const DB = require('./config/db');
DB();

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.get('/',(req,res)=>{
    res.json("server working")
});
//middlewares
app.use('/',api);

app.listen(process.env.PORT || 5000,()=>{
    console.log('server started');
});