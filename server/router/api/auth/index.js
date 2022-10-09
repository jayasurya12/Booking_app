const router = require('express').Router();
const {auth} = require('../../../controller');

router.get("/auth",(req,res)=>{
    res.json("auth router")
});

router.post('/register',auth.register);
router.post('/login',auth.userUserLogin)
module.exports = router;