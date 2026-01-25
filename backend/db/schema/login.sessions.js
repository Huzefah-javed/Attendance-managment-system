import mongoose from "mongoose";
const AutoIncrement = require('mongoose-sequence')(mongoose)

const  loginSessionsSchema =  new mongoose.Schema({
    id:{
        type: Number,
        unique: true
    },
    user_id: {
        types: Number,
        required: true,
    },
    role:{
        type: String,
        enum: ["super_admin", "department_admin", "student", "teacher"],
        required: true,
    }
    
})

loginSessionsSchema.plugin(AutoIncrement, {inc_field: "id"})

export const attendanceData = mongoose.Model("login_session", loginSessionsSchema)