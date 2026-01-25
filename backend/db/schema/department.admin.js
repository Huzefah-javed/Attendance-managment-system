import mongoose from "mongoose";
const AutoIncrement = require('mongoose-sequence')(mongoose)

const  departmentAdminSchema =  new mongoose.Schema({
    id:{
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
    role:{
        type: String,
        default: 'department_admin'
    }
})

departmentAdminSchema.plugin(AutoIncrement, {inc_field: "id"})

export const departmentAdmin = mongoose.Model("department_admin",departmentAdminSchema)