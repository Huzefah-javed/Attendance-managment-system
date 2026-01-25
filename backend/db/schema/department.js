import mongoose from "mongoose";
const AutoIncrement = require('mongoose-sequence')(mongoose)

const  departmentSchema =  new mongoose.Schema({
    departmentId:{
        type: Number,
        unique: true
    },
    department_name: {
        types: String,
        required: true,
        trim: true
    },
    institutionId:{
        type: Number,
        required: true
    },
    hod:{
        type: Number,
        required: true
    }
})

departmentSchema.plugin(AutoIncrement, {inc_field: "departmentId"})

export const department = mongoose.Model("department", departmentSchema)