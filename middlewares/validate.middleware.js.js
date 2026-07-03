export const validateReferee = (req, res, next) => {
  const { firstName, lastName, nationality, confederation, category, experience, status } = req.body;

  const validConfederations = ['UEFA', 'CONMEBOL', 'CAF', 'AFC', 'CONCACAF', 'OFC'];
  const validCategories = ['Referee', 'Assistant', 'Fourth official', 'VAR', 'AVAR'];
  const validStatuses = ['active', 'suspended', 'injured', 'retired'];

  if (!firstName || !lastName || !nationality || !confederation || !category) {
    return res.status(400).json({ success: false, error: 'Missing required fields' });
  }
  if (!validConfederations.includes(confederation)) {
    return res.status(400).json({ success: false, error: `Invalid confederation. Must be one of: ${validConfederations.join(', ')}` });
  }
  if (!validCategories.includes(category)) {
    return res.status(400).json({ success: false, error: `Invalid category. Must be one of: ${validCategories.join(', ')}` });
  }
  if (status && !validStatuses.includes(status)) {
    return res.status(400).json({ success: false, error: `Invalid status. Must be one of: ${validStatuses.join(', ')}` });
  }

  next();
};

export const validateMatch = (req, res, next) => {
  const { homeTeam, awayTeam, stadium, hostCity, matchDate, phase } = req.body;

  const validPhases = ['Group stage', 'Round of 16', 'Quarter-final', 'Semi-final', 'Final'];

  if (!homeTeam || !awayTeam || !stadium || !hostCity || !matchDate || !phase) {
    return res.status(400).json({ success: false, error: 'Missing required fields' });
  }
  if (!validPhases.includes(phase)) {
    return res.status(400).json({ success: false, error: `Invalid phase. Must be one of: ${validPhases.join(', ')}` });
  }

  next();
};

export const validateAssignment = (req, res, next) => {
  const { refereeId, matchId, role } = req.body;

  const validRoles = ['central', 'assistant', 'VAR', 'AVAR', 'fourth official'];

  if (!refereeId || !matchId || !role) {
    return res.status(400).json({ success: false, error: 'Missing required fields: refereeId, matchId, role' });
  }
  if (!validRoles.includes(role)) {
    return res.status(400).json({ success: false, error: `Invalid role. Must be one of: ${validRoles.join(', ')}` });
  }

  next();
};