import sequelize from '../config/database.js';
import Referee from './arbitre.model.js';
import Match from './matches.model.js';
import Assignment from './affectation.model.js';

Referee.hasMany(Assignment, { foreignKey: 'refereeId' });
Assignment.belongsTo(Referee, {forgeignKey: 'refereeId'});

Match.hasMany(Assignment, { foreignKey: 'matchId' });
Assignment.belongsTo(Match, {foreignKey: 'matchId'});

Referee.belongsTo(Match, {trough: Assignment, foreignKey: 'refereeId'});
Match.belongsToMany(Referee, {through: Assignment, foreignKey: 'matchId'});

export { sequelize, Referee, Match, Assignment};
