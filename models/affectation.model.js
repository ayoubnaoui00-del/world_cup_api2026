import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Assignment = sequelize.define('Assignment', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  refereeId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'referees',
      key: 'id',
    },
  },
  matchId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'matches',
      key: 'id',
    },
  },
  role: {
    type: DataTypes.ENUM('central', 'assistant', 'VAR', 'AVAR', 'fourth official'),
    allowNull: false,
  },
}, {
  tableName: 'assignments',
  timestamps: true,
  indexes: [
    { fields: ['refereeId'] },
    { fields: ['matchId'] },
    {
      unique: true,
      fields: ['refereeId', 'matchId', 'role'],
    },
  ],
});

export default Assignment;