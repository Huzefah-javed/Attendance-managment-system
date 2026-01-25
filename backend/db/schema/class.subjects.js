import mongoose from "mongoose";
const AutoIncrement = require('mongoose-sequence')(mongoose)

const  classSubjectsSchema =  new mongoose.Schema({
    subjectId:{
        type: Number,
        unique: true
    },
    subject_name: {
        types: String,
        required: true,
        trim: true
    },
    classId:{
        type: Number,
        required: true
    },
    teaches_by:{
        type: Number,
    }
    
})

classSubjectsSchema.plugin(AutoIncrement, {inc_field: "subjectId"})

export const classesSubjects = mongoose.Model("classes_subject", classSubjectsSchema)