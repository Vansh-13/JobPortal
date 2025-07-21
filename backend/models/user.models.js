import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true,
        match: [/^\d{10}$/, 'Phone number must be exactly 10 digits']
    },
    otp: {
    type: String,
    default: null
},
otpExpiry: {
    type: Date,
    default: null
},
    role: {
        type: String,
        enum: ["user", "recruiter"],
        default: "user"
    }
}, {
    timestamps: true
});

const User = mongoose.model("User", userSchema);
export default User;
