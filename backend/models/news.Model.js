import mongoose from "mongoose";

const newsSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    image: {
        type: String,
    },
    link: {
        type: String,
        required: true,
        unique: true
    },
    source: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    publishedAt: {
        type: Date,
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
        content: {
            type: String,
            required: true
        }
    }],
}, { timestamps: true });

export const newsModel = mongoose.model("news", newsSchema);
