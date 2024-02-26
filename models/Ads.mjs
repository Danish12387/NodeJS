import mongoose from "mongoose";
const { Schema } = mongoose;

const adsSchema = new Schema({
    title: {
        required: true,
        type: String
    },
    description: {
        required: true,
        type: String
    },
    amount: {
        required: true,
        type: Number
    }
});

const Ads = mongoose.model('ads', adsSchema);

export default Ads;