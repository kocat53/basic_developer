import "dotenv/config";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import User from "../models/User.js";
import { successResponse, errorResponse } from "../utils/response.js";

// 토큰생성용 키 설정
const SECRET_KEY = process.env.SECRET_KEY;
const REFRESH_SECRET_KEY = process.env.REFRESH_SECRET_KEY;

const LOCK_TIME = 30 * 60 * 1000; // 30분

// 회원가입
const signUp = async (req, res) => {
  try {
    const { id, password, phone, nickName } = req.body;
    const checkId = await User.findOne({ id });

    // 아이디 가 있을경우
    if (checkId) return errorResponse(res, 409, "이미 존재하는 아이디 입니다.");

    //비밀번호 해시화
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ id, password: hashedPassword, phone, nickName });
    await newUser.save(); // 회원가입 처리

    // 메시지 반환
    return successResponse(res, "회원가입이 완료되었습니다.");
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
const login = async (req, res) => {
  try {
    const { id, password } = req.body;
    const user = await User.findOne({ id });

    // 등록된아이디가 없을경우
    if (!user) {
      return errorResponse(
        res,
        404,
        "존재하지 않는 아이디입니다.",
        "USER_NOT_FOUND"
      );
    }

    // 아이디가 있고, 비밀번호가 맞는지 체크
    const userMatch = await bcrypt.compare(password, user.password);

    // 비밀번호가 틀릴경우 :10회 카운트 시작
    if (!userMatch) {
      user.loginAttempts += 1;

      // 만약 시도가 10번일이상일 경우 잠긴다.
      if (user.loginAttempts >= 10) {
        user.lockTimeZone = Date.now() + LOCK_TIME; // 30분
      }

      await user.save();
      return errorResponse(
        res,
        401,
        [],
        "비밀번호가 틀렸습니다.",
        "INVALID_PASSWORD"
      );
    }

    // 유저가 맞을경우 10번 카운트 초기화
    user.loginAttempts = 0;
    user.lockTimeZone = undefined;
    await user.save();

    const accessToken = jwt.sign(
      { id: user.id, nickName: user.nickName },
      SECRET_KEY,
      {
        expiresIn: "3h",
      }
    );
    const refreshToken = jwt.sign(
      { id: user.id, nickName: user.nickName },
      REFRESH_SECRET_KEY,
      {
        expiresIn: "7d",
      }
    );

    return successResponse(res, "로그인 성공", {
      accessToken,
      refreshToken,
    });
  } catch (error) {
    return errorResponse(
      res,
      500,
      "로그인 중 문제가 발생했습니다.",
      [],
      "LOGIN_ERROR",
      error
    );
  }
};

export { signUp, login };
