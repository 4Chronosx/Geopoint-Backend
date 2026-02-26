

import { Router } from 'express';
import { create, getCurrentUser, login, logout } from '../controllers/auth.controller';
import { authenticate } from '../middleware/middleware';

const router = Router();

router.post('/signup', create)
router.post('/login', login)
router.post('/logout', authenticate, logout)
router.get('/currentUser', authenticate, getCurrentUser) 

export default router;

