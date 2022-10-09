const router = require('express').Router();
const {user} = require('../../../controller')
const {verifyToken,verifyUser, verifyAdmin} = require('../../../utils/jwt-verification');


router.get('/auth',verifyToken,async(req,res)=>{
    res.json("hell user logged in")
})
router.get('/checkUser/:id',verifyUser,(req,res)=>{
    res.json("hello user,you are logged in you can delete user");
});
router.get('/admin',(req,res)=>{
    res.json("")
})
router.get("/",verifyAdmin,user.getUsers);
router.get('/:id',verifyToken,user.getUser);
router.put('/update/:id',verifyUser,user.updateUser);
router.delete('/delete/:id',verifyUser,user.deleteUser);

module.exports = router;