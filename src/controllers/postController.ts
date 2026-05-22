import { type Request, type Response } from 'express';

export const getAllPosts = (req: Request, res: Response) => {
  res.json({ message: 'List of posts', posts: [] });
};

export const getPostById = (req: Request, res: Response) => {
  const id = req.params.id;
  res.json({ message: `Post with ID ${id}`, post: {} });
};

export const createPost = (req: Request, res: Response) => {
  const { title, content } = req.body;
  res.json({ message: 'Post created', post: { title, content } });
};
