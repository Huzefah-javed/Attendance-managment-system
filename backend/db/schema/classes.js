import mongoose from "mongoose";
import { counter } from "./counter.js";

const  classSchema =  new mongoose.Schema({
    class_id:{
        type: Number,
        unique: true
    },
    class_name: {
        type: String,
        required: true,
        trim: true
    },
    department_id:{
        type: Number,
        required: true
    },
    
})

classSchema.pre("save", async function () {
    if (this.isNew) {
       const data = await counter.findOneAndUpdate(
        {collectionId: "classes"},
        {$inc:{seq:1}},
        {new: true, upsert:true}
       )
       this.class_id = data.seq
    }
})
export const classes = mongoose.models.class || mongoose.model("class", classSchema)