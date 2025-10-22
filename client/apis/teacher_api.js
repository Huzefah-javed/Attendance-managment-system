import api from "./api_setup.js"

export async function studentLogin({email, password}){
    const res = await api.post("/teacherLogin", {email, password})
    console.log(res.data)
}

export async function createLecSession(data){
   const res = await api.post("admin/create-session", data) 
   return res.data  
}