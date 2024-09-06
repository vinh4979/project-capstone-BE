import express from "express";
import userRouter from "./user.router.js";
import authRouter from "./\bauth.router.js";
import pinRouter from "./pin.router.js";
import saveRouter from "./save.router.js";
import boardRouter from "./board.router.js";
import commentRouter from "./comment.router.js";
import likeRouter from "./like.router.js";


const rootRouter = express.Router();

rootRouter.use("/api", userRouter);
rootRouter.use("/api", authRouter);
rootRouter.use("/api", pinRouter);
rootRouter.use("/api", saveRouter);
rootRouter.use("/api", boardRouter);
rootRouter.use("/api", commentRouter);
rootRouter.use("/api", likeRouter);

export default rootRouter;
