import mongoose from "mongoose";
const AutoIncrement = require('mongoose-sequence')(mongoose)

const  teacherSubjectsSchema =  new mongoose.Schema({
    subjectId:{
        type: Number,
        unique: true
    },
    subject_name: {
        types: String,
        required: true,
        trim: true
    },
    teacher_id: {
        type: Number,
        required: true
    }
    
})

teacherSubjectsSchema.plugin(AutoIncrement, {inc_field: "subjectId"})

export const teacherSubjects = mongoose.Model("teachers_subject", teacherSubjectsSchema)