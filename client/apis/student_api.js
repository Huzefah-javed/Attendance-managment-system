import api from "./api_setup.js"

export async function studentLogin({rollNo, password}){
    const res = await api.post("/studentLogin", {rollNo, password})
    console.log(res.data)
}

export async function getAttendanceDetail(){
    const res = await api.get("/check-attendance", )
    console.log(res.data)
}