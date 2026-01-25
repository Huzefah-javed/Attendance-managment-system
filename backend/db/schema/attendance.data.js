import mongoose from "mongoose";
const AutoIncrement = require('mongoose-sequence')(mongoose)

const  attendanceDataSchema =  new mongoose.Schema({
    attendanceId:{
        type: Number,
        unique: true
    },
    session_id: {
        types: Number,
        required: true,
    },
    studentId:{
        type: Number,
        required: true,
    },
    status:{
        type: String,
        required: true,
        enum: ["present", "absent", "late", "leave"]
    }
    
})

attendanceDataSchema.plugin(AutoIncrement, {inc_field: "attendanceId"})

export const attendanceData = mongoose.Model("attendance_sessions_data", attendanceDataSchema)