import Match from '../models/matches.model.js';
import Affectation from '../models/affectation.model.js';
import Referee from '../models/arbitre.model.js';

export const createMatch = async (req, res) => {
  try {
    const { homeTeam, awayTeam, stadium, hostCity, matchDate, phase } = req.body;


    if (!stadium || !homeTeam || !awayTeam || !hostCity || !matchDate || !phase) {
      return res.status(400).json({
        error: 'Date, homeTeam, awayTeam, and referee are required',
      });
    }


    const match = await Match.create({
      matchDate,
      homeTeam,
      stadium,
      awayTeam,
      hostCity,
      phase,
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

    if (!matches.length) {
      res.status(404).json({
        error: "No matches founded",
      });
    }

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
    const { stadium, homeTeam, awayTeam, matchDate, hostCity, phase } = req.body;

    const match = await Match.findByPk(id);

    if (!match) {
      return res.status(404).json({
        error: 'Match not found',
      });
    }


    await match.update({
      matchDate: matchDate ?? match.matchDate,
      homeTeam: homeTeam ?? match.homeTeam,
      stadium: stadium ?? match.stadium,
      awayTeam: awayTeam ?? match.awayTeam,
      hostCity: hostCity ?? match.hostCity,
      phase: phase ?? match.phase,
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

export const getMatchesByReferee = async (req, res) => {
  try {
    const { referee } = req.params;
    const matches = await Match.findAll({ where: { referee } });

    res.status(200).json({
      message: 'Matches retrieved successfully',
      data: matches,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getMatchWithReferees = async (req, res) => {
  try {
    const { id } = req.params;
    const match = await Match.findByPk(id);

    if (!match) {
      return res.status(404).json({ error: 'Match not found' });
    }

    const assignments = await Affectation.findAll({ where: { matchId: id } });
    const referees = assignments.map((assignment) => assignment.refereeId);

    res.status(200).json({
      message: 'Match referees retrieved successfully',
      data: { match, referees },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateMatchScore = async (req, res) => {
  try {
    const { id } = req.params;
    const { score } = req.body;
    const match = await Match.findByPk(id);

    if (!match) {
      return res.status(404).json({ error: 'Match not found' });
    }

    await match.update({ score });

    res.status(200).json({
      message: 'Match score updated successfully',
      data: match,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

