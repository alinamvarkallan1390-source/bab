import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';

export function handleValidation(req: Request, res: Response, next: NextFunction) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'خطا در اعتبارسنجی',
      errors: errors.array().map((e: any) => ({
        field: e.path,
        message: e.msg,
      })),
    });
  }
  next();
}
