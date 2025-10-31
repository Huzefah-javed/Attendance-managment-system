import { Router } from "express";
import { creatingSession, getSessionHistory, gettingStudentForAttendance, individualAttendanceData, markingStudentAttendance } from "../controller/admin.controller.js";

const adminRouter = Router();

adminRouter.post("/create-session", creatingSession)
adminRouter.get("/get-students/:sessionId", gettingStudentForAttendance)
adminRouter.get("/sessions-history", getSessionHistory)
adminRouter.post("/mark-attendance", markingStudentAttendance)
adminRouter.post("/individual-attendance-history", individualAttendanceData)

export default adminRouter;