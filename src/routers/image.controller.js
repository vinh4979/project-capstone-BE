import express from "express";
import { getImg } from "../controllers/image.controller.js";

const imageRouter = express.Router();

imageRouter.get("/images", getImg);

export default imageRouter;
