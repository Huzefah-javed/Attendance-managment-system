import axios from "axios"

const api = axios.create({
    baseURL:"http://localhost:3000",
    withCredentials: true
})

export async function studentLogin({rollNo, password}){
    const res = await api.post("/studentLogin", {rollNo, password})
    console.log(res.data)
}