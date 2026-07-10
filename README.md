# 🏗️ Construction & Renovation Company Website

<div dir="rtl">

# وبسایت حرفه‌ای شرکت ساختمانی و بازسازی

یک وبسایت مدرن، لوکس و کاملاً حرفه‌ای برای شرکت‌های ساختمانی و بازسازی با قابلیت مدیریت کامل محتوا.

## ✨ ویژگی‌های اصلی

### 🎨 ظاهر و تجربه کاربری
- **طراحی لوکس و مدرن** با تم تیره و روشن
- **انیمیشن‌های سینماتیک** با Framer Motion و GSAP
- **پشتیبانی کامل از RTL** برای زبان فارسی
- **نوار ناوبری شیشه‌ای** با افکت محو
- **موس سفارشی** با افکت‌های مغناطیسی
- **صفحه بارگذاری سینماتیک**
- **کاملاً ریسپانسیو** برای موبایل، تبلت و دسکتاپ

### 📄 صفحات

| صفحه | توضیحات |
|------|---------|
| صفحه اصلی | هیرو با پارالاکس، آمار، خدمات، نمونه کارها، نظرات، سوالات متداول |
| خدمات | نمایش تمام خدمات با جزئیات کامل |
| نمونه کارها | گالری پروژه‌ها با فیلتر دسته‌بندی |
| وبلاگ | مقالات تخصصی با دسته‌بندی |
| درباره ما | داستان شرکت، تیم، ارزش‌ها |
| تماس با ما | فرم تماس، اطلاعات، نقشه، شبکه‌های اجتماعی |
| پنل مدیریت | داشبورد کامل مدیریت محتوا |

### ⚙️ بک‌اند
- **API کامل REST** با Express.js و TypeScript
- **احراز هویت JWT** با کوکی امن
- **پایگاه داده PostgreSQL** با Prisma ORM
- **سیستم نقش کاربری** (مدیر، ویرایشگر، مدیر پروژه)
- **مدیریت کامل محتوا** (پروژه‌ها، خدمات، وبلاگ، نظرات)
- **جستجوی پیشرفته**
- **محدودیت نرخ درخواست**

### 🔒 امنیت
- هدرهای امنیتی Helmet
- محدودیت نرخ درخواست (Rate Limiting)
- CORS پیکربندی شده
- رمزنگاری رمز عبور با bcrypt
- اعتبارسنجی ورودی‌ها
- حذف نرم (Soft Delete)

### 🚀 SEO و عملکرد
- متا تگ‌های پیشرفته
- Open Graph و Twitter Cards
- Schema.org ساختار داده
- Robots.txt و Sitemap
- Breadcrumbs
- بهینه‌سازی تصاویر
- SSR و ISR
- لای‌لودینگ
- نمره Lighthouse > 95

## 🛠 تکنولوژی‌ها

### فرانت‌اند
| تکنولوژی | کاربرد |
|-----------|--------|
| Next.js 15 | فریمورک React |
| TypeScript | نوع‌دهی ایستا |
| Tailwind CSS | استایل‌دهی |
| Framer Motion | انیمیشن‌ها |
| GSAP | انیمیشن‌های پیشرفته |
| Swiper.js | اسلایدرها |
| React Hook Form + Zod | فرم‌ها و اعتبارسنجی |
| Axios | درخواست‌های HTTP |
| React Icons | آیکون‌ها |

### بک‌اند
| تکنولوژی | کاربرد |
|-----------|--------|
| Node.js | محیط اجرا |
| Express.js | فریمورک وب |
| TypeScript | نوع‌دهی ایستا |
| Prisma ORM | مدیریت پایگاه داده |
| PostgreSQL | پایگاه داده |
| JWT | احراز هویت |
| Helmet | امنیت |
| Multer | آپلود فایل |

### استقرار
| تکنولوژی | کاربرد |
|-----------|--------|
| Docker | کانتینرسازی |
| Docker Compose | orchestration |
| Nginx | پروکسی معکوس |
| Vercel | استقرار فرانت‌اند |
| Railway/VPS | استقرار بک‌اند |

## 🚀 راهنمای نصب

### پیش‌نیازها
- Node.js 20+
- PostgreSQL 16+
- Docker (اختیاری)
- npm یا yarn

### نصب سریع (محلی)

```bash
# 1. کلون کردن پروژه
git clone https://github.com/yourusername/construction-website.git
cd construction-website

# 2. نصب وابستگی‌های فرانت‌اند
cd frontend
npm install

# 3. نصب وابستگی‌های بک‌اند
cd ../backend
npm install

# 4. تنظیم environment variables
cp .env .env.local
# فایل .env.local را با اطلاعات خود ویرایش کنید

# 5. راه‌اندازی پایگاه داده
npx prisma generate
npx prisma db push
npx prisma db seed

# 6. اجرا
# ترمینال ۱ - بک‌اند
cd backend
npm run dev

# ترمینال ۲ - فرانت‌اند
cd frontend
npm run dev
```

### نصب با Docker

```bash
# کلون کردن پروژه
git clone https://github.com/yourusername/construction-website.git
cd construction-website

# ساخت و اجرا
docker-compose up -d --build

# اجرای migration
docker-compose exec backend npx prisma db push
docker-compose exec backend npx prisma db seed
```

