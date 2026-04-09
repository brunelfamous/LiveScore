import { Router } from 'express';
import * as authController from '../controllers/auth.controller.js';

import { protect, restrictTo } from '../middlewares/auth.middleware.js';

const router = Router();

// Route Login
router.post('/login', authController.login);
router.post('/logout', protect, authController.logout);

// Route Inscription Gestionnaire (Réservée au Super-Admin)
router.post('/register-manager', protect, restrictTo('super-admin'), authController.registerGestionnaire);

// Route Inscription User (Publique)
router.post('/register', authController.registerUser);


export default router;