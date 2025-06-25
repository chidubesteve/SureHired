import dotenv from "dotenv";
import express from "express";

// CONFIG
dotenv.config();
const app = express();
app.use(express.json());

const port = Number(process.env.PORT) || 3000;

app.get("/", (req, res) => {
  res.send("Hello, Welcome to SureHired JobBoard!");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
