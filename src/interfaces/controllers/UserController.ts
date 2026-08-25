import { Request, Response } from 'express';
import userService from '../../infrastructure/services/UserServiceImpl';

export const createUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: 'email and password are required' });
  const user = await userService.createUser({ email, password } as any);
  res.status(201).json(user);
};

export const getUserById = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const user = await userService.getUserById(id);
  if (!user) return res.status(404).json({ error: 'Not found' });
  res.json(user);
};

export const getUserByEmail = async (req: Request, res: Response) => {
  const raw = req.params.email;
  const email = Array.isArray(raw) ? raw[0] : raw;
  if (!email) return res.status(400).json({ error: 'email required' });
  const user = await userService.getUserByEmail(email);
  if (!user) return res.status(404).json({ error: 'Not found' });
  res.json(user);
};

export const updateUser = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const ok = await userService.updateUser(id, req.body);
  res.json({ success: ok });
};

export const deleteUser = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const ok = await userService.deleteUser(id);
  res.json({ success: ok });
};
