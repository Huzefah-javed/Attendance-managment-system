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
   const classId = args[0]
   const sessionId = args[1]
   const res = await api.get(`teacher/students-for-attendance/${classId}/${sessionId}`) 
   return res.data  
}

export async function markingAttendance(...args){
   console.log(args)
   const response = await api.post("/teacher/mark-attendance", {sessionId:args[0], presentStudArr:args[1], totalStuds:args[2]})
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
   const skip = args[2] || 0
   const response = await api.get(`/teacher/latest-sessions-history/${class_id}/${subject_id}?skip=${skip}`)
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