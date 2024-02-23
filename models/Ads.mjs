import mongoose from "mongoose";
const { Schema } = mongoose;

const addSchema = new Schema(
    {
        title: {
            required: true,
            type: String
        }
    }
)

const Ads = mongoose.model('ads', addSchema)