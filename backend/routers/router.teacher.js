import { Router } from "express";
import { creatingSession, getAssignedClasses, getSessionHistory, getSingleClassData, gettingStudentForAttendance, latestSessionHistory, markingStudentAttendance, registerSubjects } from "../controller/teacher.controller.js";
// import { creatingSession, getLatestSessionHistory, getSessionHistory, getSessionHistoryDetails, gettingStudentForAttendance, individualAttendanceData, markingStudentAttendance } from "../controller/admin.controller.js";

const teacherRouter = Router();

teacherRouter.post("/createSession", creatingSession)
teacherRouter.get("/students-for-attendance/:classId/:sessionId", gettingStudentForAttendance)
teacherRouter.get("/", (req, res)=> res.json("Hello from teacher"))
teacherRouter.post("/registerSubjects", registerSubjects)
teacherRouter.get("/latest-sessions-history/:class_id/:subject_id", latestSessionHistory) 
teacherRouter.post("/mark-attendance", markingStudentAttendance)
teacherRouter.get("/getClasses", getAssignedClasses)
teacherRouter.get("/classData/:class_id/:subject_id", getSingleClassData)
// adminRouter.post("/individual-attendance-history", individualAttendanceData)
teacherRouter.post("/sessions-history", getSessionHistory)
// adminRouter.post("/sessions-history/details", getSessionHistoryDetails)

export default teacherRouter;