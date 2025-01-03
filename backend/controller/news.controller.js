import cloudinary from "../config/clodinary.js";
import { newsModel } from "../models/newsModel.js"

const uploadToCloudinary = async (file) => {
    try {
        const result = await cloudinary.uploader.upload(file.tempFilePath, {
            resource_type: 'auto'
        })
        return result.source_url;

    } catch (error) {
        console.log("Error in UploadToCloudinary", error);
        throw new Error("Error uploading to Cloudinary");
    }
}

// get news from database
export const getNews = async (req, res, next) => {
    try {

        const news = await newsModel.find().sort({ createdAt: -1 });

        if (!news) {
            return res.status(404).json({ message: "No news found", success: false })
        }
        return res.status(200).json({ news, success: true })

    } catch (error) {
        console.log("Error in getting News : ", error.message)
        next(error)
    }
}

// post news in database
export const postNews = async (req, res, next) => {
    try {

        if (!req.files || !req.files.image) {
            res.status(400).json({ message: "No image found", success: false })
        }

        const { title, description, link, source, category, languages } = req.body;
        const { imageFile } = req.files;

        if (!title || !description || !link || !source || category || languages) {
            return res.status(400).json({ message: "Missing required fields", success: false })
        }
        let languageArray;
        if (languages) {
            languageArray = languages.split(',');
        }

        const imageUrl = await uploadToCloudinary(imageFile);

        const news = new newsModel({
            title,
            description,
            image: imageUrl,
            link,
            source,
            category,
            language: languageArray
        })
        news.save();
        res.status(200).json({ news, success: true, message: "News Uploaded Successfully" })
    } catch (error) {
        console.log("Error in Uploading news : " + error.message);
        next(error);
    }
}

