import express from "express";
import { login, signup } from "../controllers/authController.js";

const router = express.Router();
export default router;

router.post('/signup', signup);
router.post('/login', login);

