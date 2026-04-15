import Team from '../models/Team.js';

export const createTeam = async (teamData) => {
  return await Team.create(teamData);
};

export const getTeamsByTournament = async (tournamentId) => {
  return await Team.find({ tournament: tournamentId });
};

export const updateTeam = async (id, data) => {
  return await Team.findByIdAndUpdate(id, data, { new: true });
};

export const deleteTeam = async (id) => {
  return await Team.findByIdAndDelete(id);
};