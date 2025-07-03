import mongoose  from "mongoose";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({
    path: path.join(__dirname, "../.env")
});

console.log(process.env.MONGO_URI);

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