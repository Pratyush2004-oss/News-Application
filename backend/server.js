// importing modules
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import fs from 'fs';
import cron from 'node-cron'
import fileUpload from 'express-fileupload';
import cookieParser from 'cookie-parser';

// importing Database connection
import { connectDB } from './config/db.conn.js';

// importing routes
import newsRoutes from './routes/news.route.js';
import authRoutes from './routes/auth.routes.js';

const app = express();
dotenv.config();
const __dirname = path.resolve();


app.use(express.json()); // from req.body parse the data to the json format
app.use(cookieParser()); // for handling cookies in middlewares
app.use(express.urlencoded({ extended: true }))

app.use(
    fileUpload({
        useTempFiles: true,
        tempFileDir: path.join(__dirname, "tmp"),
        createParentPath: true,
        limits: {
            fileSize: 10 * 1024 * 1024      // 10mb max file size
        },
    })
);
const tempDir = path.join(process.cwd(), 'tmp');
cron.schedule("0 * * * *", () => {
    if (fs.existsSync(tempDir)) {
        fs.readdir(tempDir, (err, files) => {
            if (err) {
                console.log("error", err);
                return;
            }
            for (const file of files) {
                fs.unlink(path.join(tempDir, file), (err) => { });
            }
        });
    }
});

// cors
app.use(cors({
    origin: 'http://localhost:5001',
    credentials: true,
}));

// api used
app.use('/api/users', authRoutes);
app.use('/api/news', newsRoutes);

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../frontend/dist")));
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "../frontend/dist/index.html"));
    });
}
app.use((err, req, res, next) => {
    res.status(500).json({ message: process.env.NODE_ENV === 'production' ? "Internal Server Error" : "Internal Server Error : " + err.message })
})

const PORT = process.env.PORT;
app.listen(PORT, () => {
    connectDB();
    console.log(`server is running on port ${process.env.PORT}`)
})