import { Router } from 'express';
import authRoutes from './auth.routes.js';
import tournamentRoutes from './tournament.routes.js';

const router = Router();

router.use('/auth', authRoutes);
router.use('/tournament', tournamentRoutes);

export default router;