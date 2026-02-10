import mongoose from "mongoose";

const  teacherSubjectsSchema =  new mongoose.Schema({
    subject_name: {
        type: String,
        required: true,
        trim: true
    },
    teacher_id: {
        type: Number,
        required: true
    }
    
})

export const teacherSubjects = mongoose.model.teachers_subject || mongoose.model("teachers_subject", teacherSubjectsSchema)