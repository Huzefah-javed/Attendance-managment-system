import mongoose from "mongoose";
import { counter } from "./counter.js";

const  classSubjectsSchema =  new mongoose.Schema({
    subject_id:{
        type: Number,
        unique: true
    },
    subject_name: {
        type: String,
        required: true,
        trim: true
    },
    class_id:{
        type: Number,
        required: true
    },
    teaches_by:{
        type: Number,
    }
    
})

classSubjectsSchema.pre("save", async function (){
    if (this.isNew) {
        const data =  await counter.findOneAndUpdate(
                        { collectionId: 'subjects' },
                        { $inc: { seq: 1 } },
                        { new: true, upsert: true }
                    );
        this.subject_id = data.seq
    }
})

export const classesSubjects = mongoose.models.classes_subject || mongoose.model("classes_subject", classSubjectsSchema)