import { Router } from "express";
import { signUp, login, matchedInfo } from "../controllers/userController.js";
import { signUpValidation } from "../middleware/validate.js";

const router = Router();

router.post("/signup", signUp);
router.post("/login", login);
router.post("/check", signUpValidation, matchedInfo); // 아이디,닉네임,폰번호 중복여부 체크

export default router;
