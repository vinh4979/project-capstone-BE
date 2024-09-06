import express from "express";
import { deleteUser, getUser, updateUser } from "../controllers/user.controller.js";

const userRouter = express.Router();

userRouter.use("/get-user", getUser);
userRouter.post("/update-user", updateUser);
userRouter.delete("/delete-user", deleteUser);

export default userRouter;
