import express from 'express';
import { login, register } from '../controllers/auth.controller.js';
import { validateAuth } from '../middlewares/validate.middleware.js.js';

const router = express.Router();

router.post('/register', validateAuth, register);
router.post('/login', validateAuth, login);

export default router;
