import { assigningTeacher, classesData, classesDetails, creatingClass, departmentClassValidation, departmentConfirmation, departmentTeacherValidation, getDepIdByHodId, registeringStudent, registeringTeacher, subjectAssigningToClass } from "../db/model/hod.model.js"


export async function createClass(req, res, next) {
    const { class_name } = req.body

    const result = await getDepIdByHodId(req.user.id)
          if(!result.success){
            if(result?.msg){return next(validation.msg)}
            else{return res.status(404).json({statusCode:404, msg:"Department id not found or invalid department id"})}
          }

          const response = await creatingClass(class_name, result.id)
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

export async function getClassesDetail(req, res, next) {
    const {class_id} = req.body
    //! Zod validation required here .....
   const response = await classesDetails(class_id)
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
    console.log({ subject_name, class_id })
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
    const { teacher_id, class_id, subject_id } = req.body
    console.log({ teacher_id, class_id, subject_id })
     //! Zod validation .............
     const validation1 = await departmentClassValidation(Number(class_id), req.user.id)
          if(!validation1.success){
            if(validation1?.msg){return next(validation1.msg)}
            else{return res.status(404).json({statusCode:404, msg:"class id not found or invalid class id"})}
          }

     const validation2 = await departmentTeacherValidation(Number(teacher_id), req.user.id)
          if(!validation2.success){
            if(validation2?.msg){return next(validation2.msg)}
            else{return res.status(404).json({statusCode:404, msg:"teacher id not found or invalid teacher id"})}
          }

  const response = await assigningTeacher(Number(teacher_id), Number(class_id), Number(subject_id))
  if (response.success){
            res.json(response)
       }else{
           next(response.msg) 
       }
}

