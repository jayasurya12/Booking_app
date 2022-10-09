const {createHotel,getHotel,getHotels,updateHotel,
    deleteHotel,countByCity,countByType,getHotelRooms} = require('./hotel/index.js');
const {register,userUserLogin} = require('./auth');
const {getUser,getUsers,updateUser,deleteUser} = require('./user');
const {getRoom,getRooms,createRoom,updateRoom,deleteRoom,updateRoomAvailability} = require('./room')

const hotel ={
    createHotel,
    getHotel,
    getHotels,
    updateHotel,
    deleteHotel,
    countByCity,
    countByType,
    getHotelRooms
}
const auth = {
    register,
    userUserLogin
}
const user ={
    getUser,
    getUsers,
    deleteUser,
    updateUser
}
const room ={
    getRoom,
    getRooms,
    createRoom,
    updateRoom,
    deleteRoom,
    updateRoomAvailability
}

module.exports= {hotel,auth,user,room};
