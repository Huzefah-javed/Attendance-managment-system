import { Router } from "express";
import { creatingSession, getLatestSessionHistory, getSessionHistory, gettingStudentForAttendance, individualAttendanceData, markingStudentAttendance } from "../controller/admin.controller.js";

const adminRouter = Router();

adminRouter.post("/create-session", creatingSession)
adminRouter.get("/get-students/:sessionId", gettingStudentForAttendance)
adminRouter.get("/latest-sessions-history", getLatestSessionHistory)
adminRouter.post("/mark-attendance", markingStudentAttendance)
adminRouter.post("/individual-attendance-history", individualAttendanceData)
adminRouter.post("/sessions-history", getSessionHistory)

export default adminRouter;