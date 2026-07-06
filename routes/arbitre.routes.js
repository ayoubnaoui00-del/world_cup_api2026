
import express from 'express';
import {
  createReferee,
  getAllReferees,
  getRefereeById,
  updateReferee,
  deleteReferee,
} from '../controllers/refereeController.js';

const router = express.Router();

router.post('/', createReferee);         
router.get('/', getAllReferees);          
router.get('/:id', getRefereeById);       
router.put('/:id', updateReferee);       
router.delete('/:id', deleteReferee);    

export default router;
