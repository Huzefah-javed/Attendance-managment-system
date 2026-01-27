import mongoose from "mongoose";
import inc from 'mongoose-sequence'

const AutoIncrement = inc(mongoose)

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

try {
    superAdminSchema.plugin(AutoIncrement, { inc_field: "id" });
} catch (e) {
    if (!e.message.includes("Counter already defined")) {
        throw e;
    }
}

// 3. Prevent "OverwriteModelError" if the file is re-imported
export const superAdmin = mongoose.models.super_admin || mongoose.model("super_admin", superAdminSchema);