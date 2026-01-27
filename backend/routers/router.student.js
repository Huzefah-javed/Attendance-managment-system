import { Router } from "express";
// import { attendanceHistory, checkingAttendance, markingAttendance } from "../controller/student.controller.js";

const studentRouter = Router()

// studentRouter.post("/make-attendance" , markingAttendance)
// studentRouter.get("/check-attendance" , checkingAttendance)
studentRouter.get("/" , (req, res)=>res.json("Hello from student side"))
// studentRouter.post("/attendance-history" , attendanceHistory)

export default studentRouter;