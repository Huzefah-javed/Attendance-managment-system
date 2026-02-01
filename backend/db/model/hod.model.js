import { classes } from "../schema/classes.js";
import { department } from "../schema/department.js";

      export async function departmentConfirmation(department_id, hod_id) {
        let result;
    try {
            const response = await department.aggregate([
                    {$match: {$and:[
                        {department_id},
                        {hod_id}
                    ]}}
            ])
            if(response && response.length !== 0){
                result = {success: true}
                return result;
            }else{
                result = {success: false}
                return result
            }
        } catch (error) {
            error.statusCode = 500
            error.message = "Some thing went wrong while authenticating department"
            result = {success: false, msg: error}
            return result
        }
}

export async function creatingClass(class_name, department_id) {
    let result;
    try {
        await classes.create({
            class_name, department_id
        })
        result={success: true, statusCode: 201}
    } catch (error) {
        error.statusCode = 500
        error.msg = "Error: cannot saved this document or database connection"
        result={success: false, msg: error}
    }
    return result
}