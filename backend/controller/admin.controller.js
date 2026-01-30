import { signupAdmin } from "../db/model/admin.model.js"

export async function superAdminSignup(req, res, next) {
    const {name,email, password}  = req.body
    // ! check for validation here......
    if (name || email || password) {
       const response = await signupAdmin(name, email, password, "super_admin")
       if (response.success) {
            res.json(response)
       }else{
           next(response.msg) 
       }
    }
}