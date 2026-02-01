import { appointHOD, departmentRegistering, instituteConfirmation, instituteRegistering, signupDepartmentalAdmin, signupSuperAdmin, validatingDepartmentAndHodById } from "../db/model/admin.model.js"

export async function superAdminSignup(req, res, next) {
    const {name,email, password}  = req.body
    // ! check for validation here......
    if (name || email || password) {
       const response = await signupSuperAdmin(name, email, password, "super_admin")
       if (response.success) {
            res.json(response)
       }else{
           next(response.msg) 
       }
    }
}

export async function departmentalAdminLogin(req, res, next) {
    const { name, email, password, institutional_id }  = req.body
    // ! check for validation here......

      const validation = await instituteConfirmation(req.user, institutional_id)
      if(!validation.success){
        if(validation?.msg){return next(validation.msg)}
        else{return res.status(404).json({statusCode:404, msg:"Institute id not found or invalid institute id"})}
      }
   
       const response = await signupDepartmentalAdmin(name, email, password, "departmental_admin", institutional_id)
       if (response.success) {
            res.json(response)
       }else{
           next(response.msg) 
       }
    }


export async function registerInstitution(req, res, next) {
    const {institutionName}  = req.body
    // ! check for validation here......
      const response = await instituteRegistering(institutionName, req.user.id)
       if (response.success) {
            res.json(response)
       }else{
           next(response.msg) 
       }
    }


export async function registerDepartment(req, res, next) {
    const {department_name, institution_id}  = req.body
         // ! check for validation here......
       const validation = await instituteConfirmation(req.user, institution_id)
      if(!validation.success){
        if(validation?.msg){return next(validation.msg)}
        else{return res.status(404).json({statusCode:404, msg:"Institute id not found or invalid institute id"})}
      }
      const response = await departmentRegistering(department_name, institution_id)
       if (response.success){
            res.json(response)
       }else{
           next(response.msg) 
       }
    }


export async function appointHeadOfDepartment(req, res, next) {
    const { Hod_id, department_id, institution_id } = req.body
    //! Zod validation required here ....

    const validation = await instituteConfirmation(req.user, institution_id)
      if(!validation.success){
        if(validation?.msg){return next(validation.msg)}
        else{return res.status(404).json({statusCode:404, msg:"Institute id not found or invalid institute id"})}
      }
      
      const valid = await validatingDepartmentAndHodById(Hod_id, department_id, institution_id)
      if(!valid.success){
        if(valid?.msg){return next(valid.msg)}
        else{return res.status(404).json({statusCode:404, msg:"department or Hod id not found or invalid "})}
      }

     const response = await appointHOD(Hod_id, department_id)
      if (response.success){
            res.json(response)
       }else{
           next(response.msg) 
       }
}