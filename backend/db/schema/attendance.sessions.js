import mongoose from "mongoose";
import { counter } from "./counter.js";

const  attendanceSessionsSchema =  new mongoose.Schema({
    sessionId:{
        type: Number,
        unique: true
    },
    class_id: {
        type: Number,
        required: true,
    },
    subject_id:{
        type: Number,
        required: true
    },
    session_date:{
        type: Date,
        required: true,
        default: Date.now
    },
    is_marked:{
        type: Boolean,
        default:false
    },
    total_present_students:{
        type: Number,
        default:0
    },
    teacher_id:{
        type: Number,
        required:true
    },
    total_students:{
        type: Number,
        default:0
    }
    
})

attendanceSessionsSchema.pre("save",async function(){
    if (this.isNew) {
               const data =  await counter.findOneAndUpdate(
                    { collectionId: 'attendanceSession' },
                    { $inc: { seq: 1 } },
                    { new: true, upsert: true }
                );
                this.sessionId = data.seq
        }
})

export const attendanceSessions = mongoose.models.attendance_session || mongoose.model("attendance_session", attendanceSessionsSchema) 