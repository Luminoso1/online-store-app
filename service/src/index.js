import "dotenv/config";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import router from "./routes/index.js";
import { PORT } from "./config.js";
const app = express();

app.use(express.json());

const allowedOrigins = [process.env.FRONTEND_URL];

app.use(
  cors({
    origin: (origin, callback) => {
      if (
        process.env.NODE_ENV === "development" &&
        (!origin || origin.includes("localhost"))
      )
        return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        console.error(`Bloqueado: ${origin}`);
        callback(new Error("No permitido por CORS"));
      }
    },
    credentials: true,
  }),
);
app.use(cookieParser());

app.use("/api/v1", router);

app.listen(PORT, () => console.log("app listen on port 3000"));
