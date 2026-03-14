import { assigningTeacher, classesData, creatingClass, departmentClassValidation, departmentConfirmation, registeringStudent, registeringTeacher, subjectAssigningToClass } from "../db/model/hod.model.js"


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
export async function getClasses(req, res, next) {

   const response = await classesData(req.user.id)
           if (response.success){
            res.json(response)
       }else{
           next(response.msg) 
       }
}

export async function registerStudent(req, res, next) {
    const { name, email, password, roll_number, class_id } =req.body
    //! Zod validation required here .....
    const validation = await departmentClassValidation(class_id, req.user.id)
    if(!validation.success){
      if(validation?.msg){return next(validation.msg)}
      else{return res.status(404).json({statusCode:404, msg:"class id not found or invalid class id"})}
    }

    const response = await registeringStudent(name, email, password, roll_number,class_id)
     if (response.success){
            res.json(response)
       }else{
           next(response.msg) 
       }
}

export async function registerTeacher(req, res, next) {
    const { name, email, password, department_id } = req.body
    //! Zod validation required here .....
    const validation = await departmentConfirmation(department_id, req.user.id)
    if(!validation.success){
      if(validation?.msg){return next(validation.msg)}
      else{return res.status(404).json({statusCode:404, msg:"department id not found or invalid department id"})}
    }

    const response = await registeringTeacher(name, email, password, department_id)
     if (response.success){
            res.json(response)
       }else{
           next(response.msg) 
       }
}

export async function subjectsForClasses(req, res, next) {
    const { subject_name, class_id } = req.body
    //! Zod validation .............
     const validation = await departmentClassValidation(class_id, req.user.id)
    if(!validation.success){
      if(validation?.msg){return next(validation.msg)}
      else{return res.status(404).json({statusCode:404, msg:"class id not found or invalid class id"})}
    }

  const response = await subjectAssigningToClass(subject_name, class_id)
  if (response.success){
            res.json(response)
       }else{
           next(response.msg) 
       }
}

export async function teacherForClass(req, res, next) {
    const { name, email, password, department_id } = req.body
     //! Zod validation .............
     const validation = await departmentConfirmation(department_id, req.user.id)
          if(!validation.success){
            if(validation?.msg){return next(validation.msg)}
            else{return res.status(404).json({statusCode:404, msg:"Department id not found or invalid department id"})}
          }

  const response = await registeringTeacher(name, email, password,department_id)
  if (response.success){
            res.json(response)
       }else{
           next(response.msg) 
       }
}

export async function assignTeacherToClass(req, res, next) {
    const { teacher_id, class_id, department_id } = req.body
     //! Zod validation .............
     const validation = await departmentConfirmation(department_id, req.user.id)
          if(!validation.success){
            if(validation?.msg){return next(validation.msg)}
            else{return res.status(404).json({statusCode:404, msg:"Department id not found or invalid department id"})}
          }

  const response = await assigningTeacher(teacher_id, class_id)
  if (response.success){
            res.json(response)
       }else{
           next(response.msg) 
       }
}

