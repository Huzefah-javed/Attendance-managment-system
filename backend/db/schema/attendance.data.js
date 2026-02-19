import mongoose from "mongoose";

const  attendanceDataSchema =  new mongoose.Schema({
    session_id: {
        type: Number,
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

export const attendanceData = mongoose.models.attendance_sessions_data|| mongoose.model("attendance_sessions_data", attendanceDataSchema)