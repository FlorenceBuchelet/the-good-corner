import "reflect-metadata";

import express from "express";
import cors from "cors";

export const app = express();
const port = 4000;

app.use(cors());
app.use(express.json());