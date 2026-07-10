import { Response } from 'express';
import prisma from '../utils/prisma';
import { AuthRequest } from '../middleware/auth';

export async function getProjects(req: AuthRequest, res: Response) {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 12;
    const category = req.query.category as string;
    const status = req.query.status as string;

    const where: any = { deletedAt: null };
    if (category && category !== 'همه') where.category = category;
    if (status) where.status = status;
    else where.status = 'published';

    const [projects, total] = await Promise.all([
      prisma.project.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          customerReview: true,
          author: { select: { id: true, name: true } },
        },
      }),
      prisma.project.count({ where }),
    ]);

    return res.json({
      success: true,
      data: projects,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Get projects error:', error);
    return res.status(500).json({ success: false, message: 'خطای سرور' });
  }
}

export async function getProject(req: AuthRequest, res: Response) {
  try {
    const { slug } = req.params;
    const project = await prisma.project.findUnique({
      where: { slug },
      include: {
        customerReview: true,
        services: { include: { service: true } },
        author: { select: { id: true, name: true } },
      },
    });

    if (!project || project.deletedAt) {
      return res.status(404).json({ success: false, message: 'پروژه یافت نشد' });
    }

    return res.json({ success: true, data: project });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'خطای سرور' });
  }
}

export async function createProject(req: AuthRequest, res: Response) {
  try {
    const data = req.body;
    const project = await prisma.project.create({
      data: {
        ...data,
        authorId: req.user!.id,
        gallery: data.gallery || [],
        beforeImages: data.beforeImages || [],
        progressImages: data.progressImages || [],
        finalImages: data.finalImages || [],
        features: data.features || [],
        seoKeywords: data.seoKeywords || [],
      },
    });

    return res.status(201).json({ success: true, data: project });
  } catch (error) {
    console.error('Create project error:', error);
    return res.status(500).json({ success: false, message: 'خطا در ایجاد پروژه' });
  }
}

export async function updateProject(req: AuthRequest, res: Response) {
  try {
    const { id } = req.params;
    const data = req.body;

    const project = await prisma.project.update({
      where: { id },
      data,
    });

    return res.json({ success: true, data: project });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'خطا در بروزرسانی پروژه' });
  }
}

export async function deleteProject(req: AuthRequest, res: Response) {
  try {
    const { id } = req.params;
    await prisma.project.update({
      where: { id },
      data: { deletedAt: new Date() },
    });

    return res.json({ success: true, message: 'پروژه حذف شد' });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'خطا در حذف پروژه' });
  }
}
