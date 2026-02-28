import jwt from "jsonwebtoken"
import { assignJWTCookie } from "../jwt/cookie.jwt.js";
import { getSuperAdminWithSession, getTeacherWithSession } from "../db/model/login.sessions.js";

async function roleFinder(id, role){
    let data;
        if(role === "super_admin") data = await getSuperAdminWithSession({id, role})
            // if(role === "department_admin") data = await getDepartmentAdminWithSession({id, role})
                if(role === "teacher") data = await getTeacherWithSession({id, role})
                    // if(role === "student") data = await getStudentWithSession({id, role})
                        return data;
    }

export async function cookieVerification(req, res, next){
        try {
            const jwtCookie = req.cookies.security_token;
        const sessionalCookie = req.cookies.sessional_id;

        if (jwtCookie && sessionalCookie) {
            try {
                const token = jwt.verify(jwtCookie, process.env.JWT_SECRET)
                req.user = token;
                console.log(req.user)
                return next()
            } catch (error) {
                error.status = 401
                next(error)
                return 
            }
        }else if (!jwtCookie && sessionalCookie) {
            try {
                const token = jwt.verify(sessionalCookie, process.env.JWT_SECRET)
                const response = await roleFinder(token.id, token.role)  
                    if (response.success) {
                        console.log("rrrr ",response)
                        const { id, name, email, role } = response.data
                        assignJWTCookie({ id, name, email, role }, res);   
                        req.user = { id, name, email, role };
                        return next()
                    }else{
                        let error= {status:500 , msg:"internal server error"}
                       return  next(error)
                    }  
            } catch (error) {
                error.status = 401
                next(error)
            }
            return  next()
        } else {
            return res.status(401).json({ msg: "Authentication required" });
        }
        } catch (error) {
            console.log(error)
         return   res.json({msg: "internal server error"})    
        }

}