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
   const res = await api.get("admin/get-students") 
   return res.data  
}

export async function markingAttendance(...args){
   const response = await api.post("/admin/mark-attendance", {presentStudents:args[0]})
   return response.data
}

export async function sessionHistory(){
   const response = await api.get("/admin/sessions-history")
   return response.data
}