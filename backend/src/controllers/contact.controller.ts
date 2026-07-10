import { Request, Response } from 'express';
import prisma from '../utils/prisma';

export async function submitContact(req: Request, res: Response) {
  try {
    const { name, email, phone, subject, message, projectType, budget } = req.body;

    const contact = await prisma.contactRequest.create({
      data: { name, email, phone, subject, message, projectType, budget },
    });

    // TODO: Send email notification to admin
    // TODO: Send auto-reply to customer

    return res.status(201).json({
      success: true,
      message: 'پیام شما با موفقیت ارسال شد. در اسرع وقت با شما تماس خواهیم گرفت.',
      data: contact,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'خطا در ارسال پیام' });
  }
}

export async function getContactRequests(req: Request, res: Response) {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;

    const [requests, total] = await Promise.all([
      prisma.contactRequest.findMany({
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      prisma.contactRequest.count(),
    ]);

    return res.json({
      success: true,
      data: requests,
      pagination: { page, limit, total, totalPages: Math.ceil(total / limit) },
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'خطای سرور' });
  }
}

export async function markAsRead(req: Request, res: Response) {
  try {
    const { id } = req.params;
    await prisma.contactRequest.update({
      where: { id },
      data: { read: true },
    });

    return res.json({ success: true, message: 'پیام به عنوان خوانده شده علامت خورد' });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'خطای سرور' });
  }
}
