import express, {Router} from 'express';
import {
    getAllMachines,
    getMachineById,
    createMachine,
    updateMachine,
    deleteMachine
} from '../controllers/machineController.js';

const machineRouter: Router = express.Router();

machineRouter.get('/', getAllMachines);
machineRouter.get('/:id', getMachineById);
machineRouter.post('/', createMachine);
machineRouter.put('/:id', updateMachine);
machineRouter.delete('/:id', deleteMachine);    

export default machineRouter;