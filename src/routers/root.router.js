import express from "express";
import userRouter from "./user.router.js";
import authRouter from "./\bauth.router.js";
import imageRouter from "./image.controller.js";

const rootRouter = express.Router();

rootRouter.use("/api", userRouter);
rootRouter.use("/api", authRouter);
rootRouter.use("/api", imageRouter);

export default rootRouter;
