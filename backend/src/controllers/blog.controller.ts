import { Response } from 'express';
import { AuthRequest } from '../middleware/auth';
import { blogPosts, generateId } from '../data/store';

export async function getPosts(req: AuthRequest, res: Response) {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 9;
    const category = req.query.category as string;

    let filtered = blogPosts.filter(p => p.status === 'published');
    if (category && category !== 'همه') {
      filtered = filtered.filter(p => p.category === category);
    }

    const total = filtered.length;
    const totalPages = Math.ceil(total / limit);
    const start = (page - 1) * limit;
    const paginated = filtered.slice(start, start + limit);

    return res.json({
      success: true,
      data: paginated,
      pagination: { page, limit, total, totalPages },
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'خطای سرور' });
  }
}

export async function getPost(req: AuthRequest, res: Response) {
  try {
    const { slug } = req.params;
    const post = blogPosts.find(p => p.slug === slug);
    if (!post) {
      return res.status(404).json({ success: false, message: 'مطلب یافت نشد' });
    }
    return res.json({ success: true, data: post });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'خطای سرور' });
  }
}

export async function createPost(req: AuthRequest, res: Response) {
  try {
    const data = req.body;
    const post = {
      id: generateId(),
      title: data.title,
      slug: data.slug || data.title.replace(/\s+/g, '-'),
      content: data.content || '',
      excerpt: data.excerpt || '',
      category: data.category || '',
      tags: data.tags || [],
      featuredImage: data.featuredImage || '',
      readingTime: data.readingTime || Math.ceil((data.content || '').length / 1000),
      author: 'مدیر سیستم',
      status: data.status || 'draft',
      createdAt: new Date(),
    };
    blogPosts.push(post);
    return res.status(201).json({ success: true, data: post });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'خطا در ایجاد مطلب' });
  }
}

export async function updatePost(req: AuthRequest, res: Response) {
  try {
    const { id } = req.params;
    const data = req.body;
    const index = blogPosts.findIndex(p => p.id === id);
    if (index === -1) {
      return res.status(404).json({ success: false, message: 'مطلب یافت نشد' });
    }
    blogPosts[index] = { ...blogPosts[index], ...data };
    return res.json({ success: true, data: blogPosts[index] });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'خطا در بروزرسانی مطلب' });
  }
}

export async function deletePost(req: AuthRequest, res: Response) {
  try {
    const { id } = req.params;
    const index = blogPosts.findIndex(p => p.id === id);
    if (index === -1) {
      return res.status(404).json({ success: false, message: 'مطلب یافت نشد' });
    }
    blogPosts.splice(index, 1);
    return res.json({ success: true, message: 'مطلب حذف شد' });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'خطا در حذف مطلب' });
  }
}
