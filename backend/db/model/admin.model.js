import { superAdmin } from "../schema/super.admin.js";

export async function signupAdmin(name, email, password, role) {
    let result
    try {
            const response = await superAdmin.create({
            name, email, password, role
        })
        result = {statusCode: 201, success: true}
    } catch (error) {
        console.log(error.errorResponse.code)
        if (error.errorResponse.code === 11000) {
            error.status = 409; 
        error.message = "Registration failed: Email already exists.";
    } else{
        error.message = "Internal server error"
        error.status = 500
    }
    result = {msg:error, success:false}
}

return result
}