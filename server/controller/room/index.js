const {Rooms,Hotel} = require('../../models');
const Room = require('../../models/rooms');

const createRoom = async(req,res)=>{
    try {
        const session = await Rooms.startSession();
        const roomCreate = new Rooms(req.body);
        const addHotel = await Hotel.findByIdAndUpdate(
            req.params.id,
            {$push:{rooms:roomCreate._id}},
            {new:true}
            ).session(session);
        const roomSave = await roomCreate.save({session:session});
        res.json({Room:roomSave,Hotel:addHotel});
    } catch (error) {
        res.json(error)
    }
}
const getRooms = async(req,res,next)=>{
    try {
        const roomData = await Rooms.find({}); 
        if(!roomData){
            res.json("we don't have any rooms",[roomData].length)
        }else{
            res.json(roomData)
        }
    } catch (error) {
        res.status(404).json(error)
    }
};
const getRoom = async(req,res,next)=>{
    try {
        const roomData = await Rooms.findById(req.body.id);
        res.json(roomData)
    } catch (error) {
        res.status(404).json(error)
    }
}

const updateRoom =async(req,res,next)=>{
    try {
            const update = await Rooms.findByIdAndUpdate(
                req.params.id,
                {$set:req.body},
                {new:true}
            );
            res.status(200).json(update)
    } catch (error) {
        res.status(404).json(error)
    }
}
const updateRoomAvailability =async(req,res,next)=>{
    try {
        await Rooms.updateOne(
            {"roomNumbers._id":req.params.id},
            {
                $push:{"roomNumbers.$.unavailableDate":req.body.dates}
            },
        )
        res.status(200).json({msg:"Room date has been updated"});
    } catch (error) {
        res.status(404).json({msg:error.message})
    }
}
const deleteRoom = async(req,res,next)=>{
    try {
    
        const roomId = await Rooms.findById(req.params.RoomId);
        if(!roomId) return res.status(404).json("Room id is wrong")
        const hotelId = await Hotel.findByIdAndUpdate(req.params.HotelId);
        if(!hotelId) return res.json("Hotel Id is wrong");
        await Rooms.findByIdAndDelete(req.params.RoomId);
        await Hotel.findByIdAndUpdate(
            req.params.HotelId,
            {
                $pull:{rooms:req.params.RoomId}
            }
        );
        res.status(200).json("Room has been deleted");
    } catch (error) {
        res.status(404).json(error)
    }
};

module.exports = {
    createRoom,
    getRoom,
    getRooms,
    deleteRoom,
    updateRoom,
    updateRoomAvailability
}