import api from "./api_setup.js"

export async function teacherLogin({email, password}){
    const res = await api.post("/teacherLogin", {email, password})
    return res.data
}

export async function createLecSession(data, classId, subjectId){
   const res = await api.post("teacher/createSession", {data, classId, subjectId}) 
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

export async function latestSessionHistory(args){
   const classId = args[0]
   const subjectId = args[1]
   const response = await api.get(`/teacher/latest-sessions-history/${classId}/${subjectId}`)
   return response.data
}

export async function sessionHistory(args){
    const class_id = args[0]
   const subject_id = args[1]
   const response = await api.get(`/teacher/latest-sessions-history/${class_id}/${subject_id}`)
   return response.data
}

export async function sessionHistoryDetails(...args){
   const response = await api.post("/teacher/sessions-history", {sessionId: args[0]})
   return response.data
}

export async function getClasses(){
   const response = await api.get("/teacher/getClasses")
   return response.data
}

export async function getSingleClassData(args){
   const class_id = args[0]
   const subject_id = args[1]
   const response = await api.get(`/teacher/classData/${class_id}/${subject_id}`)
   return response.data
}