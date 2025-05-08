
import express, { Request, Response, Express } from "express";
import { PrismaClient } from "../generated/prisma/index.js";


import rootRouter from "./routes/index.js";
const app:Express = express();
import { PORT } from "./config";

// app.get('/', (req: Request, res: Response) => {
//   res.send('Hello TypeScript + Node.js!');
// });

export const prismaClient = new PrismaClient({
  log: ['query'],
})
app.use(express.json())
app.use("/api", rootRouter)
app.get("/", (req:Request, res: Response)=>{
  res.send("working app")
})

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
