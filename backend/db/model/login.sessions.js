import { departmentAdmin } from "../schema/department.admin.js";
import { loginSession } from "../schema/login.sessions.js";
import { superAdmin } from "../schema/super.admin.js";
import { teacher } from "../schema/teacher.js";

export async function loginStorageSession(id, role) {
    let result;
        try {
           await loginSession.create({user_id:id, role})
           result = {success: true}
            return result   
        } catch (error) {
            console.log(error)
            result = {success: false}
        }
}

export async function getSuperAdminWithSession({id, role}) {
    let result;
        try {
        const data =   await superAdmin.findOne({id:Number(id), role})
        if(data === null) throw new Error("This user is not found")
           result = {status: 200,success: true, data}
            return result   
        } catch (error) {
            console.log(error)
            result = {status:401, success: false, msg:error.message}
        }
}

export async function getTeacherWithSession({id, role}) {
    let result;
        try {
        const data = await teacher.findOne({id:Number(id), role})
        if(data === null) throw new Error("This user is not found")
           result = {status: 200,success: true, data}
            return result   
        } catch (error) {
            console.log(error)
            result = {status:401, success: false, msg:error.message}
        }
}

export async function getDepartmentAdminWithSession({id, role}) {
    let result;
        try {
        const data = await departmentAdmin.findOne({id:Number(id), role})
        if(data === null) throw new Error("This user is not found")
           result = {status: 200,success: true, data}
    } catch (error) {
        console.log(error)
        result = {status:401, success: false, msg:error.message}
    }
    return result   
}

