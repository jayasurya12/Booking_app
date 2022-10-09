const router = require('express').Router();
const { room } = require('../../../controller');
const { verifyAdmin } = require('../../../utils/jwt-verification');

router.get("/",room.getRooms);
router.get('/:id',room.getRoom);
router.post('/add/:id',verifyAdmin,room.createRoom);
router.put('/update/:id',verifyAdmin,room.updateRoom);
router.put("/availability/:id",room.updateRoomAvailability)
router.delete('/delete/RoomId/:RoomId/HotelId/:HotelId',verifyAdmin,room.deleteRoom);

module.exports = router;