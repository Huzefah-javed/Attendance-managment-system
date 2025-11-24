import { Router } from "express";
import { gettingStudents } from "../db/queries.student.js";
import { checkingAttendance, markingAttendance } from "../controller/student.controller.js";

const studentRouter = Router()

studentRouter.post("/make-attendance" , markingAttendance)
studentRouter.get("/check-attendance" , checkingAttendance)

export default studentRouter;