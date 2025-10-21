import api from "./api_setup.js"

export async function studentLogin({email, password}){
    const res = await api.post("/teacherLogin", {email, password})
    console.log(res.data)
}

export function getStudentForAttendance(){
    
}