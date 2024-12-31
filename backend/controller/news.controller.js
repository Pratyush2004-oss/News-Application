import { newsModel } from "../models/newsModel.js"

export const getNews = async (req, res) => {
    try {

        const news = await newsModel.find();

        if (!news) {
            return res.status(404).json({ message: "No news found", success: false })
        }
        return res.status(200).json({ news, success: true })

    } catch (error) {
        return res.status(500).json({ message: error.message, success: false })
    }
}

export const postNews = async (req, res) => {
    try {
        const { title, description, image, link, source, date, category } = req.body;

        const news = await newsModel.insertMany({ title, description, image, link, source, date, category });

        if (!news) {
            return res.status(404).json({ message: "No news found", success: false })
        }
        return res.status(200).json({ news, success: true })


    } catch (error) {
        return res.status(500).json({ message: error.message, success: false })
    }
}