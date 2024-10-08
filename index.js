// index.js
import express from 'express';
import cors from 'cors';
import rootRouter from './routes/index';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/v1', rootRouter);

export default function handler(req, res) {
  // Let Express handle the request
  app(req, res);
}