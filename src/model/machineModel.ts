import { prisma } from '../../lib/prisma.js';

type MachineData = { name: string; model: string; sector: string };

function validateMachineData(data: Partial<MachineData>): void {
  if (!data.name?.trim()) throw new Error('name is required');
  if (!data.model?.trim()) throw new Error('model is required');
  if (!data.sector?.trim()) throw new Error('sector is required');
}

export const findAll = () => prisma.machine.findMany();

export const findById = (id: number) =>
  prisma.machine.findUnique({ where: { id } });

export const create = (data: MachineData) => {
  validateMachineData(data);
  return prisma.machine.create({ data });
};

export const update = (id: number, data: MachineData) => {
  validateMachineData(data);
  return prisma.machine.update({ where: { id }, data });
};

export const remove = (id: number) =>
  prisma.machine.delete({ where: { id } });
