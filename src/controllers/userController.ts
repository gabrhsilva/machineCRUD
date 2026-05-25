import { type Request, type Response } from 'express';

export const getAllUsers = (req: Request, res: Response) => {
  res.json({ message: 'List of users', users: [] });
};

export const getUserById = (req: Request, res: Response) => {
  const id = req.params.id;
  res.json({ message: `User with ID ${id}`, user: {} });
};

export const createUser = (req: Request, res: Response) => {
  const { name, email } = req.body;
  res.json({ message: 'User created', user: { name, email } });
};

export const updateUser = (req: Request, res: Response) => {
  const id = req.params.id;
  const { name, email } = req.body;
  res.json({ message: `User ${id} updated`, user: { name, email } });
};

export const deleteUser = (req: Request, res: Response) => {
  const id = req.params.id;
  res.json({ message: `User ${id} deleted` });
};
