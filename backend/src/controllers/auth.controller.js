import * as authService from '../services/auth.service.js';


export const login = async (req, res) => {
  try {
    const result = await authService.login(req.body.email, req.body.password);
    res.json(result);
  } catch (err) {
    res.status(401).json({ message: err.message });
  }
};

export const registerGestionnaire = async (req, res) => {
  try {
    req.body.roleName = 'gestionnaire';
    const user = await authService.createUser(req.body, req.user.role);
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const registerUser = async (req, res) => {
  try {
    req.body.roleName = 'user';
    const user = await authService.createUser(req.body, 'user');
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

export const logout = async (req, res) => {
  try {
    const result = await authService.logout(req.user.id, req.token);
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};