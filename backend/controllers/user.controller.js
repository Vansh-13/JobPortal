import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import userModel from "../models/user.models.js";
import profileModel from "../models/userprofile.models.js";
import addressModel from "../models/useraddress.models.js"; 
import { generateOtp, sendOtp } from "../utils/otp.utils.js";
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
        }).json({
            message: "Logout successful.",
            success: true,
        });
    } catch (error) {
        console.log("Error during logout: ", error);
        return res.status(500).json({
            message: "Internal server error.",
            success: false,
        });
    }
};

export const updateProfile = async (req, res) => {
    try {
        const { bio, skills, company, profilePhoto } = req.body;
        const userId = req.user.userId;

        const profileData = {
            bio,
            company,
            profilePhoto,
skills: (skills || '').split(",").map(skill => skill.trim())

        };

        if (req.file) {
            profileData.resume = req.file.filename;
            profileData.resumeOriginalName = req.file.originalname;
        }

        const existingProfile = await profileModel.findOne({ userID: userId });

        if (existingProfile) {
            await profileModel.updateOne({ userID: userId }, profileData);
        } else {
            profileData.userID = userId;
            await profileModel.create(profileData);
        }

        return res.status(200).json({
            message: "Profile updated successfully.",
            success: true,
            profile: profileData
        });
    } catch (err) {
        console.error("Update profile error:", err);
        return res.status(500).json({
            message: "Internal server error.",
            success: false
        });
    }
};

export const updateAddress = async (req, res) => {
    try {
        const {
            addressLine1,
            addressLine2,
            city,
            state,
            postalCode,
            country
        } = req.body;

        if (!addressLine1 || !city || !state || !postalCode || !country) {
            return res.status(400).json({
                message: "Required address fields are missing.",
                success: false,
            });
        }

        const userId = req.user.userId;

        let existingAddress = await addressModel.findOne({ userID: userId });

        if (existingAddress) {
            existingAddress.addressLine1 = addressLine1;
            existingAddress.addressLine2 = addressLine2;
            existingAddress.city = city;
            existingAddress.state = state;
            existingAddress.postalCode = postalCode;
            existingAddress.country = country;

            await existingAddress.save();

            return res.status(200).json({
                message: "Address updated successfully.",
                success: true,
                address: existingAddress
            });
        } else {
            const newAddress = await addressModel.create({
                userID: userId,
                addressLine1,
                addressLine2,
                city,
                state,
                postalCode,
                country
            });

            return res.status(201).json({
                message: "Address created successfully.",
                success: true,
                address: newAddress
            });
        }

    } catch (error) {
        console.error("Address update error:", error);
        return res.status(500).json({
            message: "Internal server error.",
            success: false,
        });
    }
};

export const getCurrentUser = async (req, res) => {
  try {
    const userId = req.user.userId;

    const user = await userModel.findById(userId).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found.', success: false });
    }

    const profile = await profileModel.findOne({ userID: userId });
    const address = await addressModel.findOne({ userID: userId });

    return res.status(200).json({
      success: true,
      user: {
        ...user.toObject(),
        profile: profile || {},
        address: address || {},
      },
    });
  } catch (error) {
    console.error("getCurrentUser error:", error);
    return res.status(500).json({
      message: 'Internal server error.',
      success: false,
    });
  }
};


export const sendOtpLogin = async (req, res) => {
    try {
        const { email } = req.body;

        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        const otp = generateOtp();
        const otpExpiry = new Date(Date.now() + 5 * 60 * 1000); // 5 min

        user.otp = otp;
        user.otpExpiry = otpExpiry;
        await user.save();

        await sendOtp(email, otp);

        res.status(200).json({
            success: true,
            message: "OTP sent to your email"
        });
    } catch (err) {
        console.error("Error in sending OTP:", err);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

export const verifyOtpLogin = async (req, res) => {
    try {
        const { email, otp } = req.body;

        const user = await userModel.findOne({ email });

        if (!user || user.otp !== otp || new Date() > user.otpExpiry) {
            return res.status(400).json({ success: false, message: "Invalid or expired OTP" });
        }

        user.otp = null;
        user.otpExpiry = null;
        await user.save();

        const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
            expiresIn: "1d"
        });

        return res
            .status(200)
            .cookie("token", token, {
                httpOnly: true,
                maxAge: 24 * 60 * 60 * 1000
            })
            .json({
                success: true,
                message: "OTP verified successfully.",
                token,
                user: {
                    id: user._id,
                    email: user.email,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    role: user.role
                }
            });

    } catch (err) {
        console.error("Error in verifying OTP:", err);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
};