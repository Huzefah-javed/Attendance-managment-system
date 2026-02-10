import { Router } from "express";
import { assignTeacherToClass, createClass, registerStudent, registerTeacher, subjectsForClasses } from "../controller/hod.controller.js";

const departmentAdminRouter = Router()

departmentAdminRouter.get("/", (req, res)=> res.json("Hello from departmental admin"))
departmentAdminRouter.post("/classCreation",  createClass)
departmentAdminRouter.post("/registerStudent",  registerStudent)
departmentAdminRouter.post("/registerTeacher",  registerTeacher)
departmentAdminRouter.post("/registerClassSubject",  subjectsForClasses)
departmentAdminRouter.post("/assignTeacherToClass",  assignTeacherToClass)

export default departmentAdminRouter;