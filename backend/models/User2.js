import mongoose, { Schema } from "mongoose";

const UserSchema2 = new Schema({
  googleId: {
    type: String,
    required: true,
    unique: true
  },
  displayName: {
    type: String,
    required: true
  },
  email: {
    type: String
  },
  profilePicture: {
    type: String
  }
});

const User2 = mongoose.model("User2", UserSchema2);

export default User2;
