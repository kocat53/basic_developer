import "dotenv/config";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import User from "../models/User.js";
import { successResponse, errorResponse } from "../utils/response.js";
const SECRET_KEY = process.env.SECRET_KEY;

// 회원가입
const signUp = async (req, res, next) => {
  try {
    const { id, password, phone, nickName } = req.body;
    const checkId = await User.findOne({ id });

    // 아이디 가 있을경우
    if (checkId) return errorResponse(res, 409, "이미 존재하는 아이디 입니다.");

    //비밀번호 해시화
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ id, password: hashedPassword, phone, nickName });
    await newUser.save(); // 회원가입완!

    return successResponse(res, "회원가입이 완료되었습니다.");
    res.status(201).json({ message: "회원가입 성공" });
  } catch (error) {
    return errorResponse(
      res,
      500,
      "회원가입 중 문제가 발생했습니다.",
      "SIGNUP_ERROR",
      error
    );
  }
};

// 로그인
const login = (req, res, next) => {
  const { id, password } = req.body;
  res.status(200).json({ message: "로그인 성공" });
};

export { signUp, login };
