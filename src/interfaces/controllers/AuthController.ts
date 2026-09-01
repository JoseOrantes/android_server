import { Request, Response } from 'express';
import userService from '../../infrastructure/services/UserServiceImpl';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// Secret used to sign JWTs
const SECRET: string = process.env.JWT_SECRET || 'change-this-secret';

export const login = async (req: Request, res: Response) => {
  const { email, password, usuario } = req.body;
  const identifier = email || usuario;
  if (!identifier || !password) return res.status(400).json({ error: 'usuario/email and password required' });
  const user = await userService.getUserByEmail(identifier);
  if (!user) return res.status(401).json({ error: 'invalid credentials' });
  const ok = await bcrypt.compare(password, (user as any).password);
  if (!ok) return res.status(401).json({ error: 'invalid credentials' });
  const token = jwt.sign({ id: (user as any).id_user }, SECRET, { expiresIn: '1h' });
  const userObj = user.toJSON ? (user.toJSON() as any) : (user as any);
  delete userObj.password;
  return res.json({
    standardResponse: { httpCode: 200, message: 'Login exitoso' },
    body: { token, user: { id: userObj.id_user || userObj.id, email: userObj.email } }
  });
};
