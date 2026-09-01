import { Request, Response } from 'express';
import profileService from '../../infrastructure/services/ProfileService';

// Controller for profile endpoints
// Returns profile data in standardResponse envelope
export const getProfile = async (req: Request, res: Response) => {
  const userId = Number(req.params.id);
  const profile = await profileService.getProfileByUserId(userId);
  if (!profile) return res.status(404).json({ standardResponse: { httpCode: 404, message: 'Perfil no encontrado' } });
  return res.json({ standardResponse: { httpCode: 200, message: 'Perfil encontrado' }, body: profile });
};

export const createProfile = async (req: Request, res: Response) => {
  const userId = Number(req.params.id);
  const data = req.body;
  const profile = await profileService.createProfile(userId, data);
  return res.status(201).json({ standardResponse: { httpCode: 201, message: 'Perfil creado exitosamente' }, body: profile });
};

export const updateProfile = async (req: Request, res: Response) => {
  const userId = Number(req.params.id);
  const data = req.body;
  const ok = await profileService.updateProfile(userId, data);
  if (!ok) return res.status(404).json({ standardResponse: { httpCode: 404, message: 'Perfil no encontrado' } });
  const profile = await profileService.getProfileByUserId(userId);
  return res.json({ standardResponse: { httpCode: 200, message: 'Perfil actualizado exitosamente' }, body: profile });
};

export default {};
