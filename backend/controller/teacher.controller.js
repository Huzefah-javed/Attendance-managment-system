import { attendanceSession, classData, getClasses, latestSessionsData, markAttendance, studentsForAttendance, teacherSubjectRegistering, validateSessionId, validateTeacherClass } from "../db/model/teacher.model.js"


export async function registerSubjects(req, res, next) {
        const {subject_name} = req.body
    //! ZOd validation here ....
        const response = await teacherSubjectRegistering(subject_name, teacher_id)
        if (response.success){
            res.json(response)
       }else{
           next(response.msg) 
        }
}

export async function creatingSession(req, res, next) {
    const {class_id, subject_id} = req.body
    //! ZOd validation here ....
       const validation = await validateTeacherClass(class_id, req.user.id)
        if(!validation.success){
        if(validation?.msg){return next(validation.msg)}
        else{return res.status(404).json({statusCode:404, msg:"Class id not found or invalid class id"})}
      }
      // please write validation for this subject id weather it is belong to teacher or not.........
      
      const response = await attendanceSession(class_id, subject_id)
      if (response.success){
          res.json(response)
       }else{
           next(response.msg) 
       }
}

export async function gettingStudentForAttendance(req, res, next) {
     const { classId, sessionId } = req.params;
    //! ZOd validation here ....
       const validation = await validateTeacherClass(classId, req.user.id)
        if(!validation.success){
        if(validation?.msg){return next(validation.msg)}
        else{return res.status(404).json({statusCode:404, msg:"Class id not found or invalid class id"})}
      }
       const response = await studentsForAttendance(classId, sessionId)
       if (response.success){
            res.json(response)
       }else{
           next(response.msg) 
       }
}

export async function markingStudentAttendance(req, res, next) {
     const { sessionId, studIdArr } = req.body;
    //! ZOd validation here ....
       const validation = await validateSessionId(sessionId, req.user.id)
        if(!validation.success){
        if(validation?.msg){return next(validation.msg)}
        else{return res.status(404).json({statusCode:404, msg:"session not found or already marked"})}
      }
       const response = await markAttendance(sessionId, studIdArr)
       if (response.success){
            res.json(response)
       }else{
           next(response.msg) 
       }
}

export async function getAssignedClasses(req, res, next) {

       const response = await getClasses(req.user.id)
       if (response.success){
            res.json(response)
       }else{
           next(response.msg) 
        }
    }
    
export async function getSingleClassData(req, res, next) {
        const { class_id, subject_id } = req.params
        const validation = await validateTeacherClass(Number(class_id), req.user.id)
        if(!validation.success){
        if(validation?.msg){return next(validation.msg)}
        else{return res.status(404).json({statusCode:404, msg:"Class id not found or invalid class id"})}
      }
      
       const response = await classData(Number(class_id), Number(subject_id),req.user.id)
       if (response.success){
            res.json(response)
       }else{
           next(response.msg) 
       }
}

export async function latestSessionHistory(req, res, next) {
    const { class_id, subject_id } = req.params
    const validation = await validateTeacherClass(Number(class_id), req.user.id)
    if(!validation.success){
        if(validation?.msg){return next(validation.msg)}
        else{return res.status(404).json({statusCode:404, msg:"Class id not found or invalid class id"})}
      }

       const response = await latestSessionsData(Number(class_id), Number(subject_id),req.user.id)
       if (response.success){
            res.json(response)
       }else{
           next(response.msg) 
       }
}


