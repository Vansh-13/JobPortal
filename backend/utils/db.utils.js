import mongoose  from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const connectDb= async ()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to the database successfully");

    }catch(err){
        console.log("Error in connecting to the database", err);
        process.exit(0);
        
    }

}
export default connectDb;