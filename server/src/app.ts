import dotenv from "dotenv";
import express from "express";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";
import jobsRoutes from "./routes/Job.routes";
import companyRoutes from "./routes/Company.routes";
import userRoutes from "./routes/User.routes";
import authRoutes from "./routes/Auth.routes";
import path from "path";

// CONFIG
dotenv.config();
const app = express();
app.use(express.json());
// expose /uploads folder as static
const uploadsPath = path.join(__dirname, "uploads");
app.use("/uploads", (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Origin", process.env.CLIENT_URL);
  res.header("Access-Control-Allow-Methods", "GET");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});
app.use("/uploads", express.static(uploadsPath));
app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps or Postman)
      const allowedOrigins = [process.env.CLIENT_URL, "http://localhost:3000"];
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      // Reject requests from other origins
      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
    optionsSuccessStatus: 204,
  })
);


app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("dev"));

const port = Number(process.env.PORT) || 3000;


// ROUTES
app.use("/api", jobsRoutes);
app.use("/api", companyRoutes);
app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("Hello, Welcome to SureHired JobBoard!");
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
