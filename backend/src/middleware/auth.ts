import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { config } from '../config';

export interface AuthRequest extends Request {
  user?: {
    id: string;
    email: string;
    role: string;
    name?: string;
  };
}

function verifyToken(token: string, secret: string): any {
  return (jwt as any).verify(token, secret);
}

export function authenticate(req: AuthRequest, res: Response, next: NextFunction) {
  const token = req.cookies?.token || req.headers.authorization?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ success: false, message: 'لطفا وارد حساب کاربری خود شوید' });
  }

  try {
    const decoded = verifyToken(token, config.jwtSecret) as { id: string; email: string; role: string; name?: string };
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: 'توکن نامعتبر است' });
  }
}

export function authorize(...roles: string[]) {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ success: false, message: 'شما مجوز دسترسی به این بخش را ندارید' });
    }
    next();
  };
}
