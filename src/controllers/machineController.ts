import { type Request, type Response } from 'express';
import * as machineModel from '../model/machineModel.js';

export const getAllMachines = async (req: Request, res: Response) => {
  try {
    const machines = await machineModel.findAll();
    res.json({ message: 'Machines fetched', machines });
  } catch {
    res.status(500).json({ message: 'Error fetching machines' });
  }
};

export const getMachineById = async (req: Request, res: Response) => {
  try {
    const machine = await machineModel.findById(Number(req.params.id));
    if (!machine) return res.status(404).json({ message: 'Machine not found' });
    res.json({ message: 'Machine fetched', machine });
  } catch {
    res.status(500).json({ message: 'Error fetching machine' });
  }
};

export const createMachine = async (req: Request, res: Response) => {
  try {
    const { name, model, sector } = req.body;
    const machine = await machineModel.create({ name, model, sector });
    res.status(201).json({ message: 'Machine created', machine });
  } catch {
    res.status(500).json({ message: 'Error creating machine' });
  }
};

export const updateMachine = async (req: Request, res: Response) => {
  try {
    const { name, model, sector } = req.body;
    const machine = await machineModel.update(Number(req.params.id), { name, model, sector });
    res.json({ message: 'Machine updated', machine });
  } catch {
    res.status(500).json({ message: 'Error updating machine' });
  }
};

export const deleteMachine = async (req: Request, res: Response) => {
  try {
    await machineModel.remove(Number(req.params.id));
    res.json({ message: 'Machine deleted' });
  } catch {
    res.status(500).json({ message: 'Error deleting machine' });
  }
};
