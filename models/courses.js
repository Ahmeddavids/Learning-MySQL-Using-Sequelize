import { Sequelize, DataTypes, Model } from 'sequelize';
import { sequelize } from '../database/sequelize.js';

export class Course extends Model {}

Course.init({
  // Model attributes are defined here
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  createdAt: {
    allowNull: false,
    type: Sequelize.DATE
  },
  updatedAt: {
    allowNull: false,
    type: Sequelize.DATE
  }
}, {
  // Other model options go here
  sequelize,
  modelName: 'Course',
  tableName: "Courses"
});
