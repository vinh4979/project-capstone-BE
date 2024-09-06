import express from "express";
import { createPin, deletePin, getAllPin, getPinBySearch, getPinByUser, getPinDetail, updatePin } from "../controllers/pin.controller.js";
import multer from 'multer';
import { midelwareToken } from "../configs/jwt.js";

const upload = multer();

const pinRouter = express.Router();

pinRouter.post("/create-pin",upload.single('image'),midelwareToken,createPin);
pinRouter.post("/update-pin",upload.single('image'),midelwareToken, updatePin);
pinRouter.delete("/delete-pin", midelwareToken,deletePin);
pinRouter.get("/get-all-pin", getAllPin);
pinRouter.get("/get-pin-by-user", midelwareToken, getPinByUser);
pinRouter.get("/get-pin-detail", getPinDetail);
pinRouter.get("/get-pin-by-search", getPinBySearch);




export default pinRouter;