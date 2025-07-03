import express from "express";
import cookies from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDb from "./utils/db.utils.js";
import userRoutes from "./routes/user.routes.js";
import companyRoutes from "./routes/company.routes.js";
import isAuth from "./middleware/isAuth.middleware.js";
dotenv.config();
const app=express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookies());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}))

app.use("/api/user",userRoutes);
app.use("/api/company",companyRoutes);
 connectDb().then(()=>{
    app.listen( process.env.PORT|| 3000,(err)=>{
  if(err){
    console.log("Error in starting the server", err);
  }else{
    console.log(`Server is running on port ${process.env.PORT || 3000}`);
  }

})
 })
.catch((err)=>{
    console.log("Error in connecting to the database", err);
    process.exit(0);
});
