import express from 'express';
import { createDeparment } from '../controller/departmentController.js';

const router = express.Router();

router.post('/create', createDeparment);
export default router;
