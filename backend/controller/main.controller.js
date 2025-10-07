import { loginStorageSession } from "../db/login.session.js";
import { loginVerificationAsStudent, loginVerificationAsTeacher } from "../db/queries.main.js";
import { assignJWTCookie } from "../jwt/cookie.jwt.js";
import { assignSessionCookie } from "../jwt/cookie.session.js";


export async function studentLogin(req, res){
    const {rollNo, password} = req.body;
    console.log(rollNo, password)
    try {
    const isPresent = await loginVerificationAsStudent({rollNo, password})
    console.log(isPresent)
    if(isPresent.length == 1){
            
            const {ID, STUDENT_NAME, STUDENT_ROLLNO, ROLE} = isPresent[0];
            await loginStorageSession(ID, ROLE);
            assignJWTCookie({ID, STUDENT_NAME, STUDENT_ROLLNO}, res);
            assignSessionCookie(ID, res);
            res.json({msg:"login successful"})
        }else{
            res.json({msg : "student not found"})
        }
    } catch (error) {
        console.log(error)   
        }
 }


 export async function adminLogin(req, res){
    const {email, password} = req.body;
    console.log({email, password})
    try {
    const isPresent = await loginVerificationAsTeacher({email,password })
    console.log(isPresent)
    if(isPresent){
            
            const { ID,NAME, SUBJECT, EMAIL, ROLE } = isPresent[0];
            await loginStorageSession(ID, ROLE);
            assignJWTCookie({ID, NAME, SUBJECT, EMAIL, ROLE}, res);
            assignSessionCookie(ID, res);
            res.json({msg:"login successful"})
        }else{
            res.json({msg : "teacher not found"})
        }
    } catch (error) {
        console.log(error)   
        }
 }