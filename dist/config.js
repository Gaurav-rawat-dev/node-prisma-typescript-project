"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PORT = void 0;
const dotenv = require("dotenv");
dotenv.config({ path: ".env" });
exports.PORT = process.env.PORT;
