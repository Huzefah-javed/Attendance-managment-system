import { classesSubjects } from "../schema/class.subjects.js";
import { classes } from "../schema/classes.js";
import { department } from "../schema/department.js";
import { students } from "../schema/student.js";
import { teacher } from "../schema/teacher.js";

export async function departmentConfirmation(department_id, hod_id) {
    let result;
    try {
            const response = await department.aggregate([
                    {$match: {$and:[
                        {department_id},
                        {hod_id}
                    ]}}
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
            error.message = "Some thing went wrong while authenticating department"
            result = {success: false, msg: error}
            return result
        }
}


export async function creatingClass(class_name, department_id) {
    let result;
    try {
        await classes.create({
            class_name, department_id
        })
        result={success: true, statusCode: 201}
    } catch (error) {
        error.statusCode = 500
        error.msg = "Error: cannot saved this document or database connection"
        result={success: false, msg: error}
    }
    return result
}

export async function classesData(hod_id) {
    let result;
    try {
      const data =  await department.aggregate([
            {
                $match:{
                    hod_id 
                }
            },
            {
                $lookup:{
                    from:'classes',
                    foreignField:'department_id',
                    localField:'department_id',
                    as:'classes'
                }
            },
            {
                $project:{
                    _id:0,
                    institution_id:0,
                    hod_id:0,
                    department_id:0,
                    'classes._id':0,
                    'classes.department_id':0
                }
            }
        ])
        result={success: true, statusCode: 200, msg:data[0]}
    } catch (error) {
        error.statusCode = 500
        error.msg = "Error: cannot saved this document or database connection"
        result={success: false, msg: error}
    }
    return result
}

export async function departmentClassValidation(class_id, hod_id) {
    let result;
    try {
        const response =  await department.aggregate([
            {$match:{hod_id}},
            {$lookup:{
                from: "classes",
                foreignField:"department_id",
                localField:"department_id",
                as: "classesData"
            }},
            {$unwind:"$classesData"},
            {$match: {"classesData.class_id" : class_id}}
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
        error.msg = "database connection issue"
        result={success: false, msg: error}
    }
    return result
}

export async function registeringStudent(name, email, password, roll_number,class_id) {
    let result;
    try {
        await students.create({
            name, email, password,role:"student", roll_number, class_id
        })
        result={success: true, statusCode: 201}
    } catch (error) {
        console.log(error)
        error.statusCode = 500
        error.msg = "Error: cannot saved this document or database connection"
        result={success: false, msg: error}
    }
    return result
}


export async function subjectAssigningToClass(subject_name, class_id) {
     let result
             try {
                 const response = await classesSubjects.create(
                    {subject_name, class_id}
                 )
                 result = { statusCode: 201, success: true }
             } catch (error) {
               console.log(error)
                error.message = "Internal server error"
                     error.status = 500                    
                   result = {msg:error, success:false}
                  }
               
                return result              
       }

    export async function registeringTeacher(name, email, password, department_id) {
        let result;
        try {
            await teacher.create({
                name, email, password,role:"teacher", department_id
            })
            result={success: true, statusCode: 201}
        } catch (error) {
            console.log(error)
            error.statusCode = 500
            error.msg = "Error: cannot saved this document or database connection"
            result={success: false, msg: error}
        }
        return result
    }

    export async function assigningTeacher(teacher_id, class_id) {
        let result;
        try {
            await classesSubjects.updateOne(
                {class_id},
                {teaches_by: teacher_id}
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