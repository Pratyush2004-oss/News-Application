import { Router } from "express";
import { deleteNews, getFeaturedNews, getLikedNews, getNews, getNewsFromAPI, getSingleNews, likeNews, postComment, postNews } from "../controller/news.controller.js";
import { protectRoute, requireAdmin } from "../middleware/auth.middleware.js";

const router = Router();

router.get('/', getNews);
router.get('/from-api', getNewsFromAPI);
router.get('/post', protectRoute, requireAdmin, postNews);
router.get('/like/:id', protectRoute, likeNews);
router.get('/get/:id', getSingleNews);
router.get('/liked-news', protectRoute, getLikedNews);
router.get('/featured', getFeaturedNews);
router.get('/delete/:id', protectRoute, requireAdmin, deleteNews);
router.post('/comment/:id', protectRoute, postComment);

export default router;