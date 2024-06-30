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
  // 비밀번호 10회 틀릴경우 처리용
  loginAttempts: {
    type: Number,
    default: 0,
  },
  lockTimeZone: {
    type: Date,
  },
});

// 몽구스 기능중 하나. [가상속성] 설정: 사용이유 - 굳이 DB에 저장히지 않기위해
UserSchema.virtual("isLocked").get(() => {
  // 현재시간보다 lockTimeZone이 나중인경우 잠겼다는것.
  return this.lockTimeZone && this.lockTimeZone > Date.now();
});

const User = model("User", UserSchema);

export default User;
