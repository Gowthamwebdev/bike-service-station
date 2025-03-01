import express from 'express';
import verifyToken from '../middleware/authMiddleWare.js';
import { cancelPendingBooking, createBooking, getBookings } from '../controllers/bookingController.js';

const router = express.Router();
export default router;

router.get('/', verifyToken, getBookings);
router.post('/new', verifyToken, createBooking);
router.put('/:id', verifyToken);
router.delete('/:id', verifyToken, cancelPendingBooking);