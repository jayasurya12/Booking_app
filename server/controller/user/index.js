const User = require('../../models/users');

const getUsers = async(req,res,next)=>{
    try {
        const allUser = await User.find({}); 
        if(!allUser){
            res.json("we don't have any users",[allUser].length)
        }else{
            res.json(allUser)
        }
    } catch (error) {
        res.status(404).json(error)
    }
};
const getUser = async(req,res,next)=>{
    try {
        const userData = await User.findById(req.body.id);
        res.json(userData)
    } catch (error) {
        res.status(404).json(error)
    }
}
const updateUser =async(req,res,next)=>{
    try {
        const user_id = await User.findById(req.params.id);
        console.log(user_id);
        if(user_id){
            const update = await User.findByIdAndUpdate(user_id._id,{$set:req.body},{new:true});
            res.json(update)
        }else{
            res.json('User not found')
        }
    } catch (error) {
        res.status(404).json(error)
    }
}
const deleteUser = async(req,res,next)=>{
    try {
        const deleteUser = await User.findByIdAndDelete(req.params.id);
        res.statusCode(200).json("Suucessfully Deleleted User")
    } catch (error) {
        res.status(404).json(error)
    }
};
module.exports ={getUser,getUsers,updateUser,deleteUser}