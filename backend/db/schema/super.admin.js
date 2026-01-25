import mongoose from "mongoose";
const AutoIncrement = require('mongoose-sequence')(mongoose)

const  superAdminSchema =  new mongoose.Schema({
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
    role:{
        type: String,
        default: 'super_admin'
    }
})

superAdminSchema.plugin(AutoIncrement, {inc_field: "userId"})

export const superAdmin = mongoose.Model("super_admin",superAdminSchema)