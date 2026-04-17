import * as teamService from '../services/team.service.js';

export const create = async (req, res) => {
  try {
    const team = await teamService.createTeam(req.body);
    res.status(201).json(team);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const getByTournament = async (req, res) => {
  try {
    const teams = await teamService.getTeamsByTournament(req.params.tournamentId);
    res.status(200).json(teams);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

