import mongoose from "mongoose";

const userProfileSchema = mongoose.Schema({
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    bio: {
        type: String
    },
    skills: {
        type: [{
            type: String
        }]
    },
    resume: { 
        type: String
 
    },
    resumeOriginalName: {
        type: String
    },
    company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company'
    },
    profilePhoto: {
        type: String,
        default: ""
    }
}, {
    timestamps: true
})
const UserProfile = mongoose.model("UserProfile", userProfileSchema);
export default UserProfile;