import { authModel } from "../models/auth.model.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const register = async (req, res, next) => {
    try {

        const { firstName, lastName, email, password } = req.body;

        let user = await authModel.findOne({ email: email });
        if (user) {
            return res.status(400).json({ message: "User already exists with this Id", success: false });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        user = await authModel.create({
            fullName: `${firstName} ${lastName}`,
            email,
            password: hashedPassword
        })
        user.save();
        res.status(201).json({ message: "User created successfully", success: true, user });
    } catch (error) {
        console.log("Error in Register user controller : ", error.message);
        next(error);
    }
}

export const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                message: 'Something is missing',
                success: false
            });
        }
        let user = await authModel.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'User not found.', success: false })
        }
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) { return res.status(400).json({ message: 'Password doesnot match', success: false }); }

        const TokenData = {
            userId: user._id
        }
        const token =  jwt.sign(TokenData, process.env.SECRET_KEY, { expiresIn: '10d' });

        user = {
            _id: user._id,
            fullName: user.fullName,
            email: user.email
        }
        return res.status(200).cookie("token", token, { maxAge: 10 * 24 * 60 * 60 * 1000, httpOnly: true, sameSite: 'strict' }).json({
            message: `Welcome back ${user.fullName.split(' ')[0]}`,
            user,
            success: true
        })

    } catch (error) {
        console.log('Error in Login user Controller ' + error.message)
        next(error);
    }
}

export const checkAuth = async (req, res, next) => {
    try {
        const user = await authModel.findById(req.user._id);
        if (!user) {
            return res.status(400).json({ message: "User not found", success: false });
        }

        res.status(200).json({ user, success: true });

    } catch (error) {
        console.log("Error in Check-auth controller : " + error.message);
        next(error);
    }
}

export const checkAdmin = async (req, res, next) => {
    try {
        const user = await authModel.findById(req.user._id);
        if (!user) {
            return res.status(400).json({ message: "User not found", success: false });
        }

        res.status(200).json({ user, success: true });
    }
    catch (error) {
        console.log("Error in Check-admin controller : " + error.message);
        next(error);
    }
}

export const logout = async (req, res, next) => {
    try {
        return res.status(200).cookie("token", '', { maxAge: 0 }).json({
            message: "Logout Successfully",
            success: true
        })
    } catch (error) {
        console.log('Error in user Logout Controller ' + error.message)
        next(error);
    }
}