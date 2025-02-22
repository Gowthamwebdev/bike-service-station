import express from 'express';
import { addBike, deleteBike, getBike, getBikes, updateBike } from '../controllers/bikeController.js';
import verifyToken from '../middleware/authMiddleWare.js';

const router = express.Router();
export default router;

router.post('/addbike', verifyToken, addBike);
router.get('/', verifyToken, getBikes);
router.get('/:bikeId', verifyToken, getBike);
router.put('/:bikeId', verifyToken, updateBike);
router.delete('/:bikeId', verifyToken, deleteBike);