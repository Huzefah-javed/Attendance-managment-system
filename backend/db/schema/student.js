import mongoose from "mongoose";
import { counter } from "./counter.js";

const  studentSchema =  new mongoose.Schema({
    id:{
        type: Number,
        unique: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    email:{
        type: String,
        required: true,
        unique: true, 
        lowercase: true
    },
    password:{
        type: String,
        required: true,
    },
    roll_number:{
        type: String,
        required:true,
        unique:true
    },
    role:{
        type: String,
        default: 'student'
    },
    class_id:{
        type: Number,
        required: true
    }
})

studentSchema.pre('save', async function () {
    if (this.isNew) {
           const data =  await counter.findOneAndUpdate(
                { collectionId: 'students' },
                { $inc: { seq: 1 } },
                { new: true, upsert: true }
            );
            this.id = data.seq
    }
})

export const students = mongoose.models.student || mongoose.model("student",studentSchema)