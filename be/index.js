require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const port = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGODB_URI;

const userRoute = require("./router/userRoute");

const app = express();
app.use(express.json());
app.use((_, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE, OPTIONS"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use("/api/v1/user", userRoute);

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("✅ 연결이드래요");
  })
  .catch(err => {
    console.error("❌ 뭔가 문제가 있드래요:", err);
  });

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
