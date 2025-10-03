import { Router } from "express";
import studentRouter from "./router.student.js";
import adminRouter from "./router.admin.js";
import { adminLogin, studentLogin } from "../controller/main.controller.js";
import { cookieVerification } from "../jwt/cookie.jwt.js";

 const mainRouter = Router()


mainRouter.post("/studentLogin", studentLogin)
mainRouter.post("/teacherLogin", adminLogin)
mainRouter.use("/student", cookieVerification , studentRouter)
mainRouter.use("/admin", cookieVerification , adminRouter)
export default mainRouter;