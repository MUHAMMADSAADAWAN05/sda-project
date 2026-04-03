import { User, MapPin, Heart, Settings, LogOut, LayoutDashboard, Sliders, History, CreditCard, Bell, HelpCircle, Shield, ShoppingBag, Edit3, Store } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { PageWrapper } from '@/components/PageWrapper';

const controls = [
  { id: 'profile', icon: User, label: 'Edit Profile', desc: 'Update your personal details', color: 'text-white bg-white/10' },
  { id: 'addresses', icon: MapPin, label: 'Manage Addresses', desc: 'Add or edit delivery locations', color: 'text-[hsl(25,95%,53%)] bg-[hsl(25,95%,53%)]/20' },
  { id: 'payment', icon: CreditCard, label: 'Payment Methods', desc: 'Manage your saved cards', color: 'text-white bg-white/10' },
  { id: 'favorites', icon: Heart, label: 'Favorites', desc: 'View your favorite restaurants', color: 'text-white bg-white/10' },
  { id: 'notifications', icon: Bell, label: 'Notifications', desc: 'Alerts & updates settings', color: 'text-white bg-white/10' },
  { id: 'security', icon: Shield, label: 'Security', desc: 'Password and authentication', color: 'text-[hsl(25,95%,53%)] bg-[hsl(25,95%,53%)]/20' },
  { id: 'support', icon: HelpCircle, label: 'Help & Support', desc: 'Contact customer service', color: 'text-white bg-white/10' },
];

const Account = () => {
  return (
    <PageWrapper>
      <div className="min-h-screen pb-12">
        <div className="container py-8 max-w-[1400px]">
          
          {/* Top App Bar - Matching Reference Structure */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-2xl glass-strong p-4 mb-6 flex flex-wrap items-center justify-between gap-4"
          >
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl gradient-warm flex items-center justify-center neon-glow-primary shadow-lg">
                <User className="h-5 w-5 text-white" />
              </div>
              <h1 className="text-xl font-heading font-extrabold text-white tracking-wide uppercase">CraviX Customer</h1>
            </div>
            
            <div className="flex items-center gap-2">
              <Button variant="outline" className="rounded-lg glass-card border-white/20 text-white hover:bg-white/10 gap-2">
                <LayoutDashboard className="h-4 w-4 text-white/70" /> Dashboard
              </Button>
              <Button className="gradient-warm rounded-lg neon-glow-primary border-0 text-white gap-2 font-semibold">
                <Sliders className="h-4 w-4" /> Controls
              </Button>
              <Button variant="outline" className="rounded-lg glass-card border-white/20 text-white hover:bg-white/10 gap-2">
                <History className="h-4 w-4 text-white/70" /> History
              </Button>
              <Button variant="outline" className="rounded-lg glass-card border-white/20 text-white hover:bg-white/10 gap-2">
                <LogOut className="h-4 w-4 text-white/70" /> Logout
              </Button>
            </div>
          </motion.div>

          <div className="glass-deep rounded-3xl p-6">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <Sliders className="h-6 w-6 text-white" />
                <h2 className="text-2xl font-heading font-bold text-white">Account Controls</h2>
              </div>
            </div>

            {/* Profile Overview Card */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-xl glass-card border-white/10 p-6 mb-8 flex items-center gap-6"
            >
              <div className="h-24 w-24 rounded-full gradient-warm flex items-center justify-center neon-glow-primary border-4 border-white/20 shadow-xl">
                <span className="text-3xl font-heading font-black text-white">JD</span>
              </div>
              <div className="flex-1">
                <h3 className="text-3xl font-heading font-bold text-white mb-1">John Doe</h3>
                <p className="text-white/60 mb-2">john.doe@example.com • +1 (555) 123-4567</p>
                <div className="flex gap-2">
                  <span className="px-3 py-1 rounded-full bg-white/10 text-xs text-white border border-white/20 font-semibold">Premium Member</span>
                  <span className="px-3 py-1 rounded-full bg-white/10 text-xs text-white border border-white/20 font-semibold flex items-center gap-1"><ShoppingBag className="h-3 w-3" /> 42 Orders</span>
                </div>
              </div>
              <Button variant="ghost" className="rounded-xl glass-deep border-white/20 text-white hover:bg-white/20 h-12 w-12 p-0">
                <Edit3 className="h-5 w-5" />
              </Button>
            </motion.div>

            {/* Controls Grid - Matching Reference 3 */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {controls.map((control, i) => (
                <motion.div
                  key={control.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + (i * 0.05) }}
                  whileHover={{ y: -4, scale: 1.02 }}
                  className={`rounded-xl border border-white/20 p-5 cursor-pointer flex flex-col items-center text-center justify-center gap-4 transition-all hover:shadow-[0_0_30px_-5px_hsl(25,95%,53%/0.5)] ${
                    i === 0 || i === 1 ? 'glass-card bg-gradient-to-b from-white/10 to-transparent' : 'glass-card hover:bg-white/5'
                  }`}
                >
                  <div className={`h-14 w-14 rounded-full flex items-center justify-center ${control.color}`}>
                    <control.icon className="h-7 w-7" />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-lg text-white mb-1">{control.label}</h3>
                    <p className="text-sm text-white/50">{control.desc}</p>
                  </div>
                  <Button className="w-full mt-2 rounded-lg bg-white/10 border-white/20 text-white hover:bg-white/20 border" variant="ghost">
                    Manage
                  </Button>
                </motion.div>
              ))}
            </div>

            {/* Partner Section as requested */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mt-8 rounded-2xl glass-strong border-[hsl(25,95%,53%)]/30 p-6 flex flex-col md:flex-row items-center justify-between gap-6 shadow-glow"
            >
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full gradient-warm flex items-center justify-center shadow-lg">
                  <Store className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-heading font-bold text-white mb-1">Want to partner?</h3>
                  <p className="text-white/70 text-sm">Join CraviX to manage your own restaurant and reach more customers.</p>
                </div>
              </div>
              <Button asChild size="lg" className="gradient-warm rounded-xl neon-glow-primary border-0 text-white font-bold shrink-0">
                <Link to="/login">Get Started</Link>
              </Button>
            </motion.div>

          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default Account;
