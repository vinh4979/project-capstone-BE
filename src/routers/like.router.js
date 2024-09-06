import express from "express"
import { createLike, deleteLike } from "../controllers/like.controller.js"
import { midelwareToken } from "../configs/jwt.js"

const likeRouter = express.Router()

likeRouter.post("/like",midelwareToken, createLike)
likeRouter.delete("/unlike",midelwareToken, deleteLike)

export default likeRouter