import { PrismaClient, UserRole, ContentStatus } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Create admin user
  const adminPassword = await bcrypt.hash('admin123', 12);
  const admin = await prisma.user.upsert({
    where: { email: 'admin@luxuryconst.com' },
    update: {},
    create: {
      name: 'مدیر سیستم',
      email: 'admin@luxuryconst.com',
      password: adminPassword,
      role: UserRole.admin,
    },
  });

  // Create editor
  const editorPassword = await bcrypt.hash('editor123', 12);
  await prisma.user.upsert({
    where: { email: 'editor@luxuryconst.com' },
    update: {},
    create: {
      name: 'ویرایشگر',
      email: 'editor@luxuryconst.com',
      password: editorPassword,
      role: UserRole.editor,
    },
  });

  // Create categories
  const categories = [
    { name: 'آشپزخانه', slug: 'kitchen', type: 'project' },
    { name: 'سرویس بهداشتی', slug: 'bathroom', type: 'project' },
    { name: 'کفپوش', slug: 'flooring', type: 'project' },
    { name: 'نقاشی', slug: 'painting', type: 'project' },
    { name: 'ویلا', slug: 'villa', type: 'project' },
    { name: 'آپارتمان', slug: 'apartment', type: 'project' },
    { name: 'تجاری', slug: 'commercial', type: 'project' },
    { name: 'اداری', slug: 'office', type: 'project' },
  ];

  for (const cat of categories) {
    await prisma.category.upsert({
      where: { slug: cat.slug },
      update: {},
      create: cat,
    });
  }

  // Create sample projects
  const projects = [
    {
      name: 'ویلا مدرن پارک',
      slug: 'villa-park-modern',
      category: 'ویلا',
      location: 'تهران - ولنجک',
      budget: '۵ میلیارد تومان',
      description: 'یک ویلا مدرن و لوکس در منطقه ولنجک تهران با چشم‌انداز پانوراما',
      features: ['استخر', 'جکوزی', 'سالن سینما', 'سیستم هوشمند'],
      status: ContentStatus.published,
    },
    {
      name: 'آپارتمان لوکس الهیه',
      slug: 'apartment-elahieh-luxury',
      category: 'آپارتمان',
      location: 'تهران - الهیه',
      budget: '۳ میلیارد تومان',
      description: 'بازسازی کامل یک آپارتمان ۲۰۰ متری در منطقه الهیه',
      features: ['طراحی مدرن', 'کفپوش پارکت', 'نورپردازی مخفی'],
      status: ContentStatus.published,
    },
    {
      name: 'آشپزخانه مدرن زعفرانیه',
      slug: 'kitchen-zafaranieh',
      category: 'آشپزخانه',
      location: 'تهران - زعفرانیه',
      budget: '۸۰۰ میلیون تومان',
      description: 'طراحی و اجرای آشپزخانه مدرن با جزیره مرکزی',
      features: ['جزیره مرکزی', 'کابینت مدرن', 'لوازم برقی هوشمند'],
      status: ContentStatus.published,
    },
  ];

  for (const project of projects) {
    await prisma.project.upsert({
      where: { slug: project.slug },
      update: {},
      create: {
        ...project,
        authorId: admin.id,
        gallery: [],
        beforeImages: [],
        progressImages: [],
        finalImages: [],
      },
    });
  }

  // Create testimonials
  const testimonials = [
    {
      name: 'دکتر احمدی',
      rating: 5,
      comment: 'بسیار حرفه‌ای و دقیق کار می‌کنند. نتیجه کار فراتر از انتظار ما بود.',
      status: ContentStatus.published,
    },
    {
      name: 'خانم مرادی',
      rating: 5,
      comment: 'تیم بسیار متعهد و خلاق. پروژه بازسازی آپارتمان ما را در زمان تعیین شده تحویل دادند.',
      status: ContentStatus.published,
    },
    {
      name: 'آقای رضایی',
      rating: 4,
      comment: 'کیفیت کار و دقت در جزییات فوق‌العاده است. حتماً به دوستانم توصیه خواهم کرد.',
      status: ContentStatus.published,
    },
  ];

  for (const testimonial of testimonials) {
    await prisma.testimonial.create({ data: testimonial });
  }

  // Create settings
  const settings = [
    { key: 'company_name', value: 'ساختمان‌سازی لوکس' },
    { key: 'company_slogan', value: 'معماری فردا، امروز ساخته می‌شود' },
    { key: 'company_phone', value: '۰۲۱-۱۲۳۴۵۶۷۸' },
    { key: 'company_email', value: 'info@luxuryconst.com' },
    { key: 'company_address', value: 'تهران، میدان ونک، خیابان ولیعصر، برج ایران زمین' },
  ];

  for (const setting of settings) {
    await prisma.setting.upsert({
      where: { key: setting.key },
      update: {},
      create: setting,
    });
  }

  console.log('✅ Database seeded successfully!');
  console.log('📧 Admin: admin@luxuryconst.com / admin123');
  console.log('📧 Editor: editor@luxuryconst.com / editor123');
}

main()
  .catch((e) => {
    console.error('❌ Seed error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
