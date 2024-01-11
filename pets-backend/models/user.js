import mongoose from "mongoose";

//get the userSchema
const userSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  googleId:{ type: String, required: false},
  userId: { type: String},
});

export default mongoose.model("UserModel", userSchema);