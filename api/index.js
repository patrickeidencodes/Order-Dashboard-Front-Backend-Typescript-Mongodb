// @ts-nocheck
import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoute from "./routes/auth.js";
import userRoute from "./routes/users.js";
import orderRoute from "./routes/order.js";
import cookieParser from "cookie-parser";
import cors from 'cors';
import path from "path";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
dotenv.config();

const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO);
        console.log("Connected to MongoDB.");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        process.exit(1); // Beenden Sie den Prozess bei Verbindungsfehlern
    }
};

// Middlewares
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}));
app.use(cookieParser());
app.use(express.json());
app.use("/api/auth", authRoute);
app.use("/api/order", orderRoute);
app.use("/api/users", userRoute);

app.use((err, req, res, next)=> {
    const errorStatus = err.status || 500
    const errorMessage = err.message || "bad things happened"
    return res.status(errorStatus).json({
        success: false,
        status: errorStatus,
        message: errorMessage,
        stack: err.stack,
    })
})


// Catch-all for SPA routing
app.get('*', (req, res) => {
    if(req.originalUrl === "/order/customer?knr=1"){
        res.redirect('http://localhost:8800/api' + req.originalUrl);
    }
});

       
// Anything that doesn't match the above, send back index.html
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
});
// Start Server
app.listen(8800, () => {
    connect();
    console.log("Connected to backend on port 8800.");
});
