import express from "express";
import type { Request, Response } from "express";
import dotenv from "dotenv";
const app = express();
dotenv.config();
app.use(express.json());
const PORT = process.env.PORT || 2000;

app.listen(PORT, () => {
  console.log("Express api running in port:", PORT);
});

app.get("/api", (req: Request, res: Response) => {
  return res.send("Awas ada api");
});
