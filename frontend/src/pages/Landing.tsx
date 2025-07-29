import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Environment } from '@react-three/drei'
import { Aperture3D } from '@/components/Aperture3D'
import { 
  ArrowRight, 
  CheckCircle, 
  Star, 
  Zap, 
  Target, 
  TrendingUp, 
  Shield,
  Globe,
  Users,
  BarChart3,
  Play,
  Moon,
  Sun
} from 'lucide-react'
import { cn } from '@/lib/utils'



// Hero Section
function HeroSection({ isDarkMode }: { isDarkMode: boolean }) {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-secondary/10" />
      
      {/* 3D Aperture Animation */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-96 h-96 relative">
          <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} />
            <Environment preset="city" />
            <Aperture3D />
            <OrbitControls 
              enableZoom={false}
              enablePan={false}
              autoRotate
              autoRotateSpeed={0.5}
            />
          </Canvas>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent mb-6">
            Reclaim Organic Growth
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Even in the AI-First SERP Era
          </p>
          <p className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto">
            Aperture AI Engine forecasts visibility risks, uncovers content gaps, and deploys AI-optimized upgrades—so your pages win the click every time.
          </p>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn-primary text-lg px-8 py-4 flex items-center gap-2 mx-auto animate-pulse-glow"
          >
            Get Early Access
            <ArrowRight className="w-5 h-5" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}

// Problem Section
function ProblemSection() {
  const problems = [
    {
      icon: Target,
      title: "AI Overviews Cannibalize Clicks",
      description: "Most SEO suites still optimize for blue-link worlds, ignoring AI Overview takeover."
    },
    {
      icon: Globe,
      title: "Hidden Content Gaps",
      description: "Competitor gaps hide in PAA, Reddit threads, and AI snippets—manual audits miss them."
    },
    {
      icon: BarChart3,
      title: "Static Keyword Tools",
      description: "Ignore real-time scroll, dwell, and bounce signals that drive actual performance."
    },
    {
      icon: Users,
      title: "Wasted Time & Resources",
      description: "Marketers waste hours rewriting articles; results lag weeks behind publishing."
    }
  ]

  return (
    <section className="py-20 bg-muted/30">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-6">The SEO Reality Check</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Traditional SEO tools can't keep up with the AI-first search landscape
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {problems.map((problem, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="card hover:shadow-lg transition-all duration-300"
            >
              <problem.icon className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-3">{problem.title}</h3>
              <p className="text-muted-foreground">{problem.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Differentiators Section
function DifferentiatorsSection() {
  const features = [
    {
      icon: Zap,
      title: "AIO Risk Radar",
      description: "Pixel-level SERP snapshots score every query for AI-Overview takeover.",
      color: "text-blue-500"
    },
    {
      icon: Target,
      title: "Gap Miner",
      description: "Embedding engine contrasts your pages with AIO text + competitor content.",
      color: "text-green-500"
    },
    {
      icon: TrendingUp,
      title: "Auto-Augment Studio",
      description: "One-click blocks—FAQs, Myth vs Fact tables, dynamic visuals.",
      color: "text-purple-500"
    },
    {
      icon: BarChart3,
      title: "Behavior-aware Models",
      description: "Click & scroll propensity models fuse GA4 + Search Console data.",
      color: "text-orange-500"
    },
    {
      icon: Shield,
      title: "Granular Heatmaps",
      description: "Visibility risk heatmaps by query cluster, device, and brand vs. non-brand.",
      color: "text-red-500"
    },
    {
      icon: Globe,
      title: "Multi-channel Distribution",
      description: "Deploy to SERP, Perspectives, Reddit, Shorts, and measure lift.",
      color: "text-indigo-500"
    }
  ]

  return (
    <section className="py-20">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-6">The Aperture Advantage</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            AI-powered tools that actually understand the modern search landscape
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="card hover:shadow-xl transition-all duration-300"
            >
              <feature.icon className={cn("w-12 h-12 mb-4", feature.color)} />
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Testimonials Section
function TestimonialsSection() {
  const testimonials = [
    {
      quote: "+38% organic clicks in 30 days on AIO-heavy queries.",
      author: "Beta SaaS Customer",
      rating: 5
    },
    {
      quote: "Closed the gap on 12 high-value keywords without extra headcount.",
      author: "E-commerce Growth Lead",
      rating: 5
    }
  ]

  return (
    <section className="py-20 bg-muted/30">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-6">Proven Results</h2>
          <p className="text-xl text-muted-foreground">
            See what our early adopters are achieving
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="card"
            >
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <blockquote className="text-lg italic mb-4">
                "{testimonial.quote}"
              </blockquote>
              <cite className="text-sm text-muted-foreground">
                — {testimonial.author}
              </cite>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// CTA Section
function CTASection() {
  return (
    <section className="py-20">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl font-bold mb-6">
            Ready to future-proof your organic strategy?
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Join the AI-first SEO revolution
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-primary text-lg px-8 py-4 flex items-center gap-2"
            >
              <Play className="w-5 h-5" />
              Book a 15-min Demo
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-secondary text-lg px-8 py-4 flex items-center gap-2"
            >
              Get Early Access
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

// Footer
function Footer() {
  return (
    <footer className="bg-muted py-12">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Aperture AI</h3>
            <p className="text-muted-foreground">
              The AI-first SEO engine that predicts, fills, and outperforms.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Product</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li><a href="#" className="hover:text-foreground transition-colors">Features</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Pricing</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Documentation</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li><a href="#" className="hover:text-foreground transition-colors">About</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Status</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li><a href="#" className="hover:text-foreground transition-colors">24/7 Live Chat</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Help Center</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Contact</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            © 2024 Aperture AI. All rights reserved.
          </p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <span className="text-sm text-muted-foreground">GDPR & CCPA compliant</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

// Theme Toggle Component
function ThemeToggle({ isDarkMode, toggleTheme }: { isDarkMode: boolean; toggleTheme: () => void }) {
  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={toggleTheme}
      className="fixed top-6 right-6 z-50 p-3 rounded-full bg-card border shadow-lg"
    >
      <AnimatePresence mode="wait">
        {isDarkMode ? (
          <motion.div
            key="sun"
            initial={{ rotate: -90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: 90, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <Sun className="w-5 h-5" />
          </motion.div>
        ) : (
          <motion.div
            key="moon"
            initial={{ rotate: 90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: -90, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <Moon className="w-5 h-5" />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  )
}

export default function Landing() {
  const [isDarkMode, setIsDarkMode] = useState(false)

  useEffect(() => {
    const isDark = document.documentElement.classList.contains('dark')
    setIsDarkMode(isDark)
  }, [])

  const toggleTheme = () => {
    const newMode = !isDarkMode
    setIsDarkMode(newMode)
    document.documentElement.classList.toggle('dark')
  }

  return (
    <div className="min-h-screen">
      <ThemeToggle isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
      
      <HeroSection isDarkMode={isDarkMode} />
      <ProblemSection />
      <DifferentiatorsSection />
      <TestimonialsSection />
      <CTASection />
      <Footer />
    </div>
  )
} 