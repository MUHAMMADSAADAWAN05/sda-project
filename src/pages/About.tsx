import { motion } from 'framer-motion';
import { PageWrapper } from '@/components/PageWrapper';
import { Heart, Users, Globe, Award } from 'lucide-react';

const values = [
  { icon: Heart, title: 'Passion for Food', desc: 'We believe great food brings people together. Every order is a chance to deliver joy.' },
  { icon: Users, title: 'Community First', desc: 'Supporting local restaurants and empowering drivers in every neighborhood we serve.' },
  { icon: Globe, title: 'Global Reach', desc: 'Operating across 200+ cities worldwide with plans to expand to 500+ by 2026.' },
  { icon: Award, title: 'Quality Guaranteed', desc: 'Rigorous quality standards ensure every meal arrives fresh, hot, and delicious.' },
];

const team = [
  { name: 'Sarah Chen', role: 'CEO & Co-Founder', img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop' },
  { name: 'Marcus Rivera', role: 'CTO', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop' },
  { name: 'Emily Park', role: 'Head of Design', img: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop' },
  { name: 'David Kim', role: 'VP Operations', img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop' },
];

const About = () => (
  <PageWrapper>
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden gradient-hero py-20 md:py-28">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-primary/8 blur-[120px]" />
          <div className="absolute -right-32 top-16 h-80 w-80 rounded-full bg-accent/10 blur-[100px]" />
        </div>
        <div className="container relative text-center">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl font-heading font-extrabold md:text-6xl">
            About <span className="text-gradient">FoodDash</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            We started FoodDash in 2020 with a simple mission: make ordering food as easy, fast, and delightful as possible. Today we connect millions of customers with their favorite restaurants.
          </motion.p>
        </div>
      </section>

      {/* Values */}
      <section className="container py-16">
        <h2 className="text-3xl font-heading font-bold text-center mb-10">Our <span className="text-gradient">Values</span></h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((v, i) => (
            <motion.div key={v.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} whileHover={{ y: -6 }} className="glass-card neon-border rounded-2xl p-6 text-center shadow-card hover:shadow-card-hover transition-all">
              <div className="h-12 w-12 mx-auto rounded-xl gradient-warm neon-glow-primary flex items-center justify-center mb-4">
                <v.icon className="h-6 w-6 text-primary-foreground" />
              </div>
              <h3 className="font-heading font-bold mb-2">{v.title}</h3>
              <p className="text-sm text-muted-foreground">{v.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Team */}
      <section className="container py-16">
        <h2 className="text-3xl font-heading font-bold text-center mb-10">Meet the <span className="text-gradient">Team</span></h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {team.map((m, i) => (
            <motion.div key={m.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} whileHover={{ y: -6 }} className="glass-card neon-border rounded-2xl p-6 text-center shadow-card hover:shadow-card-hover transition-all">
              <img src={m.img} alt={m.name} className="h-20 w-20 rounded-full mx-auto mb-4 object-cover ring-2 ring-primary/20" />
              <h3 className="font-heading font-bold">{m.name}</h3>
              <p className="text-sm text-muted-foreground">{m.role}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Stats */}
      <section className="container py-16">
        <div className="glass-card neon-border rounded-3xl p-10 grid grid-cols-2 md:grid-cols-4 gap-8 text-center shadow-card-hover">
          {[
            { value: '10M+', label: 'Orders Delivered' },
            { value: '50K+', label: 'Restaurant Partners' },
            { value: '200+', label: 'Cities' },
            { value: '4.8★', label: 'App Rating' },
          ].map((s, i) => (
            <motion.div key={s.label} initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
              <p className="text-3xl font-heading font-extrabold text-gradient">{s.value}</p>
              <p className="text-sm text-muted-foreground mt-1">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  </PageWrapper>
);

export default About;
