import express from "express";
import { login, signup, status } from "../controllers/authController.js";

const router = express.Router();
export default router;

router.post('/signup', signup);
router.post('/login', login);
router.get('/status', status);
