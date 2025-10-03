import { Router } from "express";
import { creatingSession } from "../controller/admin.controller.js";

const adminRouter = Router();

adminRouter.post("/create-session", creatingSession)

export default adminRouter;