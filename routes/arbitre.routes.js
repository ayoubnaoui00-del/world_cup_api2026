
import express from 'express';
import {
  createReferee,
  getAllReferees,
  deleteReferee,
  getById,
  updateRefree,
} from '../controllers/arbitre.controller.js';

const router = express.Router();

router.post('/', createReferee);         
router.get('/', getAllReferees);          
router.get('/:id', getById);       
router.put('/:id', updateRefree);       
router.delete('/:id', deleteReferee);    

export default router;
