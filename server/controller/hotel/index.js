const Hotel = require('../../models/hotels/index.js');
const Room = require('../../models/rooms/index.js');

const getHotels = async(req,res,next)=>{
    const {min,max,...others} =req.query;
    try {
        const hotelContainer = await Hotel
        .find({...others,cheapestPrice:{$gte:min ||1 , $lte:max||999}})
        .limit(req.query.limit);
        if(hotelContainer == ""){
            res.status(404).json({msg:"we don't have any hotels"})
        }else{
            res.status(200).json(hotelContainer)
        }
    } catch (error) {
        res.status(404).json({msg:error})
    }
};

const countByCity = async(req,res,next)=>{
    const cities = req.query.cities.split(",");

    try {
        const list = await Promise.all(cities.map(city=>{
            return Hotel.countDocuments({city:city})
        }));
        res.json(list)
    } catch (error) {
        res.status(404).json(error)
    }
};

const countByType = async(req,res,next)=>{
    try{
        const hotelCount = await Hotel.countDocuments({type:"hotel"});
        const apartmentCount = await Hotel.countDocuments({type:"apartment"});
        const resortCount = await Hotel.countDocuments({type:"resort"});
        const villaCount = await Hotel.countDocuments({type:"villa"});
        const cabinCount = await Hotel.countDocuments({type:"cabin"});

        res.json([
            {type:"hotel",count:hotelCount},
            {type:"apartment",count:apartmentCount},
            {type:"resort",count:resortCount},
            {type:"villa",count:villaCount},
            {type:"cabin",count:cabinCount}
        ])
    } catch (error) {
        res.status(404).json(error)
    }
};

const getHotel = async(req,res,next)=>{
    try {
        const hotel = await Hotel.findById(req.params.id);
        res.status(200).json(hotel)
    } catch (error) {
        res.status(404).json({msg:error.message})
    }
}
const createHotel = async(req,res,next)=>{
    try {
        const add = new Hotel(req.body);
        const save = await add.save();
        res.status(200).json(save)
    } catch (error) {
        res.status(404).json({msg:error.message})
    }
}

const updateHotel =async(req,res,next)=>{
    try {
        const user_id = await Hotel.findById(req.params.id);
        if(user_id){
            const update = await Hotel.findByIdAndUpdate(
                user_id._id,
                {$set:req.body},
                {new:true}
            );
            res.status(200).json({msg:update})
        }else{
            res.status(404).json({msg:'User not found'})
        }
    } catch (error) {
        res.status(404).json({msg:error.message})
    }
}
const deleteHotel = async(req,res,next)=>{
    try {
        const deleteHotel = await Hotel.findByIdAndDelete(req.params.id);
        res.status(200).json("Suucessfully Deleleted Hotel")
    } catch (error) {
        res.status(404).json({msg:error.message})
    }
};

const getHotelRooms = async(req,res,next)=>{
    try {
        const hotel = await Hotel.findById(req.params.id);
        const list = await Promise.all(hotel.rooms.map(room=>Room.findById(room)));
        res.status(200).json(list);
    } catch (error) {
        res.status(404).json({msg:error.message})
    }
}

module.exports ={createHotel,getHotel,getHotels,updateHotel,deleteHotel,countByCity,countByType,getHotelRooms};