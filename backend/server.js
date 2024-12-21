import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { connectDB } from './config/db.conn.js';
import cookieParser from 'cookie-parser';

const app = express();
dotenv.config();

app.use(express.json()); // from req.body parse the data to the json format
app.use(cookieParser()); // for handling cookies in middlewares

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    connectDB();
    console.log(`server is running on port ${process.env.PORT}`)
})