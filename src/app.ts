import express from 'express';
import userRouter from './routes/userRoutes.js';
import machineRouter from './routes/machineRoutes.js';
import { type Response } from 'express';
import { type Request } from 'express'
// import path from 'path'

const app = express();
const port: number = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/machines', machineRouter);
app.use('/users', userRouter);

// Main
app.get('/', (req: Request, res: Response) => {
  res.redirect("/machines");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

