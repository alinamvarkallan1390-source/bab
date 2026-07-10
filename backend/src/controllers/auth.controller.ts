import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { config } from '../config';
import { AuthRequest } from '../middleware/auth';
import { users, generateId } from '../data/store';

function signToken(payload: object, secret: string, options: { expiresIn: string }): string {
  return (jwt as any).sign(payload, secret, options);
}

export async function register(req: Request, res: Response) {
  try {
    const { name, email, password } = req.body;

    const exists = users.find(u => u.email === email);
    if (exists) {
      return res.status(400).json({ success: false, message: 'این ایمیل قبلاً ثبت شده است' });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const user = {
      id: generateId(),
      name,
      email,
      password: hashedPassword,
      role: 'editor' as const,
      createdAt: new Date(),
    };
    users.push(user);

    const token = signToken(
      { id: user.id, email: user.email, role: user.role },
      config.jwtSecret,
      { expiresIn: config.jwtExpiresIn }
    );

    res.cookie('token', token, {
      httpOnly: true,
      secure: config.nodeEnv === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(201).json({
      success: true,
      data: { user: { id: user.id, name: user.name, email: user.email, role: user.role }, token }
    });
  } catch (error) {
    console.error('Register error:', error);
    return res.status(500).json({ success: false, message: 'خطای سرور' });
  }
}

export async function login(req: Request, res: Response) {
  try {
    const { email, password } = req.body;

    const user = users.find(u => u.email === email);
    if (!user) {
      return res.status(401).json({ success: false, message: 'ایمیل یا رمز عبور اشتباه است' });
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return res.status(401).json({ success: false, message: 'ایمیل یا رمز عبور اشتباه است' });
    }

    const token = signToken(
      { id: user.id, email: user.email, role: user.role },
      config.jwtSecret,
      { expiresIn: config.jwtExpiresIn }
    );

    res.cookie('token', token, {
      httpOnly: true,
      secure: config.nodeEnv === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.json({
      success: true,
      data: {
        user: { id: user.id, name: user.name, email: user.email, role: user.role },
        token,
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ success: false, message: 'خطای سرور' });
  }
}

export async function me(req: AuthRequest, res: Response) {
  try {
    const user = users.find(u => u.id === req.user?.id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'کاربر یافت نشد' });
    }
    return res.json({
      success: true,
      data: { id: user.id, name: user.name, email: user.email, role: user.role, avatar: user.avatar }
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'خطای سرور' });
  }
}

export async function logout(_req: Request, res: Response) {
  res.clearCookie('token');
  return res.json({ success: true, message: 'خروج موفقیت‌آمیز' });
}
