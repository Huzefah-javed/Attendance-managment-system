import api from "./api_setup";


export async function departmentHeadLogin({email, password}){
    const res = await api.post("/departmentalAdminLogin", {email, password})
    return res.data
}

export async function getClassesData(){
    const res = await api.get("departmentAdmin/getClasses")
    return res.data
}

export async function getClassesDetailData(...args){
    console.log("Niger ", args)
    const res = await api.post("departmentAdmin/getClassesDetails", {class_id: args[0]})
    return res.data
}

export async function getTeacherData(...args){
    const subjectName = args[0]
    const res = await api.get(`departmentAdmin/availableTeacherForSubject/${subjectName}`)
    return res.data
}

export async function changeTeacherForClassSubj(args){
    const teacher_id = args[0]
    const class_id = args[1]
    const subject_id = args[2]
    const res = await api.post(`departmentAdmin/assignTeacherToSubject`,{teacher_id, class_id, subject_id})
    return res.data
}

export async function subjectCreation(args){
    console.log(args)
    const class_id = args[0]
    const subject_name = args[1]
    const res = await api.post(`departmentAdmin/registerClassSubject`, { subject_name, class_id })
    return res.data
}

export async function classCreation(args){
    const class_name = args[0]
    const res = await api.post(`departmentAdmin/classCreation`, { class_name })
    return res.data
}

export async function editClassname(args){
    const class_name = args[0]
    const class_id = args[1]
    const res = await api.post(`departmentAdmin/editClassName`, { class_name, class_id })
    return res.data
}

export async function registeringStudent(args){
    const name = args[0]
    const roll_number = args[1]
    const email = args[2]
    const password = args[3]
    const class_id = args[4]
    const res = await api.post(`departmentAdmin/registerStudent`, { name, email, password, roll_number, class_id })
    return res.data
}

export async function registeringTeacher(args){
    const name = args[0]
    const email = args[1]
    const password = args[2]
    const res = await api.post(`departmentAdmin/registerTeacher`, { name, email, password })
    return res.data
}

export async function getFacultyDetail(){
    const res = await api.get(`departmentAdmin/getFaculty`)
    return res.data
}