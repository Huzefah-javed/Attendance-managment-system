import { loginSession } from "../schema/login.sessions.js";

export async function loginStorageSession(id, role) {
    let result;
        try {
           await loginSession.create({user_id:id, role})
           result = {success: true}
            return result   
        } catch (error) {
            console.log(error)
            result = {success: false}
        }
}