import express from "express";
import { login, logout, signup, status } from "../controllers/authController.js";

const router = express.Router();
export default router;

router.post('/signup', signup);
router.post('/login', login);
router.post('/logout', logout)
router.get('/status', status);
