
import express from 'express';
import {
  createMatch,
  getAllMatches,
  getMatchById,
  updateMatch,
  deleteMatch,
  getMatchesByReferee,
  getMatchWithReferees,
  updateMatchScore,
} from '../controllers/matchController.js';

const router = express.Router();

router.post('/', createMatch);                          
router.get('/', getAllMatches);                       
router.get('/:id', getMatchById);                       
router.put('/:id', updateMatch);                        
router.delete('/:id', deleteMatch);                     
router.get('/referee/:referee', getMatchesByReferee);   
router.get('/:id/referees', getMatchWithReferees);      
router.patch('/:id/score', updateMatchScore);           

export default router;