import { Router } from "express";
import studentRouter from "./router.student.js";
// import adminRouter from "./router.admin.js";
// import { adminLogin, studentLogin, superAdminLogin, userInfoRouter } from "../controller/main.controller.js";
// import { cookieVerification } from "../jwt/cookie.jwt.js";
import superAdminRouter from "./router.super.admin.js";
import teacherRouter from "./router.teacher.js";
import departmentAdminRouter from "./departmental.admin.js";
import { departmentAdminLogin, studentLogin, superAdminLogin, teacherLogin } from "../controller/main.controller.js";
import { cookieVerification } from "../middleware/cookie.verification.js";
import { superAdminSignup } from "../controller/admin.controller.js";

 const mainRouter = Router()


// mainRouter.post("/studentLogin", studentLogin)
// mainRouter.post("/teacherLogin", adminLogin)
mainRouter.post("/superAdminLogin", superAdminLogin)
mainRouter.post("/superAdminSignup", superAdminSignup)
mainRouter.post("/departmentalAdminLogin", departmentAdminLogin)
mainRouter.post("/teacherLogin", teacherLogin)
mainRouter.post("/studentLogin", studentLogin)
// mainRouter.get("/auth/me", cookieVerification, userInfoRouter)

mainRouter.use("/student" , studentRouter)
mainRouter.use("/teacher" , teacherRouter)
mainRouter.use("/departmentAdmin", cookieVerification, departmentAdminRouter)
mainRouter.use("/superAdmin", cookieVerification,superAdminRouter)

export default mainRouter;