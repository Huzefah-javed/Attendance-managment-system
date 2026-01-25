import mongoose from "mongoose";
const AutoIncrement = require('mongoose-sequence')(mongoose)

const  institutionSchema =  new mongoose.Schema({
    institutionId:{
        type: Number,
        unique: true
    },
    institution_name: {
        types: String,
        required: true,
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

institutionSchema.plugin(AutoIncrement, {inc_field: "institutionId"})

export const institution = mongoose.Model("institution",institutionSchema)