import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Activity, Shield, Pill, FileText, ArrowRight, Bot, Heart, Brain, Zap } from 'lucide-react';
import logo from '@/assets/logo.png';

const features = [
  { icon: Brain, title: 'AI Symptom Analysis', desc: 'Describe symptoms and get AI-powered disease predictions with risk levels.', color: 'text-primary' },
  { icon: Pill, title: 'Drug Interaction Check', desc: 'Detect dangerous medicine combinations before they cause harm.', color: 'text-secondary' },
  { icon: Shield, title: 'Health Risk Alerts', desc: 'Receive early warnings about potential health risks based on your data.', color: 'text-accent' },
  { icon: FileText, title: 'Smart Health Reports', desc: 'Generate comprehensive health reports with recommendations.', color: 'text-primary' },
  { icon: Bot, title: 'AI Health Copilot', desc: 'Chat with an intelligent assistant for health guidance anytime.', color: 'text-secondary' },
  { icon: Activity, title: 'Health Dashboard', desc: 'Track your symptom history, alerts, and health trends over time.', color: 'text-accent' },
];

const steps = [
  { num: '01', title: 'Enter Symptoms', desc: 'Describe what you are feeling — fever, headache, fatigue, etc.' },
  { num: '02', title: 'AI Analysis', desc: 'Our ML model analyzes your symptoms and predicts possible conditions.' },
  { num: '03', title: 'Check Medicines', desc: 'Add your current medications to detect dangerous interactions.' },
  { num: '04', title: 'Get Your Report', desc: 'Receive a structured health report with risk levels and recommendations.' },
];

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] },
};

const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Navbar */}
      <nav className="h-16 border-b border-border bg-surface/80 backdrop-blur-md flex items-center px-4 md:px-8 justify-between sticky top-0 z-10">
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} className="h-9 w-auto" alt="MediCare Logo" />
        </Link>
        <div className="flex items-center gap-3">
          <Link to="/dashboard" className="px-5 py-2.5 rounded-xl gradient-primary text-primary-foreground text-sm font-semibold shadow-card hover:shadow-elevated transition-shadow">
            Get Started
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 gradient-hero opacity-50" />
        <div className="absolute top-20 right-10 w-72 h-72 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute bottom-10 left-10 w-96 h-96 rounded-full bg-secondary/5 blur-3xl" />
        
        <div className="relative max-w-6xl mx-auto px-4 md:px-8 py-20 md:py-32">
          <motion.div {...fadeUp} className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              <Zap className="w-4 h-4" />
              AI-Powered Healthcare Assistant
            </div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-foreground leading-[1.1] mb-6">
              Your Intelligent{' '}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
                Health Guardian
              </span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-8 leading-relaxed">
              Analyze symptoms with AI, detect dangerous drug interactions, and receive early health alerts — all in one intelligent platform.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/analyzer" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl gradient-primary text-primary-foreground font-semibold shadow-card hover:shadow-elevated transition-all">
                Analyze Symptoms <ArrowRight className="w-4 h-4" />
              </Link>
              <Link to="/drug-checker" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-surface text-foreground font-semibold shadow-card hover:shadow-elevated transition-all ring-1 ring-border">
                Check Drug Interactions
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-6xl mx-auto px-4 md:px-8 py-20">
        <motion.div {...fadeUp} className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight mb-4">Everything You Need</h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">Comprehensive health tools powered by artificial intelligence.</p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="p-6 rounded-xl bg-surface shadow-card hover:shadow-elevated transition-shadow group"
            >
              <f.icon className={`w-10 h-10 ${f.color} mb-4`} />
              <h3 className="text-lg font-semibold text-foreground mb-2">{f.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-muted/50 py-20">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <motion.div {...fadeUp} className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight mb-4">How It Works</h2>
            <p className="text-muted-foreground text-lg">Four simple steps to better health awareness.</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((s, i) => (
              <motion.div
                key={s.num}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="relative p-6 rounded-xl bg-surface shadow-card"
              >
                <span className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">{s.num}</span>
                <h3 className="text-lg font-semibold text-foreground mt-3 mb-2">{s.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-6xl mx-auto px-4 md:px-8 py-20">
        <motion.div {...fadeUp} className="rounded-2xl gradient-health p-10 md:p-16 text-center">
          <Heart className="w-12 h-12 text-primary-foreground mx-auto mb-4" />
          <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">Start Your Health Analysis</h2>
          <p className="text-primary-foreground/80 text-lg mb-8 max-w-xl mx-auto">Get AI-powered insights about your symptoms and medications today.</p>
          <Link to="/analyzer" className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-surface text-foreground font-semibold shadow-elevated hover:scale-105 transition-transform">
            Get Started Free <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8">
        <div className="max-w-6xl mx-auto px-4 md:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <img src={logo} className="h-7 w-auto" alt="MediCare" />
          </div>
          <p className="text-sm text-muted-foreground">© 2026 MediCare. AI-powered health guidance. Not a substitute for professional medical advice.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
