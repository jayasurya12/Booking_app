const jwt = require('jsonwebtoken');

const verifyToken = (req,res,next)=>{
        const token = req.cookies.access_token;
        if(!token) return res.json('you are not authenticated');
        jwt.verify(token,process.env.SECRETE_KEY,(err,decode)=>{
            if(err) return res.status(403).json(err,"Token is not valid!!!");
            console.log(decode);
            req.user = decode;
            next();
        })
}

const verifyUser = (req,res,next)=>{
    verifyToken(req,res,()=>{
        if(req.user.id == req.params.id || req.user.isAdmin){
            next();
        }
        else{
            res.status(403).json('user not authorized');
        }
    })
}
const verifyAdmin = (req,res,next)=>{
    verifyToken(req,res,next,()=>{
        if(req.user.isAdmin){
            next();
        }
        else{
            res.status(403).json('user not authorized');
        }
    })
}

module.exports = {
    verifyToken,verifyUser,verifyAdmin
}