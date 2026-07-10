import { Router } from 'express';
import { body } from 'express-validator';
import { handleValidation } from '../middleware/validate';
import { authenticate, authorize } from '../middleware/auth';
import * as authController from '../controllers/auth.controller';
import * as projectController from '../controllers/project.controller';
import * as serviceController from '../controllers/service.controller';
import * as blogController from '../controllers/blog.controller';
import * as contactController from '../controllers/contact.controller';
import { testimonials, categories, projects, services, blogPosts, contactRequests } from '../data/store';

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
router.get('/testimonials', (_req, res) => {
  const published = testimonials.filter(t => t.status === 'published');
  return res.json({ success: true, data: published });
});

// ===== Categories Routes =====
router.get('/categories', (_req, res) => {
  return res.json({ success: true, data: categories });
});

// ===== Dashboard Stats =====
router.get('/dashboard/stats', authenticate, authorize('admin'), (_req, res) => {
  return res.json({
    success: true,
    data: {
      totalProjects: projects.length,
      totalServices: services.length,
      totalBlogs: blogPosts.length,
      totalMessages: contactRequests.length,
      totalTestimonials: testimonials.length,
    },
  });
});

// ===== Search =====
router.get('/search', (req, res) => {
  const q = (req.query.q as string) || '';

  if (!q) {
    return res.json({ success: true, data: { projects: [], services: [], blogs: [] } });
  }

  const query = q.toLowerCase();
  
  const matchedProjects = projects
    .filter(p => 
      p.status === 'published' &&
      (p.name.includes(query) || p.description.includes(query) || p.category.includes(query))
    )
    .slice(0, 5)
    .map(p => ({ id: p.id, name: p.name, slug: p.slug, category: p.category }));

  const matchedServices = services
    .filter(s =>
      s.status === 'published' &&
      (s.title.includes(query) || s.description.includes(query))
    )
    .slice(0, 5)
    .map(s => ({ id: s.id, title: s.title, slug: s.slug }));

  const matchedBlogs = blogPosts
    .filter(b =>
      b.status === 'published' &&
      (b.title.includes(query) || b.content.includes(query))
    )
    .slice(0, 5)
    .map(b => ({ id: b.id, title: b.title, slug: b.slug, category: b.category }));

  return res.json({
    success: true,
    data: {
      projects: matchedProjects,
      services: matchedServices,
      blogs: matchedBlogs,
    },
  });
});

export default router;
