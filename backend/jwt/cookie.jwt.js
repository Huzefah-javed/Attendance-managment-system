import jwt from "jsonwebtoken";
import { getSessionalData } from "../db/login.session.js";

export  function assignJWTCookie(data, res){
    const token = jwt.sign(data, process.env.JWT_SECRET)

    res.cookie("security_token", token, {
        httpOnly: true,           
        maxAge: 24 * 60 * 60 * 1000  
    })
}

export async function cookieVerification(req, res, next){
        try {
            const jwtCookie = req.cookies.security_token;
        const sessionalCookie = req.cookies.sessional_id;

        if (jwtCookie && sessionalCookie) {
            let token;
            try {
                token = jwt.verify(jwtCookie, process.env.JWT_SECRET)
                req.user = token;
                console.log(req.user)
               return next()
            } catch (error) {
                console.log(error)
                return res.status(401).json({ msg: "Authentication failed" });
            }
        }else if (!jwtCookie && sessionalCookie) {

            const userData = await getSessionalData(sessionalCookie);

            if (!userData) {
                return res.status(401).json({ msg: "Session expired. Please log in again." });
                }

                console.log(userData)
                const {
                    STUDENT_ID,
                    STUDENT_NAME,
                    STUDENT_ROLLNO
                } = userData
                 assignJWTCookie({
                    ID: STUDENT_ID,
                    STUDENT_NAME,
                    STUDENT_ROLLNO
                }, res)
                req.user = {
                    ID: STUDENT_ID,
                    STUDENT_NAME,
                    STUDENT_ROLLNO
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