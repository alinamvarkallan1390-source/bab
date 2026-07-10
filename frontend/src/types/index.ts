// ===== Project Types =====
export interface Project {
  id: string;
  name: string;
  slug: string;
  category: ProjectCategory;
  location: string;
  budget: string;
  completionDate: string;
  duration: string;
  description: string;
  gallery: string[];
  beforeImages: string[];
  progressImages: string[];
  finalImages: string[];
  video?: string;
  features: string[];
  customerReview?: CustomerReview;
  seo?: SEOData;
  status: 'draft' | 'published';
  createdAt: string;
  updatedAt: string;
}

export type ProjectCategory =
  | 'آشپزخانه'
  | 'سرویس بهداشتی'
  | 'کفپوش'
  | 'نقاشی'
  | 'سقف'
  | 'طراحی داخلی'
  | 'طراحی خارجی'
  | 'ویلا'
  | 'آپارتمان'
  | 'تجاری'
  | 'اداری'
  | 'سایر';

export interface CustomerReview {
  name: string;
  photo: string;
  rating: number;
  comment: string;
}

// ===== Service Types =====
export interface Service {
  id: string;
  title: string;
  slug: string;
  description: string;
  richContent: string;
  gallery: string[];
  mainImage: string;
  beforeAfterImages: string[];
  relatedProjects: string[];
  seo?: SEOData;
  status: 'draft' | 'published';
  createdAt: string;
  updatedAt: string;
}

// ===== Testimonial Types =====
export interface Testimonial {
  id: string;
  name: string;
  photo: string;
  rating: number;
  comment: string;
  projectId?: string;
  status: 'published' | 'hidden';
  createdAt: string;
}

// ===== Blog Types =====
export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  category: string;
  tags: string[];
  featuredImage: string;
  author: string;
  readingTime: number;
  seo?: SEOData;
  status: 'draft' | 'published';
  createdAt: string;
  updatedAt: string;
}

// ===== Team Types =====
export interface TeamMember {
  id: string;
  name: string;
  role: string;
  photo: string;
  bio: string;
  socialLinks: SocialLinks;
}

export interface SocialLinks {
  linkedin?: string;
  twitter?: string;
  instagram?: string;
}

// ===== SEO Types =====
export interface SEOData {
  title: string;
  description: string;
  keywords: string[];
  ogImage: string;
  ogTitle: string;
  ogDescription: string;
  canonical: string;
  schema?: object;
}

// ===== Contact Types =====
export interface ContactForm {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  projectType?: string;
  budget?: string;
  recaptchaToken?: string;
}

// ===== Company Info =====
export interface CompanyInfo {
  name: string;
  slogan: string;
  description: string;
  phone: string;
  email: string;
  whatsapp: string;
  telegram: string;
  instagram: string;
  address: string;
  workingHours: string;
  emergencyContact: string;
  mapLocation: { lat: number; lng: number };
  stats: CompanyStats;
}

export interface CompanyStats {
  yearsExperience: number;
  completedProjects: number;
  happyClients: number;
  citiesServed: number;
}

// ===== FAQ Types =====
export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
}

// ===== Navigation =====
export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

// ===== User Types =====
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'editor' | 'manager';
  avatar: string;
}

// ===== API Response =====
export interface APIResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// ===== Analytics =====
export interface Analytics {
  totalProjects: number;
  totalVisitors: number;
  totalMessages: number;
  conversionRate: number;
  trafficSources: TrafficSource[];
}

export interface TrafficSource {
  source: string;
  count: number;
  percentage: number;
}
