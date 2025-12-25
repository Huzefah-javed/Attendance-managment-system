import jwt from "jsonwebtoken";
import { getSessionalData } from "../db/login.session.js";
import { getAdminDataById, getStudentDataById } from "../db/queries.main.js";

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
            
            const {ID, ROLE, USER_ID} = await getSessionalData(sessionalCookie);
                console.log("userID is: ",USER_ID)
                if (!ID && !ROLE && !USER_ID) {
                    return res.status(401).json({ msg: "Session expired. Please log in again." });
                }
                if (ROLE == "ADMIN") {
                    const { ID, NAME, SUBJECT, EMAIL, ROLE }= await getAdminDataById(USER_ID)
                    console.log("reaction is: ",{ ID, NAME, SUBJECT, EMAIL, ROLE })
                    assignJWTCookie({ ID, NAME, SUBJECT, EMAIL, ROLE }, res)
                    req.user = { ID, NAME, SUBJECT, EMAIL, ROLE }               
                }else{
                    const {ID, NAME, STUDENT_ROLLNO, EMAIL, ROLE}= await getStudentDataById(USER_ID)
                    assignJWTCookie({ID, NAME, STUDENT_ROLLNO, EMAIL, ROLE}, res)
                    req.user = {ID, NAME, STUDENT_ROLLNO, EMAIL, ROLE}              
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