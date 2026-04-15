import { Router } from 'express';
import * as tournamentController from '../controllers/tournament.controller.js';
import { protect, restrictTo } from '../middlewares/auth.middleware.js';
const router = Router();


// Routes publiques (ou juste protégées par login)
router.get('/', tournamentController.getAll);
router.get('/:id', tournamentController.getOne);

// Routes réservées au SUPER-ADMIN
router.post('/', protect, restrictTo('super-admin'), tournamentController.create);
router.put('/:id', protect, restrictTo('super-admin'), tournamentController.update);
router.delete('/:id', protect, restrictTo('super-admin'), tournamentController.remove);

export default router;