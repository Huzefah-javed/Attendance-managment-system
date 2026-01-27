import mongoose from "mongoose";
import inc from 'mongoose-sequence'

const AutoIncrement = inc(mongoose)

const  loginSessionsSchema =  new mongoose.Schema({
    id:{
        type: Number,
        unique: true
    },
    user_id: {
        type: Number,
        required: true,
    },
    role:{
        type: String,
        enum: ["super_admin", "department_admin", "student", "teacher"],
        required: true,
    },
    createdAt:{
        type: Date,
        default: Date.now
    }
    
})

try {
    loginSessionsSchema.plugin(AutoIncrement, { 
        inc_field: "id", 
        id: "login_session_counter" // Unique string for this specific counter
    });
} catch (e) {
    if (!e.message.includes("Counter already defined")) {
        throw e;
    }
}

export const loginSession = mongoose.models.login_session || mongoose.model("login_session", loginSessionsSchema);