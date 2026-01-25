import mongoose from "mongoose";
const AutoIncrement = require('mongoose-sequence')(mongoose)

const  classSchema =  new mongoose.Schema({
    classId:{
        type: Number,
        unique: true
    },
    class_name: {
        types: String,
        required: true,
        trim: true
    },
    departmentId:{
        type: Number,
        required: true
    },
    
})

classSchema.plugin(AutoIncrement, {inc_field: "classId"})

export const classes = mongoose.Model("class", classSchema)