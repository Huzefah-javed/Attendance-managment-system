import mongoose from "mongoose";
import { counter } from "./counter.js";

const  departmentAdminSchema =  new mongoose.Schema({
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
        default: 'department_admin'
    },
    institution_id:{
        type: Number,
        required: true
    }
})

departmentAdminSchema.pre('save', async function () {
    if (this.isNew) {
           const data =  await counter.findOneAndUpdate(
                { collectionId: 'departmental_admin' },
                { $inc: { seq: 1 } },
                { new: true, upsert: true }
            );
            this.id = data.seq
    }
})

export const departmentAdmin = mongoose.models.department_admin || mongoose.model("department_admin",departmentAdminSchema)