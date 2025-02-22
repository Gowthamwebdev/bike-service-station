import express from 'express';

const router = express.Router();
export default router;

router.post('/addbike');
router.get('/');
router.put('/:bikeId')
router.delete('/:bikeId');