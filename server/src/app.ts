import dotenv from "dotenv";
import express from "express";
import helmet from "helmet";
import cors from "cors";
import jobsRoutes from "./routes/JobRoutes";
// CONFIG
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(cors({
  origin:[ process.env.CLIENT_URL || "http://localhost:3000"],
  credentials: true,
}));

const port = Number(process.env.PORT) || 3000;


// ROUTES
app.get("/", (req, res) => {
  res.send("Hello, Welcome to SureHired JobBoard!");
});

app.use("/", jobsRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
