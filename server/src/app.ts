import dotenv from "dotenv";
import express from "express";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";
import jobsRoutes from "./routes/JobRoutes";
import companyRoutes from "./routes/CompanyRoutes";
// CONFIG
dotenv.config();
const app = express();
app.use(express.json());
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

app.get("/", (req, res) => {
  res.send("Hello, Welcome to SureHired JobBoard!");
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
