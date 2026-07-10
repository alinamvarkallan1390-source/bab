// ===== Unified Server - Backend API + Frontend =====
const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH');
  if (req.method === 'OPTIONS') return res.sendStatus(200);
  next();
});

// Security headers
app.use((req, res, next) => {
  res.header('X-Content-Type-Options', 'nosniff');
  res.header('X-Frame-Options', 'SAMEORIGIN');
  res.header('X-XSS-Protection', '1; mode=block');
  next();
});

// ===== API Routes =====
const backendPath = path.join(__dirname, 'backend', 'dist');
if (fs.existsSync(backendPath)) {
  // Load seed data
  const store = require('./backend/dist/data/store');
  store.seedData();

  // Mount all API routes
  const apiRoutes = require('./backend/dist/routes').default;
  app.use('/api', apiRoutes);

  // Health check
  app.get('/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
  });

  console.log('✅ Backend API loaded');
  console.log('📧 Admin: admin@luxuryconst.com / admin123');
} else {
  console.log('⚠️ Backend not built yet. Run: cd backend && npm install && npm run build');
  
  // Simple health check even without backend
  app.get('/health', (req, res) => {
    res.json({ status: 'ok', mode: 'frontend-only', timestamp: new Date().toISOString() });
  });
}

// ===== Serve Frontend (Next.js static export) =====
const frontendOut = path.join(__dirname, 'frontend', 'out');
if (fs.existsSync(frontendOut)) {
  // Serve static files
  app.use(express.static(frontendOut, {
    maxAge: '1y',
    setHeaders: (res, filePath) => {
      if (filePath.endsWith('.html')) {
        res.setHeader('Cache-Control', 'no-cache');
      }
    }
  }));

  // Client-side routing - serve index.html for all non-API routes
  app.get('*', (req, res) => {
    if (req.path.startsWith('/api/') || req.path === '/health') return;
    const indexPath = path.join(frontendOut, 'index.html');
    if (fs.existsSync(indexPath)) {
      res.sendFile(indexPath);
    } else {
      res.status(404).json({ error: 'صفحه مورد نظر یافت نشد' });
    }
  });

  console.log('✅ Frontend static files loaded');
} else {
  console.log('⚠️ Frontend not built yet. Run: cd frontend && npm install && npm run build');
  
  // Fallback
  app.get('*', (req, res) => {
    if (req.path.startsWith('/api/') || req.path === '/health') return;
    res.status(200).send(`
      <!DOCTYPE html>
      <html dir="rtl" lang="fa">
      <head><meta charset="UTF-8"><title>ساختمان‌سازی لوکس</title></head>
      <body style="font-family:system-ui;text-align:center;padding:50px;background:#121212;color:white">
        <h1 style="color:#F5A623">🏗️ ساختمان‌سازی لوکس</h1>
        <p>سرور در حال راه‌اندازی است...</p>
        <p>API: <a href="/api/projects" style="color:#F5A623">/api/projects</a></p>
        <p>Health: <a href="/health" style="color:#F5A623">/health</a></p>
      </body>
      </html>
    `);
  });
}

// Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`
  🏗️  ساختمان‌سازی لوکس - Unified Server
  ═════════════════════════════════════
  Port:       ${PORT}
  API:        http://0.0.0.0:${PORT}/api
  Frontend:   http://0.0.0.0:${PORT}
  Health:     http://0.0.0.0:${PORT}/health
  ═════════════════════════════════════
  `);
});
