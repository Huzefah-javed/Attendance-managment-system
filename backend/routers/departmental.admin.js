import { Router } from "express";
import { createClass } from "../controller/hod.controller.js";

const departmentAdminRouter = Router()

departmentAdminRouter.get("/", (req, res)=> res.json("Hello from departmental admin"))
departmentAdminRouter.post("/classCreation",  createClass)

export default departmentAdminRouter;