const mongoose = require('mongoose')

const dbConnect = async()=>{
    try {
        const connect = await mongoose.connect(process.env.MONGO_URL,{
            useUnifiedTopology:true,
            UseNewUrlParser:true
        })
        console.log(`Mongodb connected ${connect.connection.host}`);
    } catch (error) {
       console.log(error); 
    }
}
module.exports = dbConnect;