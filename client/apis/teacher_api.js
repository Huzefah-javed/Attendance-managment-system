import api from "./api_setup.js"

export async function teacherLogin({email, password}){
    const res = await api.post("/teacherLogin", {email, password})
    return res.data
}

export async function createLecSession(data){
   const res = await api.post("admin/create-session", data) 
   return res.data  
}

export async function getStudentForAttendance(){
   const res = await api.post("admin/mark-attendance") 
   return res.data  
}