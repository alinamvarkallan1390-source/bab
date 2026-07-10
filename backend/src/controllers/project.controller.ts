import { Response } from 'express';
import { AuthRequest } from '../middleware/auth';
import { projects, generateId } from '../data/store';

export async function getProjects(req: AuthRequest, res: Response) {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 12;
    const category = req.query.category as string;
    const status = req.query.status as string;

    let filtered = [...projects];
    
    if (category && category !== 'همه') {
      filtered = filtered.filter(p => p.category === category);
    }
    if (status) {
      filtered = filtered.filter(p => p.status === status);
    } else {
      filtered = filtered.filter(p => p.status === 'published');
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

export async function getProject(req: AuthRequest, res: Response) {
  try {
    const { slug } = req.params;
    const project = projects.find(p => p.slug === slug);
    if (!project) {
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
    const project = {
      id: generateId(),
      name: data.name,
      slug: data.slug || data.name.replace(/\s+/g, '-'),
      category: data.category || 'سایر',
      location: data.location || '',
      budget: data.budget || '',
      completionDate: data.completionDate || '',
      duration: data.duration || '',
      description: data.description || '',
      gallery: data.gallery || [],
      beforeImages: data.beforeImages || [],
      progressImages: data.progressImages || [],
      finalImages: data.finalImages || [],
      video: data.video || '',
      features: data.features || [],
      status: data.status || 'draft',
      seoTitle: data.seoTitle || '',
      seoDescription: data.seoDescription || '',
      seoKeywords: data.seoKeywords || [],
      customerReview: data.customerReview,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    projects.push(project);
    return res.status(201).json({ success: true, data: project });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'خطا در ایجاد پروژه' });
  }
}

export async function updateProject(req: AuthRequest, res: Response) {
  try {
    const { id } = req.params;
    const data = req.body;
    const index = projects.findIndex(p => p.id === id);
    if (index === -1) {
      return res.status(404).json({ success: false, message: 'پروژه یافت نشد' });
    }
    projects[index] = { ...projects[index], ...data, updatedAt: new Date() };
    return res.json({ success: true, data: projects[index] });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'خطا در بروزرسانی پروژه' });
  }
}

export async function deleteProject(req: AuthRequest, res: Response) {
  try {
    const { id } = req.params;
    const index = projects.findIndex(p => p.id === id);
    if (index === -1) {
      return res.status(404).json({ success: false, message: 'پروژه یافت نشد' });
    }
    projects.splice(index, 1);
    return res.json({ success: true, message: 'پروژه حذف شد' });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'خطا در حذف پروژه' });
  }
}
