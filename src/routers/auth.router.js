import express from "express";
import { login, signUp } from "../controllers/auth.controller.js";

const authRouter = express.Router();

// login
authRouter.post("/login", login);
authRouter.post("/register", signUp);

export default authRouter;
