import { Router } from 'express';
import * as teamController from '../controllers/team.controller.js';
import { protect, restrictTo } from '../middlewares/auth.middleware.js';
import { isTournamentManager } from '../middlewares/owner.middleware.js';

const router = Router();

// Créer une équipe (SuperAdmin ou Gestionnaire)
router.post('/', protect, isTournamentManager, teamController.create);

// Récupérer les équipes d'un tournoi spécifique
router.get('/tournament/:tournamentId', teamController.getByTournament);

export default router;