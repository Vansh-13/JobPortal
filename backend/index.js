import express from "express";
import session from "express-session";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import passport from "./utils/passport.js";
import connectDb from "./utils/db.utils.js";
import path from "path";
import { fileURLToPath } from "url";


// Routes
import userRoutes from "./routes/user.routes.js";
import authRoutes from "./routes/auth.routes.js"; // new route
import companyRoutes from "./routes/company.routes.js";
import jobRoutes from "./routes/job.routes.js";
import applicationRoutes from "./routes/applications.routes.js";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
})); 

app.use(session({
  secret:  process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
app.use('/assets', express.static(path.join(__dirname, 'public/assets')));

// app.use('/assets', express.static('public/assets'));

// Routes
app.use("/api/user", userRoutes);
app.use("/api/company", companyRoutes);
app.use("/api/job", jobRoutes);
app.use("/api/application", applicationRoutes);
app.use("/auth", authRoutes); 


// Start Server
connectDb().then(() => {
  app.listen(process.env.PORT || 3000, (err) => {
    if (err) {
      console.log("Error in starting the server", err);
    } else {
      console.log(`Server running at http://localhost:${process.env.PORT}`);
    }
  });
}).catch((err) => {
  console.log("Error in connecting to the database", err);
  process.exit(1);
});
