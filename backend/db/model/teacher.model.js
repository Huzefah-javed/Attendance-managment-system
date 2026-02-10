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