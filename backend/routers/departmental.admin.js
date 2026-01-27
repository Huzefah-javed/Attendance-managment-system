import { Router } from "express";

const departmentAdminRouter = Router()

departmentAdminRouter.get("/", (req, res)=> res.json("Hello from departmental admin"))

export default departmentAdminRouter;