import { Request, Response } from 'express';
import { contactRequests, generateId } from '../data/store';

export async function submitContact(req: Request, res: Response) {
  try {
    const { name, email, phone, subject, message, projectType, budget } = req.body;

    const contact = {
      id: generateId(),
      name,
      email,
      phone: phone || '',
      subject: subject || '',
      message,
      projectType: projectType || '',
      budget: budget || '',
      read: false,
      createdAt: new Date(),
    };
    contactRequests.push(contact);

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
    const total = contactRequests.length;
    const start = (page - 1) * limit;
    const paginated = [...contactRequests].reverse().slice(start, start + limit);

    return res.json({
      success: true,
      data: paginated,
      pagination: { page, limit, total, totalPages: Math.ceil(total / limit) },
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'خطای سرور' });
  }
}

export async function markAsRead(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const contact = contactRequests.find(c => c.id === id);
    if (!contact) {
      return res.status(404).json({ success: false, message: 'پیام یافت نشد' });
    }
    contact.read = true;
    return res.json({ success: true, message: 'پیام به عنوان خوانده شده علامت خورد' });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'خطای سرور' });
  }
}
