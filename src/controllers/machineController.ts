import { type Request, type Response } from 'express';
import { Machine, MachineRepository } from '../model/machineModel.js';
import { machineView } from '../views/machineView.js';

const machineRepository = new MachineRepository();

export const getAllMachines = async (req: Request, res: Response) => {
  try {
    const machines = await machineRepository.findAll();
    res.json(machineView.many(machines));
  } catch {
    res.status(500).json({ message: 'Error fetching machines' });
  }
};

export const getMachineById = async (req: Request, res: Response) => {
  try {
    const machine = await machineRepository.findById(Number(req.params.id));
    if (!machine) return res.status(404).json({ message: 'Machine not found' });
    res.json(machineView.one(machine));
  } catch {
    res.status(500).json({ message: 'Error fetching machine' });
  }
};

export const createMachine = async (req: Request, res: Response) => {
  try {
    const { name, model, sector } = req.body;
    const machine = new Machine(name, model, sector);
    machine.validate();
    const created = await machineRepository.create(machine);
    res.status(201).json(machineView.created(created));
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

export const updateMachine = async (req: Request, res: Response) => {
  try {
    const { name, model, sector } = req.body;
    const machine = new Machine(name, model, sector);
    machine.validate();
    const updated = await machineRepository.update(Number(req.params.id), machine);
    res.json(machineView.updated(updated));
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

export const deleteMachine = async (req: Request, res: Response) => {
  try {
    await machineRepository.remove(Number(req.params.id));
    res.json(machineView.deleted());
  } catch {
    res.status(500).json({ message: 'Error deleting machine' });
  }
};
