const router = require('express').Router();
const {hotel} = require('../../../controller')
const {verifyAdmin} = require('../../../utils/jwt-verification');


router.get("/",hotel.getHotels);
router.get('/Id/:id',hotel.getHotel);
router.post('/add',verifyAdmin,hotel.createHotel);
router.put('/update/:id',verifyAdmin,hotel.updateHotel);
router.delete('/delete/:id',verifyAdmin,hotel.deleteHotel);

router.get("/countByCity",hotel.countByCity);
router.get("/countByType",hotel.countByType);
router.get('/room/:id',hotel.getHotelRooms); 

module.exports = router;