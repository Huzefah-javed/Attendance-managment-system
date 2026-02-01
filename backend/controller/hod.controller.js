import { creatingClass, departmentConfirmation } from "../db/model/hod.model.js"


export async function createClass(req, res, next) {
    const { class_name, department_id } = req.body

    const validation = await departmentConfirmation(department_id, req.user.id)
          if(!validation.success){
            if(validation?.msg){return next(validation.msg)}
            else{return res.status(404).json({statusCode:404, msg:"Department id not found or invalid department id"})}
          }

          const response = await creatingClass(class_name, department_id)
           if (response.success){
            res.json(response)
       }else{
           next(response.msg) 
       }
}