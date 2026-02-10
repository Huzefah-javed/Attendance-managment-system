import { teacherSubjectRegistering } from "../db/model/teacher.model.js"


export async function registerSubjects(req, res, next) {
        const {subject_name, teacher_id} = req.body
    //! ZOd validation here ....
        if(teacher_id !== req.user.id){
            return res.json({statusCode:401, msg:"teacher id not found or invalid teacher id"})
        }

       const response = await teacherSubjectRegistering(subject_name, teacher_id)
       if (response.success){
            res.json(response)
       }else{
           next(response.msg) 
       }
    }