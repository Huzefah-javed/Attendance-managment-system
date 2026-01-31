import { Router } from "express";
import { appointHeadOfDepartment, departmentalAdminLogin, registerDepartment, registerInstitution } from "../controller/admin.controller.js";

const superAdminRouter = Router()

superAdminRouter.get("/", (req, res)=> res.json("Hello from super admin side"))
superAdminRouter.post("/departmentalAdminSignup", departmentalAdminLogin)
superAdminRouter.post("/registerDepartment", registerDepartment)
superAdminRouter.post("/registerInstitution", registerInstitution)
superAdminRouter.post("/appointingHod", appointHeadOfDepartment)

export default superAdminRouter;