import mongoose from "mongoose";

const newsSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    link: {
        type: String,
        required: true,
    },
    source: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    language: [{
        type: String,
        required: true
    }],
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "auth"
    }],
    comments: [{
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "auth"
        },
        comment: {
            type: String
        }
    }],
}, { timestamps: true });

export const newsModel = mongoose.model("news", newsSchema);
