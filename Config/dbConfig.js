const mongoose = require("mongoose");

const connectDb = async ()=>{
    let connectionString = process.env.CONNECTION_STRING;
   try {
    const dpconnect = await mongoose.connect(connectionString)
    if(dpconnect){
        console.log("Database connected successfully");
    }else{
        console.log("Error connected successfully");
    }
   } catch (error) {
    console.log("Error occured while trying to connect to database", error);
   }
}
module.exports = connectDb