### متغیرهای محیطی

```env
# فایل backend/.env
PORT=5000
DATABASE_URL="postgresql://postgres:password@localhost:5432/construction_db"
JWT_SECRET="your-super-secret-key"
JWT_EXPIRES_IN="7d"
CORS_ORIGIN="http://localhost:3000"
NODE_ENV="development"

# فایل frontend/.env.local
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SITE_NAME=ساختمان‌سازی لوکس
```

## 📂 ساختار پروژه

```
construction-website/
├── frontend/                  # Next.js Frontend
│   ├── src/
│   │   ├── app/              # صفحات
│   │   │   ├── page.tsx      # صفحه اصلی
│   │   │   ├── about/        # درباره ما
│   │   │   ├── blog/         # وبلاگ
│   │   │   ├── contact/      # تماس
│   │   │   ├── portfolio/    # نمونه کارها
│   │   │   ├── services/     # خدمات
│   │   │   └── admin/        # پنل مدیریت
│   │   ├── components/       # کامپوننت‌ها
│   │   │   ├── animations/   # انیمیشن‌ها
│   │   │   ├── home/         # کامپوننت‌های صفحه اصلی
│   │   │   ├── layout/       # ناوبری و فوتر
│   │   │   └── ui/           # کامپوننت‌های عمومی
│   │   ├── contexts/         # React Contexts
│   │   ├── data/             # داده‌های استاتیک
│   │   ├── lib/              # ابزارها
│   │   └── types/            # انواع TypeScript
│   └── package.json
│
├── backend/                   # Express.js Backend
│   ├── src/
│   │   ├── config/           # تنظیمات
│   │   ├── controllers/      # کنترلرها
│   │   ├── middleware/       # میدلورها
│   │   ├── routes/           # مسیرها
│   │   └── utils/            # ابزارها
│   ├── prisma/
│   │   ├── schema.prisma     # مدل‌های پایگاه داده
│   │   └── seed.ts           # داده‌های اولیه
│   └── package.json
│
├── nginx/                     # تنظیمات Nginx
├── docker-compose.yml         # Docker Compose
└── README.md                  # این فایل
```

## 🔑 حساب‌های کاربری پیش‌فرض

| نقش | ایمیل | رمز عبور |
|-----|-------|----------|
| مدیر | admin@luxuryconst.com | admin123 |
| ویرایشگر | editor@luxuryconst.com | editor123 |

## 📡 API Endpoints

### احراز هویت
```
POST   /api/auth/register     ثبت نام
POST   /api/auth/login        ورود
GET    /api/auth/me           اطلاعات کاربر
POST   /api/auth/logout       خروج
```

### پروژه‌ها
```
GET    /api/projects          لیست پروژه‌ها
GET    /api/projects/:slug    جزئیات پروژه
POST   /api/projects          ایجاد پروژه (مدیر)
PUT    /api/projects/:id      ویرایش پروژه (مدیر)
DELETE /api/projects/:id      حذف پروژه (مدیر)
```

### خدمات
```
GET    /api/services          لیست خدمات
GET    /api/services/:slug    جزئیات سرویس
POST   /api/services          ایجاد سرویس (مدیر)
PUT    /api/services/:id      ویرایش سرویس (مدیر)
DELETE /api/services/:id      حذف سرویس (مدیر)
```

### وبلاگ
```
GET    /api/blog              لیست مطالب
GET    /api/blog/:slug        جزئیات مطلب
POST   /api/blog              ایجاد مطلب (مدیر)
PUT    /api/blog/:id          ویرایش مطلب (مدیر)
DELETE /api/blog/:id          حذف مطلب (مدیر)
```

### تماس
```
POST   /api/contact           ارسال پیام
GET    /api/contact           لیست پیام‌ها (مدیر)
PUT    /api/contact/:id/read  علامت خواندن (مدیر)
```

### سایر
```
GET    /api/testimonials      نظرات مشتریان
GET    /api/categories        دسته‌بندی‌ها
GET    /api/search?q=         جستجو
GET    /api/dashboard/stats   آمار داشبورد (مدیر)
```

## 🌐 استقرار در Vercel

### فرانت‌اند (Vercel)
```bash
vercel --prod
```

### بک‌اند (Railway/VPS)
```bash
docker build -t construction-api ./backend
docker run -p 5000:5000 construction-api
```

## 🎨 رنگ‌بندی

| رنگ | کد | کاربرد |
|-----|-----|--------|
| طلایی | `#F5A623` | اصلی |
| تیره | `#222222` | ثانویه |
| سفید | `#FFFFFF` | پس‌زمینه |
| مشکی | `#121212` | تیره |
| خاکستری | `#F6F6F6` | روشن |
| سبز | `#16A34A` | موفقیت |
| قرمز | `#EF4444` | خطر |

## 📝 مجوز

این پروژه تحت مجوز MIT منتشر شده است.

## 🤝 مشارکت

اگر مایل به مشارکت در این پروژه هستید، خوشحال می‌شویم Pull Request شما را ببینیم.

---

<div align="center">
  ساخته شده با ❤️ برای صنعت ساختمان ایران
</div>

</div>
