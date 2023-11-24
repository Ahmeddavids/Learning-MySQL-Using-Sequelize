import { Sequelize } from "sequelize";

export const sequelize = new Sequelize('learning_mysql', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql'
  });