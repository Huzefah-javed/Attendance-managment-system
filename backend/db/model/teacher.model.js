import { response } from "express";
import { attendanceData } from "../schema/attendance.data.js";
import { attendanceSessions } from "../schema/attendance.sessions.js";
import { classesSubjects } from "../schema/class.subjects.js";
import { students } from "../schema/student.js";
import { teacherSubjects } from "../schema/teacher.subjects.js";
import { classes } from "../schema/classes.js";


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
    }

export async function validateTeacherSession(sessionId, teacherId){
      let result;
    try {
        const response = await attendanceSessions.aggregate([
                 {
                    $match:{$and:[
                        {teacher_id:Number(teacherId)},
                        {sessionId: Number(sessionId)}
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
            error.message = "Some thing went wrong while getting attendance session"
            result = {success: false, msg: error}
            return result
        }
}

export async function attendanceSession(class_id, subject_id,teacher_id, session_end_at) {
    let result;
    try {
        await attendanceSessions.create(
            {class_id, subject_id, is_marked:false, teacher_id, session_end_at}
        )
        result={statusCode:201, success: true, msg:"Attendance session created successfully"}
    } catch (error) {
        console.log(error)
        error.statusCode = 500
        error.message = "Some thing went wrong while creating attendance session"
        result = {success: false, msg: error}
    }
    return result
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
        
        const students_data = await students.find({ class_id }, {id:1, name:1, roll_number:1, _id:0});
        result = {
                     statusCode:200,
                      success:true , 
                      session_id: response.sessionId,
                      msg: students_data
                    }
        return result

   } catch (error) {
        console.log(error)
          error.statusCode = 500
           error.message = "Error happens while fetching students data for attendance"
          result = {success: false, msg: error}
            return result
   }
}

export async function validateSessionId(session_id, teacher_id){
          let result;
        try {
            const response = await attendanceSessions.aggregate([
                     {
                        $match:{$and:[
                            {sessionId:Number(session_id)},
                            {teacher_id: Number(teacher_id)},
                            {is_marked:false}
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
                console.log(error)
                 error.statusCode = 500
                error.message = "Some thing went wrong while session validation"
                result = {success: false, msg: error}
                return result
            }
    }

export async function markAttendance(session_id, presentStudArr=[], totalStuds) {
        let result;
        try {
            if (presentStudArr.length != 0) {   
                const attendance = presentStudArr.map((data)=>{
                    return {
                       studentId: data,
                        session_id,
                        status: "present"
                    }
                })
                await attendanceData.insertMany(attendance);
            }
            await attendanceSessions.updateOne(
                {sessionId: session_id},
                {
                    is_marked:true,
                    total_present_students: presentStudArr.length,
                    total_students:totalStuds
                }
            )
            result={statusCode:201, success: true, msg:"Attendance marked successfully"}
        } catch (error) {
            console.log(error)
            error.statusCode = 500
            error.message = "Some thing went wrong while marking attendance"
            result = {success: false, msg: error}
        }
        return result
    }

export async function getClasses(teacherId) {
        let result;
        try {
         const response =   await classesSubjects.aggregate([
                {
                    $match:{teaches_by:teacherId}
                },
                {
                    $lookup:{
                        from:"classes",
                        foreignField:"class_id",
                        localField:"class_id",
                        as: "assignedClasses"
                    }
                },
                {
                    $unwind:"$assignedClasses"
                },
                {
                    $project:{
                        _id:0,
                        subject_name:1,
                        subject_id:1,
                        class_name: "$assignedClasses.class_name",
                        class_id: "$assignedClasses.class_id"
                    }
                }
            ])
            if(response && response.length !== 0){
                    result = {success: true, msg:response}
                    return result;
                }else{
                    result = {success: false}
                    return result
                }
        } catch (error) {
            console.log(error)
            error.statusCode = 500
            error.message = "Some thing went wrong while getting assigned class data"
            result = {success: false, msg: error}
            return result
        }
    }

export async function classData(classId,subject_id, teacherId) {
        let result;
        try {
         const response =  await classes.aggregate([
                {
                    $match:{
                        class_id:classId
                    }
                },
                {
                    $lookup:{
                        from:"classes_subjects",
                        foreignField:"class_id",
                        localField:"class_id",
                        as: "assignedClasses",
                        pipeline:[
                            {
                                $match:{$and:[{teaches_by: teacherId}, {subject_id}]}
                            }
                        ]
                    }
                },
                {
                    $unwind:"$assignedClasses"
                },
                {
                    $lookup:{
                        from:"students",
                        foreignField:"class_id",
                        localField:"class_id",
                        as: "students",
                    }
                },
                {
                    $project:{
                        _id: 0,
                        class_name:1,
                        class_id:1,
                        subject_name: "$assignedClasses.subject_name",
                        subject_id: "$assignedClasses.subject_id",
                        totalStudentCount: { 
                                $size: { $ifNull: ["$students", []] } 
                         },
                        students: {
                                $map: {
                                    input: "$students",
                                    as: "s",
                                    in: {
                                   name: "$$s.name",
                                   roll_number: "$$s.roll_number"
                                }
                            }
                        }
                    }
                }

            ])
            if(response && response.length !== 0){
                    result = {success: true, msg:response[0]}
                    return result;
                }else{
                    result = {success: false}
                    return result
                }
        } catch (error) {
            console.log(error)
            error.statusCode = 500
            error.message = "Some thing went wrong while getting assigned class data"
            result = {success: false, msg: error}
            return result
        }
    }

export async function latestSessionsData(classId, subject_id, teacherId, skip) {
        let result;
        try {
            const response =  await  attendanceSessions.find({class_id:classId, teacher_id:teacherId, subject_id}, {_id:0, session_date:1, sessionId:1, is_marked:1, session_end_at:1}).sort({session_date:-1}).limit(10).skip(skip*10)       
            if(response.length == 0) return result = {success:true, statusCode:404, msg: response}
            result = {success:true, statusCode:200, msg: response}
        } catch (error) {
            console.log(error)
            error.statusCode = 500
            error.message = "Some thing went wrong while getting attendance data"
            result = {success: false, msg: error}
        }
        return result
    }

export async function sessionsDetailData(sessionId) {
        let result;
        try {
            const response =  await  attendanceSessions.find({sessionId, is_marked:true}, {total_students:1, total_present_students:1})       
            if(response.length == 0) return result = {success:true, statusCode:404, msg: "No session found"}
            result = {success:true, statusCode:200, msg: response[0]}
        } catch (error) {
            console.log(error)
            error.statusCode = 500
            error.message = "Some thing went wrong while getting attendance data"
            result = {success: false, msg: error}
        }
        return result
    }

