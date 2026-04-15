import { Router } from 'express';
import authRoutes from './auth.routes.js';
import tournamentRoutes from './tournament.routes.js';
import teamRoutes from './team.routes.js';

const router = Router();

router.use('/auth', authRoutes);
router.use('/tournament', tournamentRoutes);
router.use('/teams', teamRoutes);

export default router;