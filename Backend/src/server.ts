import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();
const app: Express = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors({
  origin: ['https://sturdy-broccoli-vww95rqqppvfwv77-5173.app.github.dev', 'http://localhost:3000'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Routes

// Add your API routes here
app.get('/', (req: Request, res: Response) => {
  res.send('Hello, MERN stack!');
});

app.post("/api/register", (req: Request, res: Response)=>{
  console.log(req.body);
  res.json({status: "ok"});
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});