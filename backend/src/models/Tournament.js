import mongoose from "mongoose";

const tournamentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    logo: { type: String },
    description: { type: String },
    type: {
      type: String,
      enum: ["league", "knockout"],
      required: true,
    },
    status: {
      type: String,
      enum: ["planned", "ongoing", "completed", "cancelled"],
      default: "planned",
    },
    modeMatch: {
      type: String,
      enum: ["aller-retour", "simple"],
      default: "simple",
    },
    category: { type: String, default: "football" },
    country: { type: String },
    startDate: { type: Date },
    endDate: { type: Date },
    manager: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    isActive: { type: Boolean, default: true },
    settings: {
      gameDuration: { type: Number, default: 90 },
      teamsCount: { type: Number },
      matchCount: { type: Number }
    },
  },
  { 
    timestamps: true,
    // Configuration de la conversion JSON
    toJSON: {
      virtuals: true,
      transform: (doc, ret) => {
        delete ret.__v; // Supprime le champ de version de MongoDB
        return ret;
      }
    }
  },
);

// --- INDEXATION ---
// Index simple pour les recherches fréquentes par nom ou pays
tournamentSchema.index({ name: 1 });
tournamentSchema.index({ country: 1 });

// Index composé pour filtrer rapidement les tournois actifs par statut (très utile pour l'accueil)
tournamentSchema.index({ isActive: 1, status: 1 });

// Index pour les recherches par date (utile pour les calendriers)
tournamentSchema.index({ startDate: 1 });

// Index sur le manager pour afficher "Mes tournois" rapidement
tournamentSchema.index({ manager: 1 });

export default mongoose.model("Tournament", tournamentSchema);