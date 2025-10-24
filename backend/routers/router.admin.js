import { Router } from "express";
import { creatingSession, gettingStudentForAttendance, individualAttendanceData } from "../controller/admin.controller.js";

const adminRouter = Router();

adminRouter.post("/create-session", creatingSession)
adminRouter.post("/mark-attendance", gettingStudentForAttendance)
adminRouter.post("/individual-attendance-history", individualAttendanceData)

export default adminRouter;