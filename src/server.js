import express from "express";
import rootRouter from "./routers/root.router.js";
import cors from "cors";
const app = express();

const port = 8080;

app.use(cors());
app.use(express.json());
app.use(rootRouter);
app.listen(port, () => console.log("run successfully"));
