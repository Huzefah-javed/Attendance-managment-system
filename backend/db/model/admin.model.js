import { departmentAdmin } from "../schema/department.admin.js";
import { department } from "../schema/department.js";
import { institution } from "../schema/institution.js";
import { superAdmin } from "../schema/super.admin.js";

export async function signupSuperAdmin(name, email, password, role) {
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

export async function signupDepartmentalAdmin(name, email, password, role, institutional_id) {
    let result
    try {
            const response = await departmentAdmin.create({
            name, email, password, role, institutional_id
        })
        result = {statusCode: 201, success: true}
    } catch (error) {
        console.log(error)
        if (error?.errorResponse?.code === 11000) {
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

export async function instituteRegistering(name, superAdminId) {
    let result
    try {
            const response = await institution.create({
            institution_name: name ,  owned_by:superAdminId
        })
        result = {statusCode: 201, success: true}
    } catch (error) {
        console.log(error)
        if (error.errorResponse.code === 11000) {
            error.status = 409; 
        error.message = "Registration failed: Institute already exists with this name.";
    } else{
        error.message = "Internal server error"
        error.status = 500
    }
    result = {msg:error, success:false}
}

return result
}

export async function instituteConfirmation(adminDetail, institutionId) {
    let result;
    try {
            const response = await institution.aggregate([
                     {
                         $match :{institutionId}
                    },  
                    {
                        $lookup:{
                            from: "super_admins",
                            localField: "owned_by",
                            foreignField: "id",
                            as: "adminData"
                        }
                    } ,
                    {
                        $unwind: "$adminData"
                    },
                    {
                        $match :{"adminData.email": adminDetail.email}
                   },  
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
            error.message = "Some thing went wrong while authenticating institute"
            result = {success: false, msg: error}
            return result
        }
}

export async function departmentRegistering(department_name, institution_id) {
    let result
    try {
            const response = await department.create({
            department_name, institution_id, hod_id:0
        })
        result = {statusCode: 201, success: true}
    } catch (error) {
        console.log(error)
        error.message = "Internal server error"
        error.status = 500
    
    result = {msg:error, success:false}
}

return result
}

                        
    export async function validatingDepartmentAndHodById(Hod_id, department_id, institution_id) {
         let result;
    try {
            const response = await department.aggregate([
                     {
                         $match :{$and: [
                            {institution_id},
                            {department_id}
                         ]}
                    },  
                    {
                        $lookup:{
                            from: "department_admins",
                            localField: "institution_id",
                            foreignField: "institution_id",
                            as: "Data"
                        }
                    } ,
                    {
                        $unwind: "$Data"
                    },
                    {
                        $match: {"Data.id": Hod_id}
                    },
                     
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
            error.message = "Some thing went wrong while authenticating institute"
            result = {success: false, msg: error}
            return result
        }
}

export async function appointHOD(hod_id, department_id) {
     let result
             try {
                 const response = await department.updateOne(
                    {department_id},
                    {hod_id}
                 )
                 result = {statusCode: 201, success: true }
             } catch (error) {
               console.log(error)
                error.message = "Internal server error"
                     error.status = 500                    
                   result = {msg:error, success:false}
                  }
               
                return result              
       }
