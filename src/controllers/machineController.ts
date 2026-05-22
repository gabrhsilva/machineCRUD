import { type Request, type Response } from 'express';

export const getAllMachines = (req: Request, res: Response) => {
  res.json({ message: 'List of machines', machines: [] });
};

export const getMachineById = (req: Request, res: Response) => {
  const id = req.params.id;
  res.json({ message: `Machine with ID ${id}`, machine: {} });
};

export const createMachine = (req: Request, res: Response) => {
  const { name, model, sector } = req.body;
  res.json({ message: 'Machine created', machine: { name, model, sector } });
};

export const updateMachine = (req: Request, res: Response) => {
  const id = req.params.id;
  const { name, model, sector } = req.body;
  res.json({ message: `Machine ${id} updated`, machine: { name, model, sector } });
};

export const deleteMachine = (req: Request, res: Response) => {
  const id = req.params.id;
  res.json({ message: `Machine ${id} deleted` });
};
