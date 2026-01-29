import mongoose from "mongoose";


const  superAdminSchema =  new mongoose.Schema({
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
        default: 'super_admin'
    }
})

// 3. Prevent "OverwriteModelError" if the file is re-imported
export const superAdmin = mongoose.models.super_admin || mongoose.model("super_admin", superAdminSchema);