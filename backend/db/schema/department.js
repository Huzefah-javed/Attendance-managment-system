import mongoose from "mongoose";
import { counter } from "./counter.js";

const  departmentSchema =  new mongoose.Schema({
    departmentId:{
        type: Number,
        unique: true
    },
    department_name: {
        type: String,
        required: true,
        trim: true
    },
    institution_id:{
        type: Number,
        required: true
    },
    hod_id:{
        type: Number,
    }
})

departmentSchema.pre("save", async function(){
       if (this.isNew) {
          const data = await counter.findOneAndUpdate(
            {collectionId: "department"},
            {$inc:{seq:1}},
            {new:true, upsert: true}
           )
           this.departmentId = data.seq
       } 
})

export const department = mongoose.models.department || mongoose.model("department", departmentSchema)