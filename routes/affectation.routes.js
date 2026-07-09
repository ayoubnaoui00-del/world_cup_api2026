import express from 'express';
import {
  createAffectation,
  getAllAffectation,
  updateAffectation,
  deleteAffectation,

  getById,
} from '../controllers/affectation.controller.js';

const router = express.Router();

router.post('/', createAffectation);                            
router.get('/', getAllAffectation);                              
router.get('/:id', getById);                           
router.put('/:id', updateAffectation);                           
router.delete('/:id', deleteAffectation);                         
// router.get('/referee/:refereeId', getAffectationsByReferee);      
// router.get('/match/:matchId', getAffectationsByMatch);            
// router.patch('/:id/status', updateAffectationStatus);           

export default router;