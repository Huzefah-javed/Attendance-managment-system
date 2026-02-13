import { attendanceSessions } from "../schema/attendance.sessions.js";
import { classesSubjects } from "../schema/class.subjects.js";
import { students } from "../schema/student.js";
import { teacherSubjects } from "../schema/teacher.subjects.js";


export async function teacherSubjectRegistering(subject_name, teacher_id){
let result;
        try {
            await teacherSubjects.create(
                {subject_name, teacher_id}
            )
            result={success: true, statusCode: 201}
        } catch (error) {
            console.log(error)
            error.statusCode = 500
            error.msg = "Error: cannot saved this document or database connection"
            result={success: false, msg: error}
        }
        return result
}

export async function validateTeacherClass(class_id, teacher_id){
      let result;
    try {
        const response = await classesSubjects.aggregate([
                 {
                    $match:{$and:[
                        {class_id:Number(class_id)},
                        {teaches_by: Number(teacher_id)}
                    ]}
                }
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
        return result
}

export async function attendanceSession(class_id) {
    let result;
    try {
        await attendanceSessions.create(
            {class_id}
        )
        result={statusCode:201, success: true, msg:"Attendance session created successfully"}
    } catch (error) {
        console.log(error)
        error.statusCode = 500
        error.message = "Some thing went wrong while creating attendance session"
        result = {success: false, msg: error}
        return result
    }
}

export async function studentsForAttendance(classId, session_id){
    let result; 
    const class_id = Number(classId)
    const sessionId = Number(session_id)
   try {
     const response =  await attendanceSessions.findOne({
            class_id, sessionId
        })

        if (!response) {
            result = {statusCode:404, success:false , msg:"No attendance session found for this class"}
            return result;
        }
        
        const studentsData = await students.find({ class_id });
        result = {statusCode:200, success:true , studentsData}
        return result

   } catch (error) {
        console.log(error)
          error.statusCode = 500
           error.message = "Error happens while fetching students data for attendance"
          result = {success: false, msg: error}
            return result
   }
}