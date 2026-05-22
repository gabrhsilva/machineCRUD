import express from 'express';
import machineRouter from './routes/machineRoutes.js';
import postRouter from './routes/postRoutes.js';
import { type Response } from 'express';
import { type Request } from 'express'
import path from 'path'

const app = express();
const port: number = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/machines', machineRouter);
app.use('/api/posts', postRouter);

// Responda com Olá Mundo! na página inicial:
app.get('/', (req: Request, res: Response) => {
  res.sendFile(path.join(process.cwd(), 'src/views/index.html'));
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

