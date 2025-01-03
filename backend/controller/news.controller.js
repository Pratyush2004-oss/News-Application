import cloudinary from "../config/clodinary.js";
import { newsModel } from "../models/news.Model.js"

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

// like news
export const likeNews = async (req, res, next) => {
    try {
        const newsId = req.params.id;
        const news = await newsModel.findById(newsId);
        if (!news) {
            return res.status(404).json({ message: "News not found", success: false });
        }

        if (news.likes.includes(req.user._id)) {
            await news.updateOne({ $pull: { likes: req.user._id } });
            return res.status(200).json({ news, success: true });
        }

        news.likes.push(req.user._id);
        await news.save();
        res.status(200).json({ news, success: true });

    } catch (error) {
        next(error);

    }
}

// post comment on news
export const postComment = async (req, res, next) => {
    try {
        const { commentbody } = req.body;
        const newsId = req.params.id;
        const news = await newsModel.findById(newsId);
        if (!news) {
            return res.status(404).json({ message: "News not found", success: false });
        }
        const comment = { user: req.user._id, commentbody };
        news.comments.push(comment);
        await news.save();
        res.status(200).json({ news, success: true });
    } catch (error) {

    }
}

// delete comment on news
export const deleteComment = async (req, res, next) => {

}

// get single news
export const getSingleNews = async (req, res, next) => {
    try {
        const newsId = req.params.id;
        const news = await newsModel.findById(newsId);
        if (!news) {
            return res.status(404).json({ message: "News not found", success: false });
        }
        res.status(200).json({ news, success: true });
    } catch (error) {
        next(error);
    }
}

// get liked news
export const getLikedNews = async (req, res, next) => {
    try {
        const news = await newsModel.find({ likes: req.user._id });
        if (!news) {
            return res.status(404).json({ message: "News not found", success: false });
        }
        res.status(200).json({ news, success: true });

    } catch (error) {
        next(error);
    }
}

// get featured news
export const getFeaturedNews = async (req, res, next) => {
    try {
        const news = await newsModel.aggregate([
            {
                $sample: { size: 10 }
            },
            {
                $sort: { createdAt: -1 }
            },
            {
                $project: {
                    _id: 1,
                    title: 1,
                    description: 1,
                    image: 1,
                    link: 1,
                    source: 1,
                    category: 1,
                    language: 1
                }
            },
        ])
    } catch (error) {
        next(error);
    }
}

// delete news
export const deleteNews = async (req, res, next) => {
    try {
        const newsId = req.params.id;
        const news = await newsModel.findByIdAndDelete(newsId);
        if (!news) {
            return res.status(404).json({ message: "News not found", success: false });
        }
        res.status(200).json({ news, success: true });
    } catch (error) {
        next(error);
    }
}
