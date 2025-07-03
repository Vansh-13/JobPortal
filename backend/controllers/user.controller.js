import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import userModel from "../models/user.models.js";
import profileModel from "../models/userprofile.models.js";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({
    path: path.join(__dirname, "../.env")
});

export const register = async (req, res) => {
    try {
        const { firstName, lastName, email, password, phone, role } = req.body;

        if (!firstName || !lastName || !email || !password || !phone) {
            return res.status(400).json({
                message: "All fields are required.",
                success: false,
            });
        }

        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                message: "User already exists with this email.",
                success: false,
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await userModel.create({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            phone,
            role,
        });

        return res.status(201).json({
            message: "User registered successfully.",
            success: true,
        });

    } catch (error) {
        console.error("Error in user registration:", error);
        return res.status(500).json({
            message: "Internal server error.",
            success: false,
        });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password, role } = req.body;

        if (!email || !password || !role) {
            return res.status(400).json({
                message: "All fields are required.",
                success: false,
            });
        }

        const user = await userModel.findOne({ email, role });

        if (!user) {
            return res.status(404).json({
                message: "User not found.",
                success: false,
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({
                message: "Invalid credentials.",
                success: false,
            });
        }

        if (role !== user.role) {
            return res.status(403).json({
                message: "Access doesn't exist with current role.",
                success: false,
            });
        }

        const tokenPayload = { userId: user._id };
        const tokenString = jwt.sign(tokenPayload, process.env.SECRET_KEY, {
            expiresIn: "1d"
        });

        return res
            .status(200)
            .cookie("token", tokenString, {
                httpOnly: true, //means js se acces nhi le sakte hai eg document.cookie and prevent also xss attack
                secure: false,  //cookes https or http dono me chalega ... true me onyl https me chalega

                sameSite: "Lax",
                maxAge: 24 * 60 * 60 * 1000,
            })
            .json({
                message: "Login successful.",
                success: true,
                user: {
                    id: user._id,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    role: user.role,
                },
            });

    } catch (error) {
        console.error("Error during login:", error);
        return res.status(500).json({
            message: "Internal server error.",
            success: false,
        });
    }
};


export const logout = async (req, res) => {
    try {
        return res.status(200).cookie("token", "", {
            maxAge: 0,
        })
            .json({
                message: "Logout successful.",
                success: true,
            });


    } catch (error) {
        console.log("Error during logout: ", error);
        return res.status(500).json({
            message: "Internal server error.",
            success: false,
        })


    }

}

export const updateProfile = async (req, res) => {
  try {
    const { bio, skills, resume, resumeOriginalName, company, profilePhoto } = req.body;

    if (!bio || !skills || !resume || !resumeOriginalName || !company || !profilePhoto) {
      return res.status(400).json({
        message: "All fields are required.",
        success: false,
      });
    }

    const skillArray = skills.split(",").map(skill => skill.trim());
    const userId = req.user.userId;

    const existingProfile = await profileModel.findOne({ userID: userId });

    if (existingProfile) {
      existingProfile.bio=bio;
      existingProfile.skills=skillArray;
      existingProfile.resume=resume;
      existingProfile.resumeOriginalName=resumeOriginalName;
      existingProfile.company=company;
      existingProfile.profilePhoto=profilePhoto;

      await existingProfile.save();

      return res.status(200).json({
        message: "Profile updated successfully.",
        success: true,
        profile: existingProfile,
      });

    } else {
      const newProfile = await profileModel.create({
        userID: userId,
        bio,
        skills: skillArray,
        resume,
        resumeOriginalName,
        company,
        profilePhoto
      });

      return res.status(201).json({
        message: "Profile created successfully.",
        success: true,
        profile: newProfile,
      });
    }

  } catch (err) {
    console.error("Update profile error:", err);

    return res.status(500).json({
      message: "Internal server error.",
      success: false,
    });
  }
};

//resume part is pending because the cloudinary
 