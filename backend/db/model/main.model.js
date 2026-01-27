import { superAdmin } from "../schema/super.admin.js";

export async function loginVerificationAsSuperAdmin({email,password}) {
    let result;
    try {
        const data = await superAdmin.findOne({email,password}) 
        if(Object.keys(data).length === 0) throw new Error("No user found on this email or password");
        result = {success: true, data}
        return result   
    } catch (error) {
        result = {success: false, msg: error.message}
    }

}