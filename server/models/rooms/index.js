const mongoose = require('mongoose');

const RoomSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    maxPeople:{
        type:Number,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    roomNumbers:[{
        number:Number,
        unavailableDate:{type:[Date]}
    }]
},
    {timestamps:true}
)
const Room = mongoose.model('rooms',RoomSchema);

module.exports= Room;