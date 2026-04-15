import mongoose from "mongoose";

const teamSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    logo: { type: String },
    city: { type: String },
    tournament: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "Tournament", 
      required: true 
    },
    coach: { type: String }, 
    isActive: { type: Boolean, default: true }
  },
  { 
    timestamps: true,
    toJSON: { virtuals: true }
  }
);

// Index pour récupérer rapidement toutes les équipes d'un tournoi
teamSchema.index({ tournament: 1 });
teamSchema.index({ name: 1, tournament: 1 }, { unique: true }); // Empêche deux équipes d'avoir le même nom dans le MÊME tournoi

export default mongoose.model("Team", teamSchema);