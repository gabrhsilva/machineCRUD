import express, { Router,} from 'express';
import { type Request, type Response } from 'express';

const postRouter: Router = express.Router();

// GET: Fetch all posts
postRouter.get('/', (req: Request, res: Response) => {
  res.json({ message: 'List of posts', posts: [] });
});

// GET: Fetch a post by ID
postRouter.get('/:id', (req: Request, res: Response) => {
  const id = req.params.id;
  res.json({ message: `Post with ID ${id}`, post: {} });
});

// POST: Create a post
postRouter.post('/', (req: Request, res: Response) => {
  const { title, content } = req.body;
  res.json({ message: 'Post created', post: { title, content } });
});

export default postRouter;