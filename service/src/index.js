import "dotenv/config";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import router from "./routes/index.js";
import { PORT } from "./config.js";
const app = express();

app.use(express.json());

const allowedOrigins = [process.env.FRONTEND_URL, "http://localhost:5173"];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("No permitido por CORS"));
      }
    },
    credentials: true,
  }),
);
app.use(cookieParser());

app.use("/api/v1", router);

app.listen(PORT, () => console.log("app listen on port 3000"));
