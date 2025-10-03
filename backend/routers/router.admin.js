import { Router } from "express";
import { creatingSession, individualAttendanceData } from "../controller/admin.controller.js";

const adminRouter = Router();

adminRouter.post("/create-session", creatingSession)
adminRouter.post("/individual-attendance-history", individualAttendanceData)

export default adminRouter;