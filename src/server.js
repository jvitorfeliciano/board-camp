import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
const server = express();

server.use(express.json());
server.use(cors());

const port = process.env.PORT || 4000;
server.listen(port, () => console.log(`Server running in port ${port}`));


