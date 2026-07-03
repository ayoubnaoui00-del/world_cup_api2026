import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Referee = sequelize.define('Referee', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  nationality: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  confederation: {
    type: DataTypes.ENUM('UEFA', 'CONMEBOL', 'CAF', 'AFC', 'CONCACAF', 'OFC'),
    allowNull: false,
  },
  category: {
    type: DataTypes.ENUM('Referee', 'Assistant', 'Fourth official', 'VAR', 'AVAR'),
    allowNull: false,
  },
  experience: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  status: {
    type: DataTypes.ENUM('active', 'suspended', 'injured', 'retired'),
    allowNull: false,
    defaultValue: 'active',
  },
}, {
  tableName: 'referees',
  timestamps: true,
});

export default Referee;