import express from "express";
import { getUserDetail, getUserDetailByID, updateUserDetail } from "../controllers/user.controller.js";
import multer from "multer";
import { midelwareToken } from "../configs/jwt.js";

const userRouter = express.Router();
const upload = multer();

userRouter.get("/get-user-detail", midelwareToken, getUserDetail);
userRouter.get("/get-user-detail-by-id/:user_id", midelwareToken, getUserDetailByID);
userRouter.post("/update-user-detail", upload.single("image"), midelwareToken, updateUserDetail);

export default userRouter;