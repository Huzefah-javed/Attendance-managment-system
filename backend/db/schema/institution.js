import mongoose from "mongoose";
import { counter } from "./counter.js";

const  institutionSchema =  new mongoose.Schema({
    institutionId:{
        type: Number,
        unique: true
    },
    institution_name: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    registration_date:{
        type: Date,
        required: true,
        default: Date.now
    },
    owned_by:{
        type: Number,
        required: true
    }
})

institutionSchema.pre("save", async function(){
    if(this.isNew){
       const data = await counter.findOneAndUpdate(
        {collectionId: "institution"},
        {$inc:{seq: 1}},
        {new: true, upsert: true}
       )
       this.institutionId = data.seq
    }
})


export const institution = mongoose.models.institution || mongoose.model("institution",institutionSchema)