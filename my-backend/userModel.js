import mongoose from "mongoose";

const userModel = mongoose.Schema({
  name: String,
  avatar: String,
  email: String,
  voted: [Number],
});

export default mongoose.model("users", userModel);
