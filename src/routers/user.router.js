import express from "express";

const userRouter = express.Router();

userRouter.use("/get-user", (req, res) => {
  console.log("server run");
  res.send("server");
});

export default userRouter;
