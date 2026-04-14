import User from '../models/User.js';
import Role from '../models/Role.js';
import Blacklist from '../models/Blacklist.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export const createUser = async (userData, creatorRole) => {
  // Sécurité : Seul le super-admin peut créer un gestionnaire
  if (userData.roleName === 'gestionnaire' && creatorRole !== 'super-admin') {
    throw new Error("Action interdite : seul le super-admin crée des gestionnaires.");
  }

  const role = await Role.findOne({ name: userData.roleName });
  if (!role) throw new Error("Rôle spécifié introuvable.");

  const newUser = new User({ ...userData, role: role._id });
  return await newUser.save();
};

export const login = async (email, password) => {
  const user = await User.findOne({ email }).populate('role');
  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new Error("Identifiants invalides.");
  }

  const token = jwt.sign(
    { id: user._id, role: user.role.name },
    process.env.JWT_SECRET,
    { expiresIn: '24h' }
  );

  user.isOnline = true;
  await user.save();

  return { 
    token, 
    user: { 
      id: user._id, 
      username: user.username, 
      role: user.role.name 
    } 
  };
};

export const logout = async (userId, token) => {
  const user = await User.findById(userId);
  if (!user) throw new Error("Utilisateur non trouvé.");

  // On décode le token pour récupérer sa date d'expiration exacte
  const decoded = jwt.decode(token);

  if (!decoded || !decoded.exp) {
    // On passe quand même l'user hors-ligne par sécurité
    user.isOnline = false;
    await user.save();
    return { message: "Déconnexion effectuée (session déjà expirée)." };
  }

  const expiresAt = new Date(decoded.exp * 1000);

  // On ajoute le token à la blacklist
  await Blacklist.create({
    token,
    expiresAt
  });

  user.isOnline = false;
  await user.save();
  
  return { message: "Déconnexion réussie." };
};