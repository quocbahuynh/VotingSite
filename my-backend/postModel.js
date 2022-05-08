import mongoose from "mongoose";

const postsModel = mongoose.Schema({
  id: Number,
  images: [String],
  voted: Number,
  title: String,
  videoEmbed: String,
  author: String,
  description: String,
});

export default mongoose.model("posts", postsModel);
