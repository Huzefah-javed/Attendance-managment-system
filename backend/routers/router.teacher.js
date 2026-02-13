import { Router } from "express";
import { creatingSession, gettingStudentForAttendance, registerSubjects } from "../controller/teacher.controller.js";
// import { creatingSession, getLatestSessionHistory, getSessionHistory, getSessionHistoryDetails, gettingStudentForAttendance, individualAttendanceData, markingStudentAttendance } from "../controller/admin.controller.js";

const teacherRouter = Router();

teacherRouter.post("/createSession", creatingSession)
teacherRouter.get("/students-for-attendance/:classId/:sessionId", gettingStudentForAttendance)
teacherRouter.get("/", (req, res)=> res.json("Hello from teacher"))
teacherRouter.post("/registerSubjects", registerSubjects)
// adminRouter.get("/latest-sessions-history", getLatestSessionHistory)
// adminRouter.post("/mark-attendance", markingStudentAttendance)
// adminRouter.post("/individual-attendance-history", individualAttendanceData)
// adminRouter.post("/sessions-history", getSessionHistory)
// adminRouter.post("/sessions-history/details", getSessionHistoryDetails)

export default teacherRouter;