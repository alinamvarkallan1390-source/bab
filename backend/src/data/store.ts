// In-memory data store - No database required
// All data resets when server restarts

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  role: 'admin' | 'editor' | 'manager';
  avatar?: string;
  createdAt: Date;
}

export interface Project {
  id: string;
  name: string;
  slug: string;
  category: string;
  location?: string;
  budget?: string;
  completionDate?: string;
  duration?: string;
  description: string;
  gallery: string[];
  beforeImages: string[];
  progressImages: string[];
  finalImages: string[];
  video?: string;
  features: string[];
  status: 'published' | 'draft';
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords: string[];
  customerReview?: {
    name: string;
    rating: number;
    comment: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

export interface Service {
  id: string;
  title: string;
  slug: string;
  description: string;
  richContent?: string;
  gallery: string[];
  mainImage?: string;
  beforeAfterImages: string[];
  status: 'published' | 'draft';
  createdAt: Date;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt?: string;
  category?: string;
  tags: string[];
  featuredImage?: string;
  readingTime?: number;
  author: string;
  status: 'published' | 'draft';
  createdAt: Date;
}

export interface Testimonial {
  id: string;
  name: string;
  photo?: string;
  rating: number;
  comment: string;
  status: 'published' | 'hidden';
  createdAt: Date;
}

export interface ContactRequest {
  id: string;
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
  projectType?: string;
  budget?: string;
  read: boolean;
  createdAt: Date;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  type: string;
}

// In-memory storage
export const users: User[] = [];
export const projects: Project[] = [];
export const services: Service[] = [];
export const blogPosts: BlogPost[] = [];
export const testimonials: Testimonial[] = [];
export const contactRequests: ContactRequest[] = [];
export const categories: Category[] = [];

// Helper to generate IDs
let idCounter = 0;
export function generateId(): string {
  idCounter++;
  return `id_${Date.now()}_${idCounter}`;
}

// Seed initial data
export function seedData() {
  // Admin user (password: admin123)
  const bcrypt = require('bcryptjs');
  const adminPassword = bcrypt.hashSync('admin123', 12);
  const editorPassword = bcrypt.hashSync('editor123', 12);

  users.push(
    {
      id: generateId(),
      name: 'مدیر سیستم',
      email: 'admin@luxuryconst.com',
      password: adminPassword,
      role: 'admin',
      createdAt: new Date(),
    },
    {
      id: generateId(),
      name: 'ویرایشگر',
      email: 'editor@luxuryconst.com',
      password: editorPassword,
      role: 'editor',
      createdAt: new Date(),
    }
  );

  // Categories
  const catData = [
    { name: 'آشپزخانه', slug: 'kitchen', type: 'project' },
    { name: 'سرویس بهداشتی', slug: 'bathroom', type: 'project' },
    { name: 'کفپوش', slug: 'flooring', type: 'project' },
    { name: 'ویلا', slug: 'villa', type: 'project' },
    { name: 'آپارتمان', slug: 'apartment', type: 'project' },
    { name: 'تجاری', slug: 'commercial', type: 'project' },
    { name: 'اداری', slug: 'office', type: 'project' },
    { name: 'طراحی داخلی', slug: 'interior-design', type: 'blog' },
    { name: 'معماری', slug: 'architecture', type: 'blog' },
  ];
  catData.forEach(c => categories.push({ id: generateId(), ...c }));

  // Projects
  const projectData = [
    {
      name: 'ویلا مدرن پارک',
      slug: 'villa-park-modern',
      category: 'ویلا',
      location: 'تهران - ولنجک',
      budget: '۵ میلیارد تومان',
      completionDate: '۱۴۰۳',
      description: 'یک ویلا مدرن و لوکس در منطقه ولنجک تهران با چشم‌انداز پانوراما',
      features: ['استخر', 'جکوزی', 'سالن سینما', 'سیستم هوشمند'],
      customerReview: { name: 'دکتر احمدی', rating: 5, comment: 'بسیار حرفه‌ای و دقیق کار می‌کنند.' },
    },
    {
      name: 'آپارتمان لوکس الهیه',
      slug: 'apartment-elahieh-luxury',
      category: 'آپارتمان',
      location: 'تهران - الهیه',
      budget: '۳ میلیارد تومان',
      completionDate: '۱۴۰۳',
      description: 'بازسازی کامل یک آپارتمان ۲۰۰ متری در منطقه الهیه',
      features: ['طراحی مدرن', 'کفپوش پارکت', 'نورپردازی مخفی'],
    },
    {
      name: 'آشپزخانه مدرن زعفرانیه',
      slug: 'kitchen-zafaranieh',
      category: 'آشپزخانه',
      location: 'تهران - زعفرانیه',
      budget: '۸۰۰ میلیون تومان',
      completionDate: '۱۴۰۳',
      description: 'طراحی و اجرای آشپزخانه مدرن با جزیره مرکزی',
      features: ['جزیره مرکزی', 'کابینت مدرن', 'لوازم برقی هوشمند'],
    },
    {
      name: 'دفتر کار مدرن سعادت‌آباد',
      slug: 'modern-office-saadatabad',
      category: 'اداری',
      location: 'تهران - سعادت‌آباد',
      budget: '۲ میلیارد تومان',
      completionDate: '۱۴۰۲',
      description: 'طراحی و اجرای دفتر کار مدرن با فضای باز و خلاقانه',
      features: ['فضای باز', 'نورپردازی حرفه‌ای', 'مبلمان اداری مدرن'],
    },
    {
      name: 'بازسازی ساختمان تجاری میرداماد',
      slug: 'commercial-mirdamad',
      category: 'تجاری',
      location: 'تهران - میرداماد',
      budget: '۴ میلیارد تومان',
      completionDate: '۱۴۰۲',
      description: 'بازسازی کامل یک ساختمان تجاری ۵ طبقه',
      features: ['نمای مدرن', 'آسانسور', 'سیستم امنیتی'],
    },
    {
      name: 'سرویس بهداشتی لوکس نیاوران',
      slug: 'luxury-bathroom-niavaran',
      category: 'سرویس بهداشتی',
      location: 'تهران - نیاوران',
      budget: '۵۰۰ میلیون تومان',
      completionDate: '۱۴۰۳',
      description: 'طراحی و اجرای سرویس بهداشتی لوکس با متریال درجه یک',
      features: ['کاشی ایتالیایی', 'روشنایی مخفی', 'وان ایستاده'],
    },
  ];

  projectData.forEach(p => {
    projects.push({
      id: generateId(),
      ...p,
      gallery: [],
      beforeImages: [],
      progressImages: [],
      finalImages: [],
      features: p.features || [],
      status: 'published',
      seoKeywords: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  });

  // Services
  const serviceData = [
    { title: 'طراحی داخلی لوکس', slug: 'luxury-interior-design', description: 'طراحی داخلی منحصر به فرد با بالاترین استانداردهای جهانی', icon: '🏛️' },
    { title: 'بازسازی ساختمان', slug: 'building-renovation', description: 'بازسازی کامل ساختمان با جدیدترین متدهای روز دنیا', icon: '🔨' },
    { title: 'طراحی نمای مدرن', slug: 'modern-facade-design', description: 'طراحی و اجرای نمای ساختمان با سبک مدرن و مینیمال', icon: '🏗️' },
    { title: 'ساخت ویلا', slug: 'villa-construction', description: 'ساخت ویلاهای لوکس با معماری چشمگیر و چشم‌نواز', icon: '🌳' },
    { title: 'دکوراسیون داخلی', slug: 'interior-decorating', description: 'چیدمان و دکوراسیون حرفه‌ای فضاهای مسکونی و تجاری', icon: '🪑' },
    { title: 'نوسازی آشپزخانه', slug: 'kitchen-renovation', description: 'طراحی و اجرای آشپزخانه‌های مدرن و لوکس', icon: '🍳' },
  ];

  serviceData.forEach(s => {
    services.push({
      id: generateId(),
      ...s,
      gallery: [],
      beforeAfterImages: [],
      status: 'published',
      createdAt: new Date(),
    });
  });

  // Testimonials
  const testimonialData = [
    { name: 'دکتر احمدی', rating: 5, comment: 'بسیار حرفه‌ای و دقیق کار می‌کنند. نتیجه کار فراتر از انتظار ما بود. معماری مدرن و کیفیت اجرا عالی بود.' },
    { name: 'خانم مرادی', rating: 5, comment: 'تیم بسیار متعهد و خلاق. پروژه بازسازی آپارتمان ما را در زمان تعیین شده تحویل دادند. عالی بود.' },
    { name: 'آقای رضایی', rating: 4, comment: 'کیفیت کار و دقت در جزییات فوق‌العاده است. حتماً به دوستانم توصیه خواهم کرد.' },
    { name: 'مهندس کاظمی', rating: 5, comment: 'از همکاری با این مجموعه بسیار راضی هستم. طراحی ویلا ما به بهترین شکل انجام شد.' },
    { name: 'خانم محمدی', rating: 5, comment: 'طراحی داخلی فوق‌العاده‌ای انجام دادند. خانه ما را به یک اثر هنری تبدیل کردند.' },
  ];

  testimonialData.forEach(t => {
    testimonials.push({
      id: generateId(),
      ...t,
      status: 'published',
      createdAt: new Date(),
    });
  });

  // Blog posts
  const blogData = [
    {
      title: 'راهنمای کامل بازسازی خانه قدیمی',
      slug: 'complete-guide-old-house-renovation',
      content: 'بازسازی خانه قدیمی می‌تواند چالش‌برانگیز باشد. در این مقاله نکات مهم برای بازسازی موفق را بررسی می‌کنیم.\n\n## مراحل بازسازی\n\n۱. **بررسی سازه**: قبل از هر کاری باید سازه ساختمان را بررسی کنید.\n۲. **طراحی مجدد**: با یک معمار حرفه‌ای مشورت کنید.\n۳. **اخذ مجوز**: مجوزهای لازم را از شهرداری بگیرید.\n۴. **تخریب**: تخریب اصولی با رعایت نکات ایمنی.\n۵. **ساخت و ساز**: اجرای دقیق بر اساس نقشه‌ها.',
      excerpt: 'بازسازی خانه قدیمی می‌تواند چالش‌برانگیز باشد. در این مقاله نکات مهم برای بازسازی موفق را بررسی می‌کنیم.',
      category: 'بازسازی',
      tags: ['بازسازی', 'خانه قدیمی', 'نوسازی'],
      readingTime: 8,
    },
    {
      title: 'ترندهای طراحی داخلی ۲۰۲۴',
      slug: 'interior-design-trends-2024',
      content: 'با جدیدترین ترندهای طراحی داخلی آشنا شوید و خانه خود را مدرن کنید.\n\n## ترندهای برتر\n\n۱. **استفاده از مواد طبیعی**: چوب، سنگ و گیاهان طبیعی.\n۲. **رنگ‌های خاکی**: قهوه‌ای، کرم و سبز زیتونی.\n۳. **مینیمالیسم گرم**: ترکیب سادگی با گرما.\n۴. **نورپردازی لایه‌ای**: ترکیب نورهای مختلف برای ایجاد عمق.',
      excerpt: 'با جدیدترین ترندهای طراحی داخلی آشنا شوید و خانه خود را مدرن کنید.',
      category: 'طراحی داخلی',
      tags: ['طراحی داخلی', 'ترند', 'دکوراسیون'],
      readingTime: 6,
    },
    {
      title: 'انتخاب مصالح مناسب برای ساختمان',
      slug: 'choosing-right-materials',
      content: 'انتخاب مصالح با کیفیت یکی از مهمترین مراحل ساخت و ساز است.\n\n## نکات کلیدی\n\n۱. **کیفیت مصالح**: همیشه از مصالح با کیفیت استفاده کنید.\n۲. **مقاومت**: مصالح باید متناسب با شرایط آب و هوایی باشند.\n۳. **زیبایی**: ظاهر مصالح باید با معماری ساختمان هماهنگ باشد.',
      excerpt: 'انتخاب مصالح با کیفیت یکی از مهمترین مراحل ساخت و ساز است.',
      category: 'مصالح ساختمانی',
      tags: ['مصالح', 'ساختمان', 'کیفیت'],
      readingTime: 10,
    },
  ];

  blogData.forEach(b => {
    blogPosts.push({
      id: generateId(),
      ...b,
      featuredImage: '',
      author: 'مدیر سیستم',
      status: 'published',
      createdAt: new Date(),
    });
  });

  console.log('✅ Seed data loaded successfully!');
  console.log('📧 Admin: admin@luxuryconst.com / admin123');
  console.log('📧 Editor: editor@luxuryconst.com / editor123');
}
