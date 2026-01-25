import mongoose from "mongoose";
const AutoIncrement = require('mongoose-sequence')(mongoose)

const  studentSchema =  new mongoose.Schema({
    userId:{
        type: Number,
        unique: true
    },
    name: {
        types: String,
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
    classId:{
        type: Number,
        required: true
    }
})

studentSchema.plugin(AutoIncrement, {inc_field: "userId"})

export const students = mongoose.Model("student",studentSchema)