import jwt from 'jsonwebtoken';
import { authModel } from '../models/auth.model.js';
export const protectRoute = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({ message: "Unauthorized - No token provided", success: false });
        }

        const decoced = jwt.verify(token, process.env.SECRET_KEY);

        if (!decoced) {
            return res.status(401).json({ message: "Unauthorized - Invalid token", success: false });
        }

        const user = await authModel.findById(decoced.userId).select("-password");

        if (!user) {
            return res.status(401).json({ message: "Unauthorized - User not found", success: false });
        }

        req.user = user;
        next();

    } catch (error) {
        next(error);
    }
}

export const requireAdmin = async (req, res, next) => {
    try {
        const currentUser = req.user;
        const isAdmin = process.env.ADMIN_EMAILS.includes(currentUser.email);

        if (!isAdmin) {
            return res.status(401).json({ message: "Unauthorized - User is not an admin", success: false });
        }

        next();

    } catch (error) {
        next(error);
    }
}