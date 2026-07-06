import express from 'express';
import {
  createAffectation,
  getAllAffectations,
  getAffectationById,
  updateAffectation,
  deleteAffectation,
  getAffectationsByReferee,
  getAffectationsByMatch,
  updateAffectationStatus,
} from '../controllers/affectationController.js';

const router = express.Router();

router.post('/', createAffectation);                            
router.get('/', getAllAffectations);                              
router.get('/:id', getAffectationById);                           
router.put('/:id', updateAffectation);                           
router.delete('/:id', deleteAffectation);                         
router.get('/referee/:refereeId', getAffectationsByReferee);      
router.get('/match/:matchId', getAffectationsByMatch);            
router.patch('/:id/status', updateAffectationStatus);           

export default router;