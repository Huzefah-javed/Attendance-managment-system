import mongoose from "mongoose";
const AutoIncrement = require('mongoose-sequence')(mongoose)

const  attendanceSessionsSchema =  new mongoose.Schema({
    sessionId:{
        type: Number,
        unique: true
    },
    class_id: {
        types: Number,
        required: true,
    },
    session_date:{
        type: Date,
        required: true,
        default: Date.now
    },
    is_marked:{
        type: Boolean,
        required: true
    },
    total_present_students:{
        type: Number,
        required: true
    },
    total_students:{
        type: Number,
        required: true
    }
    
})

attendanceSessionsSchema.plugin(AutoIncrement, {inc_field: "sessionId"})

export const attendanceSessions = mongoose.Model("attendance_session", attendanceSessionsSchema)