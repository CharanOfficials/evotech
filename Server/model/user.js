import mongoose from "mongoose";
const userSchema = mongoose.Schema(
  {
    first_name: {
      type: String,
      required: true,
      maxlength: 25,
    },
    last_name: {
      type: String,
      maxlength: 25,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);
const User = mongoose.model("user", userSchema);
export default User;
