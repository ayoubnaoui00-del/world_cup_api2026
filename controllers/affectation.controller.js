import Affectation from '../models/affectation.model';
import Referee from '../models/Referee.js';
import Match from '../models/Match.js';

export const createAffectation = async (req, res) => {
  try {
    const { refereeId, matchId, status, dateAssigned } = req.body;

    if (!refereeId || !matchId) {
      return res.status(400).json({
        error: 'refereeId and matchId are required',
      });
    }


    const referee = await Referee.findByPk(refereeId);
    if (!referee) {
      return res.status(404).json({
        error: 'Referee not found',
      });
    }

    
    const match = await Match.findByPk(matchId);
    if (!match) {
      return res.status(404).json({
        error: 'Match not found',
      });
    }

    
    const affectation = await Affectation.create({
      refereeId,
      matchId,
      status: status || 'pending',
      dateAssigned: dateAssigned || new Date(),
    });

    res.status(201).json({
      message: 'Affectation created successfully',
      data: affectation,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

export const getAllAffectation = async (req, res) => {
    try {
        const affectation = await Affectation.findAll();
        res.status(200).json(affectation)
    } catch (error) {
        res.status(500).json({error:'server error'})
    }
}

export const getById = async (req, res) => {
    try {
        const {id} = req.params.id;
        if (!id) return res.status(404).json("data not found")
        const data = await Affectation.findByPk(id);
    if (!data) return res.status(404).json("data not found")
    } catch (error) {
       res.status(500).json({error : "server error"})
    }
}

export const updateAffectation = async (req, res) => {
    
    try {
      const {id} = req.params;
    const affectation = await Affectation.findByPk(ud);
    if (!affectation) {
        returnres.status(404).json({
            error: 'Affectation not found'
        });
    }
    await affectation.update(req.body)  
    } catch (error) {
        res.status(500).json({error : "server error"});
    }
}
 export const deleteAffectation = async (req,  res) =>{
    try {
        const {id}= req.params ;
        const affectation = await Affectation.findByPk(id);

        if (!affectation) {
            return res.status(404).json({error:'Affectation not found'});

        }
        await affectation.destroy();
        res.status(200).json({message: 'affectation deleted successfully'});
    } catch (error) {
        res.status(500).json({error:'server error'});
    }
 }


