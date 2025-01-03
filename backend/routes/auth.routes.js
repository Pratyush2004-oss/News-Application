import { Router } from "express";
import { checkAuth, login, register } from "../controller/auth.controller.js";
import { protectRoute, requireAdmin } from "../middleware/auth.middleware.js";

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.get('/check-auth', protectRoute, checkAuth);
router.get('/check-admin', protectRoute, requireAdmin, checkAuth);

export default router;