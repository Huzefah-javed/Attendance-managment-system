import { departmentAdmin } from "../schema/department.admin.js";
import { superAdmin } from "../schema/super.admin.js";
import { teacher } from "../schema/teacher.js";

export async function loginVerificationAsSuperAdmin({email,password}) {
    let result;
    try {
        const data = await superAdmin.findOne({email,password}) 
        if(!data) throw new Error("No user found on this email or password");
        result = {success: true, status:200,data}
    } catch (error) {
        result = {success: false, status:400,msg: error.message}
    }
    return result   

}

export async function loginVerificationAsDepartmentalAdmin({email,password}) {
    let result;
    try {
        const data = await departmentAdmin.findOne({email,password}) 
        if(!data) throw new Error("No user found on this email or password");
        result = {success: true, status:200,data}
    } catch (error) {
        result = {success: false, status:400,msg: error.message}
    }
    return result   
}

export async function loginVerificationAsTeacher({email,password}) {
    let result;
    try {
        const data = await teacher.findOne({email,password}) 
        console.log("data: ",data)
        if(data === null) throw new Error("No user found on this email or password");
        result = {success: true, status:200 ,data}
    } catch (error) {
        result = {success: false,status:400, msg: error.message}
    }
    return result   
}