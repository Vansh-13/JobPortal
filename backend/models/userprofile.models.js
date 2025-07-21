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
    type: [String] // simplified
  },
  resume: { 
    type: String
  },
  resumeOriginalName: {
    type: String
  },
  company: {
    type: String //  Changed from ObjectId to String
  },
  profilePhoto: {
    type: String,
    default: ""
  }
}, {
  timestamps: true
});
userProfileSchema.index({ userID: 1 });
const UserProfile = mongoose.model("UserProfile", userProfileSchema);
export default UserProfile;
