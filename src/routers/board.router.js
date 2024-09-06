import express from "express";
import { createBoard, deleteBoard, updateBoardName } from "../controllers/board.controller.js";
import { midelwareToken } from "../configs/jwt.js";

const boardRouter = express.Router();

boardRouter.post("/create-board",midelwareToken, createBoard);
boardRouter.post("/update-board-name",midelwareToken, updateBoardName);
boardRouter.delete("/delete-board",midelwareToken, deleteBoard);

export default boardRouter;