import { type Request, type Response } from 'express';
import { prisma } from '../../lib/prisma.js';

export const getAllMachines = async (req: Request, res: Response) => {
  try {
    const machine = await prisma.machine.findMany();

     res.status(201).json({
      message: 'Machine fetched',
      machine,
    });

  } catch (error) {
    res.status(500).json({
      message: 'Error fetching machine',
    });
  }
};

export const getMachineById = async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    const machine = await prisma.machine.findUnique({
      where: {
      id: Number(id),
      },
    });

    res.status(201).json({
      message: 'Machine fetched',
      machine,
    });

  } catch (error) {
    res.status(500).json({
      message: 'Error fetching machine',
    });
  }

  res.json({ message: `Machine with ID ${id}`, machine: {} });
};

export const createMachine = async (req: Request, res: Response) => {
  try {
    const { name, model, sector } = req.body;

    const machine = await prisma.machine.create({
      data: {
        name,
        model,
        sector,
      },
    }); 
    
    res.status(201).json({
      message: 'Machine created',
      machine,
    });

  } catch (error) {
    res.status(500).json({
      message: 'Error creating machine',
    });
}};

export const updateMachine = async (req: Request, res: Response) => {
  const id = req.params.id;
  const { name, model, sector } = req.body;

  try {
    const machine = await prisma.machine.update({
      where: {
        id: Number(id),
      },
      data: {
        name,
        model,
        sector,
      },
    });

    res.status(201).json({
      message: 'Machine updated',
      machine,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error updating machine',
    });
  }
};

export const deleteMachine = async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    await prisma.machine.delete({
      where: {
        id: Number(id),
      },
    });

    res.status(201).json({
      message: 'Machine deleted',
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error deleting machine',
    });
  }
};
