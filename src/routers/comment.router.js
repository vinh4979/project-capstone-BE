import express from "express"
import { createComment, deleteComment } from "../controllers/comment.controller.js"

const commentRouter = express.Router()  

commentRouter.post("/comment", createComment)
commentRouter.delete("/delete-comment", deleteComment)
export default commentRouter