import axios from "axios"

const api = axios.create({
    baseURL:"http://localhost:5000",
    withCredentials: true
})

export async function getAuthData(){
    const res = await api.get("/auth/me")
    return res.data
}

export default api