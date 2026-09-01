import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// JWT secret for verifying tokens
const SECRET: string = process.env.JWT_SECRET || 'change-this-secret';

export default function auth(req: Request, res: Response, next: NextFunction) {
  const h = req.header('authorization') || req.header('Authorization');
  if (!h) return res.status(401).json({ error: 'Authorization header required' });
  const parts = h.split(' ');
  if (parts.length !== 2 || parts[0] !== 'Bearer') return res.status(401).json({ error: 'Invalid authorization header' });
  const token = parts[1];
  if (!token) return res.status(401).json({ error: 'Invalid authorization header' });
  try {
    const payload = jwt.verify(token as string, SECRET) as any;
    (req as any).userId = payload.id;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid token' });
  }
}
