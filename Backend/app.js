import express from "express";
import { config } from "dotenv";
import ErrorMiddleware from "./middleware/Error.js";
import cookieParser from "cookie-parser";
import cors from "cors";

config({
  path: "./config/config.env",
});
const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
  method: ["GET", "POST", "PUT", "DELETE"],
};
const app = express();
app.use(cors(corsOptions));

//Use Middleware
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(cookieParser());

//Routes
import user from "./routes/userRoutes.js";

app.use("/api/v1", user);

export default app;

app.use(ErrorMiddleware);
