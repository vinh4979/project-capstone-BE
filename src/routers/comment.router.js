import express from "express"
import { createComment, deleteComment } from "../controllers/comment.controller.js"
import { midelwareToken } from "../configs/jwt.js"

const commentRouter = express.Router()  

commentRouter.post("/comment",midelwareToken, createComment)
commentRouter.delete("/delete-comment",midelwareToken, deleteComment)
export default commentRouter