import "./config/dotenv.js";
import express from "express";
import connectDB from "./config/database.js";
import dns from "dns";
import userRoute from "./routers/userRoute.js"
import cookieParser from "cookie-parser"
import messageRoute from "./routers/messageRoute.js";
import cors from "cors";
import { app, server } from "./socket/socket.js";

dns.setServers(["1.1.1.1", "8.8.8.8"]);

const PORT = process.env.PORT || 8080;

// ? middleware
if (process.env.TRUST_PROXY) app.set("trust proxy", Number(process.env.TRUST_PROXY));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

const corsOptions = {
    origin: [process.env.FRONTEND_URL],
    credentials: true,
};

app.use(cors(corsOptions));


//? routes create kare hai
app.use("/api/v1/user", userRoute)
app.use("/api/v1/message", messageRoute)

server.listen(PORT, () => {
    connectDB();
    console.log(`server started at ${PORT}`)
})

