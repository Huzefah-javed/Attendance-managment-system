import {Schema, model, models} from "mongoose";

const  studentSchema =  new Schema({
    id:{
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
    roll_number:{
        type: String,
        required:true,
        unique:true
    },
    role:{
        type: String,
        default: 'student'
    },
    classId:{
        type: Number,
        required: true
    }
})

studentSchema.pre('save', async function () {
    if (this.isNew) {
           const data =  await counter.findOneAndUpdate(
                { collectionId: 'students' },
                { $inc: { seq: 1 } },
                { new: true, upsert: true }
            );
            this.id = data.seq
    }
})

export const students = models.student || model("student",studentSchema)