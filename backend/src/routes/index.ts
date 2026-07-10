import { Router } from 'express';
import { body } from 'express-validator';
import { handleValidation } from '../middleware/validate';
import { authenticate, authorize } from '../middleware/auth';
import * as authController from '../controllers/auth.controller';
import * as projectController from '../controllers/project.controller';
import * as serviceController from '../controllers/service.controller';
import * as blogController from '../controllers/blog.controller';
import * as contactController from '../controllers/contact.controller';

const router = Router();

// ===== Auth Routes =====
router.post(
  '/auth/register',
  [
    body('name').notEmpty().withMessage('نام الزامی است'),
    body('email').isEmail().withMessage('ایمیل معتبر نیست'),
    body('password').isLength({ min: 6 }).withMessage('رمز عبور حداقل ۶ کاراکتر'),
  ],
  handleValidation,
  authController.register
);

router.post(
  '/auth/login',
  [
    body('email').isEmail().withMessage('ایمیل معتبر نیست'),
    body('password').notEmpty().withMessage('رمز عبور الزامی است'),
  ],
  handleValidation,
  authController.login
);

router.get('/auth/me', authenticate, authController.me);
router.post('/auth/logout', authController.logout);

// ===== Project Routes =====
router.get('/projects', projectController.getProjects);
router.get('/projects/:slug', projectController.getProject);
router.post('/projects', authenticate, authorize('admin', 'editor'), projectController.createProject);
router.put('/projects/:id', authenticate, authorize('admin', 'editor'), projectController.updateProject);
router.delete('/projects/:id', authenticate, authorize('admin'), projectController.deleteProject);

// ===== Service Routes =====
router.get('/services', serviceController.getServices);
router.get('/services/:slug', serviceController.getService);
router.post('/services', authenticate, authorize('admin', 'editor'), serviceController.createService);
router.put('/services/:id', authenticate, authorize('admin', 'editor'), serviceController.updateService);
router.delete('/services/:id', authenticate, authorize('admin'), serviceController.deleteService);

// ===== Blog Routes =====
router.get('/blog', blogController.getPosts);
router.get('/blog/:slug', blogController.getPost);
router.post('/blog', authenticate, authorize('admin', 'editor'), blogController.createPost);
router.put('/blog/:id', authenticate, authorize('admin', 'editor'), blogController.updatePost);
router.delete('/blog/:id', authenticate, authorize('admin'), blogController.deletePost);

// ===== Contact Routes =====
router.post(
  '/contact',
  [
    body('name').notEmpty().withMessage('نام الزامی است'),
    body('email').isEmail().withMessage('ایمیل معتبر نیست'),
    body('message').notEmpty().withMessage('پیام الزامی است'),
  ],
  handleValidation,
  contactController.submitContact
);
router.get('/contact', authenticate, authorize('admin'), contactController.getContactRequests);
router.put('/contact/:id/read', authenticate, authorize('admin'), contactController.markAsRead);

// ===== Testimonial Routes =====
router.get('/testimonials', async (_req, res) => {
  const prisma = (await import('../utils/prisma')).default;
  const testimonials = await prisma.testimonial.findMany({
    where: { status: 'published' },
    orderBy: { createdAt: 'desc' },
  });
  return res.json({ success: true, data: testimonials });
});

// ===== Categories Routes =====
router.get('/categories', async (_req, res) => {
  const prisma = (await import('../utils/prisma')).default;
  const categories = await prisma.category.findMany({
    orderBy: { name: 'asc' },
  });
  return res.json({ success: true, data: categories });
});

// ===== Dashboard Stats =====
router.get('/dashboard/stats', authenticate, authorize('admin'), async (_req, res) => {
  const prisma = (await import('../utils/prisma')).default;
  
  const [totalProjects, totalServices, totalBlogs, totalMessages, totalTestimonials] = 
    await Promise.all([
      prisma.project.count({ where: { deletedAt: null } }),
      prisma.service.count({ where: { deletedAt: null } }),
      prisma.blogPost.count({ where: { deletedAt: null } }),
      prisma.contactRequest.count(),
      prisma.testimonial.count(),
    ]);

  return res.json({
    success: true,
    data: {
      totalProjects,
      totalServices,
      totalBlogs,
      totalMessages,
      totalTestimonials,
    },
  });
});

// ===== Search =====
router.get('/search', async (req, res) => {
  const prisma = (await import('../utils/prisma')).default;
  const q = (req.query.q as string) || '';

  if (!q) {
    return res.json({ success: true, data: { projects: [], services: [], blogs: [] } });
  }

  const [projects, services, blogs] = await Promise.all([
    prisma.project.findMany({
      where: {
        status: 'published',
        deletedAt: null,
        OR: [
          { name: { contains: q } },
          { description: { contains: q } },
          { category: { contains: q } },
        ],
      },
      take: 5,
      select: { id: true, name: true, slug: true, category: true },
    }),
    prisma.service.findMany({
      where: {
        status: 'published',
        deletedAt: null,
        OR: [
          { title: { contains: q } },
          { description: { contains: q } },
        ],
      },
      take: 5,
      select: { id: true, title: true, slug: true },
    }),
    prisma.blogPost.findMany({
      where: {
        status: 'published',
        deletedAt: null,
        OR: [
          { title: { contains: q } },
          { content: { contains: q } },
        ],
      },
      take: 5,
      select: { id: true, title: true, slug: true, category: true },
    }),
  ]);

  return res.json({
    success: true,
    data: { projects, services, blogs },
  });
});

export default router;
