import api from "./api_setup"


export async function superAdminLogin(args){
    const email = args[0]
    const password = args[1]
    const res = await api.post("/superAdminLogin", {email, password})
    return res.data
}

export async function getAllDepartments(){
    const res = await api.get("/superAdmin/departments")
    return res.data
}