import api from "./api_setup.js"

export async function teacherLogin({email, password}){
    const res = await api.post("/teacherLogin", {email, password})
    return res.data
}

export async function createLecSession(data){
   const res = await api.post("teacher/create-session", data) 
   return res.data  
}

export async function getStudentForAttendance(...args){
   const res = await api.get(`teacher/get-students/${args[0]}`) 
   return res.data  
}

export async function markingAttendance(...args){
   const response = await api.post("/teacher/mark-attendance", {sessionId:args[0], presentStudents:args[1]})
   return response.data
}

export async function latestSessionHistory(){
   const response = await api.get("/teacher/latest-sessions-history")
   return response.data
}

export async function sessionHistory(args){
   const response = await api.post("/teacher/sessions-history", {skip: args[0]})
   return response.data
}

export async function sessionHistoryDetails(...args){
   const response = await api.post("/teacher/sessions-history/details", {sessionId: args[0]})
   return response.data
}