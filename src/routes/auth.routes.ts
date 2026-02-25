

import { Router } from 'express';
import { create, login, logout } from '../controllers/auth.controller';
import { authenticate } from '../middleware/middleware';

const router = Router();

router.post('/signup', create)
router.post('/login', login)
router.post('/logout', authenticate, logout) // corrected handler

export default router;

