import { Request, Response } from 'express';
import userService from '../../infrastructure/services/UserServiceImpl';

export const createUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: 'email and password are required' });
  const user: any = await userService.createUser({ email, password } as any);
  const obj = user.toJSON ? (user.toJSON() as any) : (user as any);
  delete obj.password;
  res.status(201).json(obj);
};

export const getUserById = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const user: any = await userService.getUserById(id);
  if (!user) return res.status(404).json({ error: 'Not found' });
  const obj = user.toJSON ? (user.toJSON() as any) : (user as any);
  delete obj.password;
  res.json(obj);
};

export const getUserByEmail = async (req: Request, res: Response) => {
  const raw = req.params.email;
  const email = Array.isArray(raw) ? raw[0] : raw;
  if (!email) return res.status(400).json({ error: 'email required' });
  const user: any = await userService.getUserByEmail(email);
  if (!user) return res.status(404).json({ error: 'Not found' });
  const obj = user.toJSON ? (user.toJSON() as any) : (user as any);
  delete obj.password;
  res.json(obj);
};

// Retrieve user by username
export const getUserByUsername = async (req: Request, res: Response) => {
  const usuario = req.params.usuario;
  if (!usuario) return res.status(400).json({ error: 'usuario required' });
  const user: any = await (userService as any).getUserByUsername(usuario);
  if (!user) return res.status(404).json({ error: 'Not found' });
  const obj = user.toJSON ? (user.toJSON() as any) : (user as any);
  delete obj.password;
  res.json(obj);
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

export const updatePassword = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const { currentPassword, newPassword } = req.body;
  if (!currentPassword || !newPassword) return res.status(400).json({ error: 'currentPassword and newPassword required' });
  const ok = await (userService as any).changePassword(id, currentPassword, newPassword);
  if (!ok) return res.status(400).json({ error: 'current password incorrect or update failed' });
  res.json({ success: true });
};
