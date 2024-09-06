import express from "express"
import { createLike, deleteLike } from "../controllers/like.controller.js"

const likeRouter = express.Router()

likeRouter.post("/like", createLike)
likeRouter.delete("/unlike", deleteLike)

export default likeRouter