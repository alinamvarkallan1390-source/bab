import { Response } from 'express';
import prisma from '../utils/prisma';
import { AuthRequest } from '../middleware/auth';

export async function getPosts(req: AuthRequest, res: Response) {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 9;
    const category = req.query.category as string;

    const where: any = { status: 'published', deletedAt: null };
    if (category && category !== 'همه') where.category = category;

    const [posts, total] = await Promise.all([
      prisma.blogPost.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          author: { select: { id: true, name: true } },
        },
      }),
      prisma.blogPost.count({ where }),
    ]);

    return res.json({
      success: true,
      data: posts,
      pagination: {
        page, limit, total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'خطای سرور' });
  }
}

export async function getPost(req: AuthRequest, res: Response) {
  try {
    const { slug } = req.params;
    const post = await prisma.blogPost.findUnique({
      where: { slug },
      include: { author: { select: { id: true, name: true } } },
    });

    if (!post || post.deletedAt) {
      return res.status(404).json({ success: false, message: 'مطلب یافت نشد' });
    }

    return res.json({ success: true, data: post });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'خطای سرور' });
  }
}

export async function createPost(req: AuthRequest, res: Response) {
  try {
    const post = await prisma.blogPost.create({
      data: {
        ...req.body,
        authorId: req.user!.id,
        tags: req.body.tags || [],
        seoKeywords: req.body.seoKeywords || [],
      },
    });

    return res.status(201).json({ success: true, data: post });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'خطا در ایجاد مطلب' });
  }
}

export async function updatePost(req: AuthRequest, res: Response) {
  try {
    const { id } = req.params;
    const post = await prisma.blogPost.update({
      where: { id },
      data: req.body,
    });

    return res.json({ success: true, data: post });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'خطا در بروزرسانی مطلب' });
  }
}

export async function deletePost(req: AuthRequest, res: Response) {
  try {
    const { id } = req.params;
    await prisma.blogPost.update({
      where: { id },
      data: { deletedAt: new Date() },
    });

    return res.json({ success: true, message: 'مطلب حذف شد' });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'خطا در حذف مطلب' });
  }
}
