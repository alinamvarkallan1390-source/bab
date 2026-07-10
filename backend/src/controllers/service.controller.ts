import { Response } from 'express';
import prisma from '../utils/prisma';
import { AuthRequest } from '../middleware/auth';

export async function getServices(req: AuthRequest, res: Response) {
  try {
    const services = await prisma.service.findMany({
      where: { status: 'published', deletedAt: null },
      include: {
        projects: {
          include: { project: { select: { id: true, name: true, slug: true } } },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    return res.json({ success: true, data: services });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'خطای سرور' });
  }
}

export async function getService(req: AuthRequest, res: Response) {
  try {
    const { slug } = req.params;
    const service = await prisma.service.findUnique({
      where: { slug },
      include: {
        projects: {
          include: { project: true },
        },
      },
    });

    if (!service || service.deletedAt) {
      return res.status(404).json({ success: false, message: 'سرویس یافت نشد' });
    }

    return res.json({ success: true, data: service });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'خطای سرور' });
  }
}

export async function createService(req: AuthRequest, res: Response) {
  try {
    const service = await prisma.service.create({
      data: {
        ...req.body,
        gallery: req.body.gallery || [],
        beforeAfterImages: req.body.beforeAfterImages || [],
        seoKeywords: req.body.seoKeywords || [],
      },
    });

    return res.status(201).json({ success: true, data: service });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'خطا در ایجاد سرویس' });
  }
}

export async function updateService(req: AuthRequest, res: Response) {
  try {
    const { id } = req.params;
    const service = await prisma.service.update({
      where: { id },
      data: req.body,
    });

    return res.json({ success: true, data: service });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'خطا در بروزرسانی سرویس' });
  }
}

export async function deleteService(req: AuthRequest, res: Response) {
  try {
    const { id } = req.params;
    await prisma.service.update({
      where: { id },
      data: { deletedAt: new Date() },
    });

    return res.json({ success: true, message: 'سرویس حذف شد' });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'خطا در حذف سرویس' });
  }
}
