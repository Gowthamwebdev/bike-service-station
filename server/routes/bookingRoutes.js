import express from 'express';
import verifyToken from '../middleware/authMiddleWare.js';

const router = express.Router();
export default router;

router.get('/', verifyToken);
router.post('/new', verifyToken);
router.put('/:id', verifyToken);
router.delete('/:id', verifyToken);