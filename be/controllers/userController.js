const User = require("../models/User");

exports.signUp = async (req, res, next) => {
  try {
    const { id, password, phone, nickName } = req.body;
    const checkId = await User.findOne({ id });
    console.log("있는겨?", checkId);

    res.status(201).json({ message: "회원가입 성공" });
  } catch (error) {
    res.status(500).json({ message: "으앙 ㅠㅜ 뭔가 문제가 있당께" });
  }
};

exports.login = (req, res, next) => {
  const { id, password } = req.body;
  res.status(200).json({ message: "로그인 성공" });
};
