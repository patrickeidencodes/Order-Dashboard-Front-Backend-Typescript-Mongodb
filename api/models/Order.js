// @ts-nocheck
import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
    date: {
        type: Date,
        default: Date.now()
    },
    dateien: {
        type: [String],
    },
    product: {
        type: String,
        required: true,
    },
    knr: {
        type: Number,
        required: true,
    },
    deadline: Date,
    status: String,
    notes: String,
    link: String,
});

export default mongoose.model("Order", OrderSchema)