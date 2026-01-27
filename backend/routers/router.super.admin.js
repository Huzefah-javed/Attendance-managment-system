import { Router } from "express";

const superAdminRouter = Router()

superAdminRouter.get("/", (req, res)=> res.json("Hello from super admin side"))

export default superAdminRouter;