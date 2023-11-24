import express from 'express'
import { sequelize } from './database/sequelize.js';
import logger from './utils/logger.js';
import Router from './routes/userRouter.js';
import departmentRouter from './routes/departmentRouter.js';

const PORT = 4044;

const app = express();
app.use(express.json())

app.use('/api/student', Router);
app.use('/api/department', departmentRouter);

try {
    await sequelize.authenticate();
   logger.info('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }

app.listen(PORT, () => {
   logger.info(`App is listening on PORT: ${PORT}`);
})