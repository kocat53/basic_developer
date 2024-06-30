import { body } from "express-validator";

export const signUpValidation = [
  body("id")
    .isLength({ min: 5 })
    .withMessage("아이디는 최소 5자라 이상이어야 합니다.")
    .matches(/^[A-Za-z0-9]+$/)
    .withMessage("아이디는 영어 알파벳과 숫자만 포함해야 합니다."),
  body("password")
    .isLength({ min: 6 })
    .withMessage("비밀번호는 최소 6자리 이상이어야 합니다.")
    .matches(/[!@#$%^&*(),.?":{}|<>]/)
    .withMessage("비밀번호는 최소 하나의 특수문자를 포함해야 합니다."),
  body("phone").isMobilePhone().withMessage("유효한 전화번호를 입력해주세요."),
  body("nickName").not().isEmpty().withMessage("닉네임을 입력해주세요."),
];
