import * as tournamentService from '../services/tournament.service.js';

export const create = async (req, res) => {
  try {
    const tournament = await tournamentService.createTournament(req.body);
    res.status(201).json(tournament);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const getAll = async (req, res) => {
  try {
    const tournaments = await tournamentService.getAllTournaments(req.query);
    res.status(200).json(tournaments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getOne = async (req, res) => {
  try {
    const tournament = await tournamentService.getTournamentById(req.params.id);
    res.status(200).json(tournament);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const update = async (req, res) => {
  try {
    const tournament = await tournamentService.updateTournament(req.params.id, req.body);
    res.status(200).json(tournament);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const remove = async (req, res) => {
  try {
    const result = await tournamentService.deleteTournament(req.params.id);
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};