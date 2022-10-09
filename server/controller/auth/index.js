const {User} = require('../../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const register = async(req,res,next)=>{
    try {
        const email = await User.findOne({email:req.body.email});
        if(email){
            return res.status(404).json({msg:"This email id is already there plz give the another email id"})
        }else{
            if(req.body.username){
                if(req.body.email){
                    if(req.body.password){
                        if(req.body.confirmPassword){
                            if(req.body.password.length >=4){
                                if(req.body.password === req.body.confirmPassword){
                                    const password = await bcrypt.hash(req.body.password,10);
                                    req.body.password =password;
                                    console.log(req.body)
                                    const user = await User(req.body);
                                    await user.save();
                                    return res.status(200).json({msg:"user created successfully"});
                                }else{
                                    return res.status(404).json({msg:"Confirm Password not match"})
                                }
                            }else{
                                return res.status(404).json({msg:"Password must be more then 6 character"})
                            }
                        }else{
                            return res.status(404).json({msg:"Enter your confirm password"})
                        }
                    }else{
                        return res.status(404).json({msg:"Enter your password"});
                    }
                }else{
                    return res.status(404).json({msg:"Enter your email id"})
                }   
            }else{
                return res.status(404).json({msg:"Enter your user name"})
            }
    }       
    } catch (error) {
        next(error);
        res.status(404).json(error.message);
    }
};
const userUserLogin = async(req,res,next)=>{
    try {
        if(req.body.email){
            if(req.body.password){
                const userData = await User.findOne({email:req.body.email});
                if(!userData) return res.status(404).json("User not Found");
                    const pass = await bcrypt.compare(req.body.password[0],userData.password);
                if(pass){
                    const token = jwt.sign({id:userData._id, isAdmin:userData.isAdmin}, process.env.SECRETE_KEY)
                    return res.cookie("access_token",token,{httpOnly:true}).status(200).json(userData);
                }else{ 
                    return res.status(404).json("Wrong Password");
                }
            }else{
                res.status(404).json("Enter your password");
            }
        }else{
            res.status(404).json("Enter your Email Id");
        }
        
    } catch (error) {
        // next(error);
        res.status(404).json(error)
    }
}

module.exports ={
    register,
    userUserLogin
}