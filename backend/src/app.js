import dotenv from 'dotenv';
import cors from 'cors'
dotenv.config();

import express from 'express';
import { notFound } from './middlewares/notFound.js';
import { errorHandler } from './middlewares/errorHandler.js';
import apiRouter from './routes/index.js';

const app = express();
// Autoriser toutes les origines (pour dev seulement)
app.use(cors());
app.use(express.json());
app.use("/api", apiRouter);


app.use(notFound);
app.use(errorHandler);



export { app }; 