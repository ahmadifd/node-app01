import mongoose from "mongoose";
import timestamp from "mongoose-timestamp";

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  password: { type: String, required: true },
  isadmin: { type: Boolean, default: false },
});
userSchema.plugin(timestamp);

const User = mongoose.model("User", userSchema);
export default User;
