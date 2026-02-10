import mongoose from "mongoose";
import { counter } from "./counter.js";

const  teacherSchema =  new mongoose.Schema({
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
    role:{
        type: String,
        default: 'teacher'
    },
    department_id:{
        type: Number,
        required: true
    }
})

teacherSchema.pre('save', async function () {
    if (this.isNew) {
           const data =  await counter.findOneAndUpdate(
                { collectionId: 'teachers' },
                { $inc: { seq: 1 } },
                { new: true, upsert: true }
            );
            this.id = data.seq
    }
})

export const teacher = mongoose.models.teacher || mongoose.model("teacher", teacherSchema);