import express from "express";
import orgRouter from "./org.route.js";

const routerV1 = express.Router();

routerV1.use("/organization", orgRouter);

export default routerV1;
