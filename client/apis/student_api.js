import api from "./api_setup.js"

export async function studentLogin({rollNo, password}){
    const res = await api.post("/studentLogin", {rollNo, password})
    return res.data
}

export async function getAttendanceDetail(){
    const res = await api.get("student/check-attendance", )
    return res.data
}

export async function getAttendanceHistory(subject){
    const res = await api.post("student/attendance-history", {subject})
    return res.data
}