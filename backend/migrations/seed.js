import mongoose from 'mongoose';
import Role from '../src/models/Role.js';
import User from '../src/models/User.js';
import dotenv from 'dotenv';

dotenv.config();

const seed = async () => {
  try {
    console.log("⏳ Connexion à MongoDB...");
    await mongoose.connect(process.env.MONGO_URL, { dbName: process.env.DB_NAME });
    console.log("🔗 Connecté !");

    // 1. Nettoyage (Optionnel mais propre pour repartir à zéro)
    await Role.deleteMany({});
    await User.deleteMany({});


    const rolesData = [
      { name: 'super-admin', level: 2, description: 'Accès total' },
      { name: 'gestionnaire', level: 1, description: 'Gère ses propres tournois' },
      { name: 'user', level: 0, description: 'Utilisateur final' }
    ];
    
    const createdRoles = await Role.insertMany(rolesData);
    console.log("✅ Rôles insérés !");


    const adminRole = createdRoles.find(r => r.name === 'super-admin');


    const adminUser = new User({
      lastName: "Goat",
      firstName: "Devs",
      username: "admin_general",
      email: "admin@lls.com",
      password: "Admin123!", 
      role: adminRole._id,
      isActive: true
    });

    await adminUser.save();
    console.log("🚀 Super-Admin inséré avec succès !");

  } catch (err) {
    console.error("❌ Erreur durant le seeding :", err);
  } finally {
    // On ne ferme la connexion que quand TOUT est fini
    await mongoose.disconnect();
    console.log("🔌 Déconnecté de MongoDB.");
    process.exit();
  }
};

seed();