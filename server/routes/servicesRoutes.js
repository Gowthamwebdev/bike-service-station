import express from 'express';
import { addServices, getServices } from '../controllers/servicesController.js';
import verifyToken from '../middleware/authMiddleWare.js';

const router = express.Router();

router.post('/', verifyToken, addServices);
router.get('/', verifyToken, getServices);

export default router;