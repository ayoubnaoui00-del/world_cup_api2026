import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Match = sequelize.define('Match', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  homeTeam: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  awayTeam: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  stadium: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  hostCity: {
    type: DataTypes.STRING,
    allowNull: false,
    validate:{max:10,min:1}
  },
  matchDate: {
    type : DataTypes.DATE?
    allowNull: false,
  },
}, {
  tableName: 'matches',
  timestamps: true,
});

export default Match;