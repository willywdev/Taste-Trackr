import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema({
  nickname: { type: String, required: true },
  rating: { type: Array, default: undefined },
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
