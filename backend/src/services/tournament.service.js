import mongoose from 'mongoose';
import Tournament from '../models/Tournament.js';

export const createTournament = async (data) => {
  return await Tournament.create(data);
};

export const getAllTournaments = async (filters = {}) => {
  return await Tournament.find(filters).populate({
    path: 'manager',
    select: 'lastName firstName email' 
  });
};

export const getTournamentById = async (id) => {
  const tournament = await Tournament.findById(id).populate('manager', 'lastName firstName');
  if (!tournament) throw new Error("Tournoi non trouvé.");
  return tournament;
};

export const updateTournament = async (id, updateData) => {
  const tournament = await Tournament.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true,
  });
  if (!tournament) throw new Error("Impossible de mettre à jour : tournoi inexistant.");
  return tournament;
};

export const deleteTournament = async (id) => {
  const tournament = await Tournament.findByIdAndDelete(id);
  if (!tournament) throw new Error("Impossible de supprimer : tournoi inexistant.");
  return { message: "Tournoi supprimé avec succès." };
};