import { Schema, model } from "mongoose";

const UserSchema = new Schema({
  id: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  nickName: {
    type: String,
    required: true,
  },
});

const User = model("User", UserSchema);

export default User;
