import express from "express";
import { login, refreshToken, register} from "../controllers/auth.controller.js";

const authRouter = express.Router();

authRouter.post("/login", login);
authRouter.post("/register", register);
authRouter.post("/refresh-token", refreshToken);


export default authRouter;
