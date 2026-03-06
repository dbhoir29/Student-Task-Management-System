import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import taskRoutes from "./routes/taskRoutes.js";
import { connectDB } from "./config/db.js";
import dns from "node:dns";

dns.setServers(["1.1.1.1", "8.8.8.8"]);

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors({
    //origin: "http://localhost:5173",
}));

app.use(express.json());

app.use("/tasks", taskRoutes);

connectDB().then(() => {
    app.listen(port, () => {
        console.log(`Tasks API: http://localhost:${port}/tasks`);
    });
});
