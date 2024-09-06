import express from "express";
import { midelwareToken } from "../configs/jwt.js";
import { savePinDefault, savePinToBoard, savePinToNewBoard } from "../controllers/save.controller.js";
import { unsavePin } from "../controllers/save.controller.js";
import { updateSaveToBoard } from "../controllers/save.controller.js";
import { getSaveByUser } from "../controllers/save.controller.js";

const saveRouter = express.Router();

saveRouter.get("/get-save-by-user", getSaveByUser);
saveRouter.post("/save-pin", savePinDefault);
saveRouter.post("/save-pin-to-board", savePinToBoard);
saveRouter.post("/save-pin-to-new-board", savePinToNewBoard);
saveRouter.post("/unsave-pin", unsavePin);
saveRouter.post("/update-save-to-board", updateSaveToBoard);
// saveRouter.post("/unsave-pin", midelwareToken, unsavePin);

export default saveRouter;