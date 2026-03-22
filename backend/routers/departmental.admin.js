import { Router } from "express";
import { assignTeacherToClass, createClass, getClasses, getClassesDetail, registerStudent, registerTeacher, subjectsForClasses } from "../controller/hod.controller.js";
import { getAvailableTeacher } from "../controller/teacher.controller.js";

const departmentAdminRouter = Router()

departmentAdminRouter.get("/", (req, res)=> res.json("Hello from departmental admin"))
departmentAdminRouter.post("/classCreation",  createClass)
departmentAdminRouter.get("/getClasses",  getClasses)
departmentAdminRouter.post("/getClassesDetails",  getClassesDetail)
departmentAdminRouter.post("/registerStudent",  registerStudent)
departmentAdminRouter.post("/registerTeacher",  registerTeacher)
departmentAdminRouter.post("/registerClassSubject",  subjectsForClasses)
departmentAdminRouter.post("/assignTeacherToSubject",  assignTeacherToClass)
departmentAdminRouter.get("/availableTeacherForSubject/:subjectName",  getAvailableTeacher)

export default departmentAdminRouter;