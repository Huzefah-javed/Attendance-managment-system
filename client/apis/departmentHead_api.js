import api from "./api_setup";


export async function departmentHeadLogin({email, password}){
    const res = await api.post("/departmentalAdminLogin", {email, password})
    return res.data
}

export async function getClassesData(){
    const res = await api.get("departmentAdmin/getClasses")
    return res.data
}

export async function getClassesDetailData(args){
    const res = await api.post("departmentAdmin/getClassesDetails", {class_id: args[0]})
    return res.data
}