import Affectation from '../models/affectation.model.js';
import Referee from '../models/arbitre.model.js';
import Match from '../models/matches.model.js';


export const createAffectation = async (req, res) => {
  try {
    const { refereeId, matchId, role } = req.body;

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
      role
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
    const affectation = await Affectation.findAll({
      include: [
        {
          model: Referee,
         
          attributes: ['firstName', 'lastName', 'nationality', 'confederation', 'category', 'experience', 'status'],
        },
        {
          model: Match,
          
          attributes: ['id', 'homeTeam', 'awayTeam', 'stadium', 'hostCity', 'matchDate', 'phase'],
        },
      ],
    });

    res.status(200).json({ message: 'Assignment retrieved successfully', data: affectation });
  } catch (error) {
    res.status(500).json({ error: 'server error' });
  }
};

export const getById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) return res.status(404).json({ error: 'data not found' });
    const data = await Affectation.findByPk(id);
    if (!data) return res.status(404).json({ error: 'data not found' });
    res.status(200).json({ message: 'Affectation retrieved successfully', data });
  } catch (error) {
    res.status(500).json({ error: 'server error' });
  }
};

export const updateAffectation = async (req, res) => {
  try {
    const { id } = req.params;
    const affectation = await Affectation.findByPk(id);
    if (!affectation) {
      return res.status(404).json({
        error: 'Affectation not found',
      });
    }
    await affectation.update(req.body);
    res.status(200).json({ message: 'Affectation updated successfully', data: affectation });
  } catch (error) {
    res.status(500).json({ error: 'server error' });
  }
};
export const deleteAffectation = async (req, res) => {
  try {
    const { id } = req.params;
    const affectation = await Affectation.findByPk(id);

    if (!affectation) {
      return res.status(404).json({ error: 'Affectation not found' });

    }
    await affectation.destroy();
    res.status(200).json({ message: 'affectation deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'server error' });
  }
}


