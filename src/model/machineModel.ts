import { prisma } from '../../lib/prisma.js';
import type { MachineModel } from '../../generated/prisma/models.js';

export type MachineData = Pick<MachineModel, 'name' | 'model' | 'sector'>;

export class Machine {
  constructor(
    public name: string,
    public model: string,
    public sector: string
  ) {
    this.validate();
  }

  validate(): void {
    if (!this.name?.trim()) throw new Error('name is required');
    if (!this.model?.trim()) throw new Error('model is required');
    if (!this.sector?.trim()) throw new Error('sector is required');
  }
}

export class MachineRepository {
  findAll() {
    return prisma.machine.findMany();
  }

  findById(id: number) {
    return prisma.machine.findUnique({ where: { id } });
  }

  create(data: MachineData) {
    return prisma.machine.create({ data });
  }

  update(id: number, data: MachineData) {
    return prisma.machine.update({ where: { id }, data });
  }

  remove(id: number) {
    return prisma.machine.delete({ where: { id } });
  }
}
