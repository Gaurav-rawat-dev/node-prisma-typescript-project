"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// import rootRouter from "./routes/index.js";
const app = (0, express_1.default)();
const { PORT } = require("./config");
// app.get('/', (req: Request, res: Response) => {
//   res.send('Hello TypeScript + Node.js!');
// });
// app.use("/api", rootRouter)
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
