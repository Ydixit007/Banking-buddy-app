import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";

dotenv.config();

const app: Express = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());

// Routes
// Add your API routes here

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, MERN stack!");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
