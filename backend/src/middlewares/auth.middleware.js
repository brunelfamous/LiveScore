import jwt from 'jsonwebtoken';
import Blacklist from '../models/Blacklist.js';

export const protect = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.startsWith('Bearer') ? authHeader.split(' ')[1] : null;

  if (!token) return res.status(401).json({ message: "Accès refusé, token manquant." });

  try {
    const isBlacklisted = await Blacklist.findOne({ token });
    if (isBlacklisted) {
      return res.status(401).json({ message: "Ce token n'est plus valide (déconnecté)." });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Contient id et role
    next();
  } catch (err) {
    res.status(401).json({ message: "Token invalide ou expiré." });
  }
};

export const restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: "Permission insuffisante." });
    }
    next();
  };
};