import Match from '../models/matches.model.js';
import Affectation from '../models/Affectation.js';
import Referee from '../models/Referee.js';

export const createMatch = async (req, res) => {
  try {
    const { date, homeTeam, awayTeam, referee, score } = req.body;

    
    if (!date || !homeTeam || !awayTeam || !referee) {
      return res.status(400).json({
        error: 'Date, homeTeam, awayTeam, and referee are required',
      });
    }

    
    const match = await Match.create({
      date,
      homeTeam,
      awayTeam,
      referee,
      score: score || '0-0',
    });

    res.status(201).json({
      message: 'Match created successfully',
      data: match,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};


export const getAllMatches = async (req, res) => {
  try {
    const matches = await Match.findAll();

    res.status(200).json({
      message: 'Matches retrieved successfully',
      data: matches,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};


export const getMatchById = async (req, res) => {
  try {
    const { id } = req.params;
    const match = await Match.findByPk(id);

    if (!match) {
      return res.status(404).json({
        error: 'Match not found',
      });
    }

    res.status(200).json({
      message: 'Match retrieved successfully',
      data: match,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

export const updateMatch = async (req, res) => {
  try {
    const { id } = req.params;
    const { date, homeTeam, awayTeam, referee, score } = req.body;

    const match = await Match.findByPk(id);

    if (!match) {
      return res.status(404).json({
        error: 'Match not found',
      });
    }


    await match.update({
      date: date || match.date,
      homeTeam: homeTeam || match.homeTeam,
      awayTeam: awayTeam || match.awayTeam,
      referee: referee || match.referee,
      score: score !== undefined ? score : match.score,
    });

    res.status(200).json({
      message: 'Match updated successfully',
      data: match,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

export const deleteMatch = async (req, res) => {
  try {
    const { id } = req.params;


    const match = await Match.findByPk(id);

    if (!match) {
      return res.status(404).json({
        error: 'Match not found',
      });
    }

    await match.destroy();

    res.status(200).json({
      message: 'Match deleted successfully',
      data: match,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

