import mongoose from "mongoose";
const { Schema } = mongoose;

const UserSchema = new mongoose.Schema({
    email:{
        type: String,
        unique:true
    },
    password:{
        type: String, 
        required: true,
    },
    isAdmin: {
        type: Boolean,
        required: false,
        default: false
    },
    cnr: {
        type: Number,
        required: true,
        unique:true
    },
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    registered: {
        type: Boolean,
        default: false
    },
},
{ timestamps: true}
);

export default mongoose.model("User", UserSchema)