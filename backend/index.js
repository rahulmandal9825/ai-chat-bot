import express from "express";
import dotenv from 'dotenv';
import cors from "cors";

import chatRouter from "./routes/chat.route.js"
dotenv.config({ path: './.env' });



const app = express()

const port = 3000


app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})


app.use('/api',chatRouter);





app.use((err, rq, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'internal server error';
    return res.status(statusCode).json({
        succes: false,
        statusCode,
        message,
    });
});
