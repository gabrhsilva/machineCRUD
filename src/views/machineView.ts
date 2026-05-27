export const machineView = {
  many: (machines: object[]) => ({ message: 'Machines fetched', machines }),
  one: (machine: object) => ({ message: 'Machine fetched', machine }),
  created: (machine: object) => ({ message: 'Machine created', machine }),
  updated: (machine: object) => ({ message: 'Machine updated', machine }),
  deleted: () => ({ message: 'Machine deleted' }),
};
