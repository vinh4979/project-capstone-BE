import express from "express";
import { createBoard, deleteBoard, updateBoardName } from "../controllers/board.controller.js";

const boardRouter = express.Router();

boardRouter.post("/create-board", createBoard);
boardRouter.post("/update-board-name", updateBoardName);
boardRouter.delete("/delete-board", deleteBoard);

export default boardRouter;