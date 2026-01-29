import { model, Schema } from "mongoose";


const counterSchema = new Schema({
    collectionId:{
        type: String,
        required: true,
    },
    seq:{
        type: Number,
        default:0
    }
})

export const counter = model('counter', counterSchema);
