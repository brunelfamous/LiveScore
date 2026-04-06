import dotenv from 'dotenv';
import cors from 'cors'
dotenv.config();

import express from 'express';
import apiRouter from './routes/index.js';
import { notFound } from '../../../fullstack-product/product-back/src/middlewares/notFound.js';
import { errorHandler } from '../../../fullstack-product/product-back/src/middlewares/errorHandler.js';

const app = express();
// Autoriser toutes les origines (pour dev seulement)
app.use(cors());
app.use(express.json());
app.use("/api", apiRouter);


app.use(notFound);
app.use(errorHandler);



export { app }; 