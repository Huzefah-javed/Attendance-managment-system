import { Router } from "express";
import studentRouter from "./router.student.js";
import adminRouter from "./router.admin.js";
import { adminLogin, studentLogin, userInfoRouter } from "../controller/main.controller.js";
import { cookieVerification } from "../jwt/cookie.jwt.js";

 const mainRouter = Router()


mainRouter.post("/studentLogin", studentLogin)
mainRouter.post("/teacherLogin", adminLogin)
mainRouter.get("/auth/me", cookieVerification, userInfoRouter)
mainRouter.use("/student", cookieVerification , studentRouter)
mainRouter.use("/admin", cookieVerification , adminRouter)
export default mainRouter;