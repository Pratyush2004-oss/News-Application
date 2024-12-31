import Mongoose from "mongoose";
const authSchema = new Mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
});

export const authModel = Mongoose.model("auth", authSchema);