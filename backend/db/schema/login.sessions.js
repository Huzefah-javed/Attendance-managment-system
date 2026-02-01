import mongoose from "mongoose";
import { counter } from "./counter.js";


const  loginSessionsSchema =  new mongoose.Schema({
    id:{
        type: Number,
        unique: true
    },
    user_id: {
        type: Number,
        required: true,
    },
    role:{
        type: String,
        enum: ["super_admin", "departmental_admin", "student", "teacher"],
        required: true,
    },
    createdAt:{
        type: Date,
        default: Date.now
    }
    
})

loginSessionsSchema.pre('save', async function () {
    if (this.isNew) {
           const data =  await counter.findOneAndUpdate(
                { collectionId: 'login_sessions' },
                { $inc: { seq: 1 } },
                { new: true, upsert: true }
            );
            this.id = data.seq
    }
})

export const loginSession = mongoose.models.login_session || mongoose.model("login_session", loginSessionsSchema);