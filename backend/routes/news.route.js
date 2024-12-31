import { Router } from "express";
import { getNews, postNews } from "../controller/news.controller.js";

const router = Router();

router.get('/', getNews);
router.get('/post', postNews);

export default router;