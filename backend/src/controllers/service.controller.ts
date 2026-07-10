import { Response } from 'express';
import { AuthRequest } from '../middleware/auth';
import { services, generateId } from '../data/store';

export async function getServices(req: AuthRequest, res: Response) {
  try {
    const filtered = services.filter(s => s.status === 'published');
    return res.json({ success: true, data: filtered });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'خطای سرور' });
  }
}

export async function getService(req: AuthRequest, res: Response) {
  try {
    const { slug } = req.params;
    const service = services.find(s => s.slug === slug);
    if (!service) {
      return res.status(404).json({ success: false, message: 'سرویس یافت نشد' });
    }
    return res.json({ success: true, data: service });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'خطای سرور' });
  }
}

export async function createService(req: AuthRequest, res: Response) {
  try {
    const data = req.body;
    const service = {
      id: generateId(),
      title: data.title,
      slug: data.slug || data.title.replace(/\s+/g, '-'),
      description: data.description || '',
      richContent: data.richContent || '',
      gallery: data.gallery || [],
      mainImage: data.mainImage || '',
      beforeAfterImages: data.beforeAfterImages || [],
      status: data.status || 'draft',
      createdAt: new Date(),
    };
    services.push(service);
    return res.status(201).json({ success: true, data: service });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'خطا در ایجاد سرویس' });
  }
}

export async function updateService(req: AuthRequest, res: Response) {
  try {
    const { id } = req.params;
    const data = req.body;
    const index = services.findIndex(s => s.id === id);
    if (index === -1) {
      return res.status(404).json({ success: false, message: 'سرویس یافت نشد' });
    }
    services[index] = { ...services[index], ...data };
    return res.json({ success: true, data: services[index] });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'خطا در بروزرسانی سرویس' });
  }
}

export async function deleteService(req: AuthRequest, res: Response) {
  try {
    const { id } = req.params;
    const index = services.findIndex(s => s.id === id);
    if (index === -1) {
      return res.status(404).json({ success: false, message: 'سرویس یافت نشد' });
    }
    services.splice(index, 1);
    return res.json({ success: true, message: 'سرویس حذف شد' });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'خطا در حذف سرویس' });
  }
}
