// import { loginStorageSession } from "../db/login.session.js";
// import { loginVerificationAsStudent, loginVerificationAsTeacher } from "../db/queries.main.js";
import { assignJWTCookie } from "../jwt/cookie.jwt.js";
import { assignSessionCookie } from "../jwt/cookie.session.js";

import { loginStorageSession } from "../db/model/login.sessions.js";
import { loginVerificationAsDepartmentalAdmin, loginVerificationAsSuperAdmin, loginVerificationAsTeacher } from "../db/model/main.model.js";

async function login({ id, name, email, role, status }, res) {
            await loginStorageSession(id, role);
            assignJWTCookie({ id, name, email, role }, res);
            assignSessionCookie({id, role}, res);
            res.json({status, msg: "Login successfully done"})
}
// export async function studentLogin(req, res){
//     const {rollNo, password} = req.body;
//     try {
//     const isPresent = await loginVerificationAsStudent({rollNo, password})
//     if(isPresent.length == 1){
            
//             const {ID, NAME, STUDENT_ROLLNO, EMAIL, ROLE} = isPresent[0];
//             await loginStorageSession(ID, ROLE);
//             assignJWTCookie({ID, NAME, STUDENT_ROLLNO, EMAIL, ROLE}, res);
//             assignSessionCookie(ID, res);
//             res.json({msg: {name: NAME, role: ROLE}})
//         }else{
//             res.json({msg : "student not found"})
//         }
//     } catch (error) {
//         console.log(error)   
//         }
//  }


//  export async function adminLogin(req, res){
//     const {email, password} = req.body;
//     console.log({email, password})
//     try {
//     const isPresent = await loginVerificationAsTeacher({email,password })
//     console.log(isPresent)
//     if(isPresent){
            
//             const { ID,NAME, SUBJECT, EMAIL, ROLE } = isPresent[0];
//             await loginStorageSession(ID, ROLE);
//             assignJWTCookie({ID, NAME, SUBJECT, EMAIL, ROLE}, res);
//             assignSessionCookie(ID, res);
//             res.json({msg: {name: NAME, subject: SUBJECT, role: ROLE}})
//         }else{
//             res.json({msg : "teacher not found"})
//         }
//     } catch (error) {
//         console.log(error)   
//         }
//  }

 export async function userInfoRouter(req, res){
    try {
        const name = req.user.name || ""
        const role = req.user.role || ""

        res.json({name, role})
    } catch (error) {
        console.log(error)   
        }
 }

export async function superAdminLogin(req, res, next) {
      const {email, password} = req.body;
      //! we have to validate here when using ZOD
    console.log({email, password})
 
    const response = await loginVerificationAsSuperAdmin({email,password})

    if(response.success){    
            const { id, name, email, role } = response.data;
            login({ id, name, email, role, status:response.status }, res)
        }else{  
            next({status:500, msg:res.msg})   
        }
}

export async function departmentAdminLogin(req, res, next) {
    const {email, password} = req.body;
      // we have to validate here when using ZOD
    console.log({email, password})
    const response = await loginVerificationAsDepartmentalAdmin({email,password})
    if(response.success){    
            const { id, name, email, role } = response.data;
             login({ id, name, email, role, status:response.status }, res)
        }else{  
            next({status:500, msg:res.msg})   
        }
}

export async function teacherLogin(req, res, next) {
    const {email, password} = req.body;
      // we have to validate here when using ZOD
    console.log({email, password})
    const response = await loginVerificationAsTeacher({email,password})
    if(response.success){    
            const { id, name, email, role } = response.data;
             login({ id, name, email, role, status:response.status }, res)
        }else{  
            next({status:400, msg:response.msg})   
        }
}

export async function studentLogin(req, res, next) {
    const {email, password} = req.body;
      // we have to validate here when using ZOD
    console.log({email, password})
    const response = await loginVerificationAsTeacher({email,password})
    console.log("response: ", response)
    if(response.success){    
            const { id, name, email, role } = response.data;
             login({ id, name, email, role }, res)
        }else{  
            next({status:500, msg:res.msg})   
        }
}