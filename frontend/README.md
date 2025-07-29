# Aperture AI Engine - Frontend

A stunning, modern React frontend for the Aperture AI Engine with 3D animations, dark mode, and immersive user experience.

## ✨ Features

### 🎨 Design & UX
- **Stunning Landing Page** with 3D aperture animation
- **Dark/Light Mode** with smooth transitions
- **Framer Motion** animations and micro-interactions
- **Responsive Design** optimized for all devices
- **Glass-morphism** effects and modern UI patterns

### 🛠 Tech Stack
- **React 18** with TypeScript
- **Vite** for blazing-fast development
- **Tailwind CSS** with custom design system
- **Framer Motion** for animations
- **React Three Fiber** for 3D graphics
- **Lucide React** for icons
- **React Router** for navigation

### 🎯 Core Features
- **Landing Page** with hero section and value propositions
- **Dashboard** with analytics and metrics
- **Content Studio** for AI-powered content augmentation
- **SERP Crawler** for search result analysis
- **Risk Prediction** for AIO risk assessment
- **QA Registry** for human-in-the-loop review
- **Analytics** with data visualization

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Backend server running on port 8000

### Installation

1. **Clone and navigate to frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser:**
   ```
   http://localhost:3000
   ```

## 📁 Project Structure

```
frontend/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── Layout.tsx      # Main layout with sidebar
│   │   └── Aperture3D.tsx  # 3D aperture animation
│   ├── pages/              # Page components
│   │   ├── Landing.tsx     # Landing page
│   │   ├── Dashboard.tsx   # Dashboard
│   │   ├── ContentStudio.tsx
│   │   ├── SERPCrawler.tsx
│   │   ├── RiskPrediction.tsx
│   │   ├── QARegistry.tsx
│   │   └── Analytics.tsx
│   ├── services/           # API services
│   │   └── api.ts         # Backend API integration
│   ├── lib/               # Utilities
│   │   └── utils.ts       # Class name utilities
│   ├── styles/            # Global styles
│   └── main.tsx          # App entry point
├── public/               # Static assets
├── components.json       # ShadCN UI config
├── tailwind.config.js   # Tailwind configuration
├── vite.config.ts       # Vite configuration
└── package.json         # Dependencies
```

## 🎨 Design System

### Colors
- **Primary**: `#6366F1` (Indigo)
- **Secondary**: `#1E293B` (Slate)
- **Background**: `#F8FAFC` (Light) / `#0F172A` (Dark)
- **Text**: `#1E293B` (Light) / `#F8FAFC` (Dark)

### Typography
- **Font**: Inter (system fallback)
- **Weights**: 400, 500, 600, 700
- **Sizes**: Responsive scale from 14px to 72px

### Components
- **Cards**: Glass-morphism with subtle shadows
- **Buttons**: Gradient backgrounds with hover effects
- **Forms**: Clean inputs with focus states
- **Navigation**: Smooth transitions and active states

## 🌙 Dark Mode

The application supports automatic dark mode detection and manual toggle:

- **System Preference**: Automatically detects user's system preference
- **Manual Toggle**: Click the sun/moon icon in the top-right corner
- **Persistent**: Remembers user's choice across sessions

## 🎭 Animations

### Framer Motion
- **Page Transitions**: Smooth fade-in effects
- **Hover Effects**: Scale and color transitions
- **Loading States**: Skeleton screens and spinners
- **Micro-interactions**: Button clicks and form interactions

### 3D Graphics
- **Aperture Animation**: Rotating 3D model on landing page
- **Performance Optimized**: Lazy-loaded and lightweight
- **Fallback Support**: Graceful degradation for low-end devices

## 🔧 Development

### Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript checks
```

### Environment Variables

Create a `.env` file in the frontend directory:

```env
VITE_API_URL=http://localhost:8000
VITE_APP_NAME=Aperture AI Engine
```

### API Integration

The frontend connects to the backend API endpoints:

- `/api/augment` - Content augmentation
- `/api/predict-risk` - Risk prediction
- `/api/crawl-serp` - SERP crawling
- `/api/qa-review` - QA review submission

## 🚀 Deployment

### Vercel (Recommended)

1. **Connect your repository to Vercel**
2. **Set environment variables:**
   ```
   VITE_API_URL=https://your-backend-url.com
   ```
3. **Deploy automatically on push to main**

### Netlify

1. **Build command:** `npm run build`
2. **Publish directory:** `dist`
3. **Set environment variables in Netlify dashboard**

### Docker

```bash
# Build the image
docker build -t aperture-frontend .

# Run the container
docker run -p 3000:3000 aperture-frontend
```

## 📊 Performance

### Lighthouse Scores (Target)
- **Performance**: ≥95
- **Accessibility**: ≥95
- **Best Practices**: ≥95
- **SEO**: ≥95

### Optimization Features
- **Code Splitting**: Automatic route-based splitting
- **Lazy Loading**: Components and 3D assets
- **Image Optimization**: WebP format with fallbacks
- **Bundle Analysis**: Built-in Vite analyzer

## 🧪 Testing

```bash
# Run tests
npm test

# Run tests with coverage
npm run test:coverage

# Run tests in watch mode
npm run test:watch
```

## 🔒 Security

- **Content Security Policy**: Configured for 3D assets
- **HTTPS Only**: Production deployments
- **Input Sanitization**: All user inputs validated
- **API Security**: CORS configured for backend

## 🤝 Contributing

1. **Fork the repository**
2. **Create a feature branch:** `git checkout -b feature/amazing-feature`
3. **Commit your changes:** `git commit -m 'Add amazing feature'`
4. **Push to the branch:** `git push origin feature/amazing-feature`
5. **Open a Pull Request**

### Code Style

- **ESLint**: Configured with TypeScript rules
- **Prettier**: Automatic code formatting
- **Husky**: Pre-commit hooks for quality checks

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- **Documentation**: [docs.aperture-ai.com](https://docs.aperture-ai.com)
- **Issues**: [GitHub Issues](https://github.com/aperture-ai/frontend/issues)
- **Discord**: [Join our community](https://discord.gg/aperture-ai)

---

Built with ❤️ by the Aperture AI team 