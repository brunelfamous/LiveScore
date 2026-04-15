import Tournament from '../models/Tournament.js';

export const isTournamentManager = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const userRole = req.user.role;
    
    // 1. Si c'est un super-admin, on passe direct
    if (userRole === 'super-admin') {
      return next();
    }

    // 2. On récupère le tournoi (soit via l'ID dans l'URL, soit via le body pour une création d'équipe)
    const tournamentId = req.params.tournamentId || req.body.tournament;

    if (!tournamentId) {
      return res.status(400).json({ message: "ID du tournoi manquant pour vérification." });
    }

    const tournament = await Tournament.findById(tournamentId);

    if (!tournament) {
      return res.status(404).json({ message: "Tournoi non trouvé." });
    }

    // 3. Vérification de la propriété
    // Attention : on compare des ObjectIds, il faut utiliser .equals() ou transformer en String
    if (tournament.manager.toString() !== userId) {
      return res.status(403).json({ 
        message: "Accès refusé : vous n'êtes pas le gestionnaire de ce tournoi." 
      });
    }

    // C'est bon, on continue
    next();
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la vérification des droits." });
  }
};