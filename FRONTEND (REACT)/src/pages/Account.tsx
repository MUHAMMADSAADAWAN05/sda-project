import { useState, useEffect } from 'react';
import { User, MapPin, Heart, Settings, LogOut, LayoutDashboard, Sliders, History, CreditCard, Bell, HelpCircle, Shield, ShoppingBag, Edit3, Store, Home, Search, Package, UtensilsCrossed } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { PageWrapper } from '@/components/PageWrapper';
import DashboardSideNav from '@/components/DashboardSideNav';
import { useAuth } from '@/context/AuthContext';

const controls = [
  { id: 'profile', icon: User, label: 'Edit Profile', desc: 'Update your personal details', color: 'text-white bg-white/10' },
  { id: 'addresses', icon: MapPin, label: 'Manage Addresses', desc: 'Add or edit delivery locations', color: 'text-[hsl(25,95%,53%)] bg-[hsl(25,95%,53%)]/20' },
  { id: 'payment', icon: CreditCard, label: 'Payment Methods', desc: 'Manage your saved cards', color: 'text-white bg-white/10' },
  { id: 'favorites', icon: Heart, label: 'Favorites', desc: 'View your favorite restaurants', color: 'text-white bg-white/10' },
  { id: 'notifications', icon: Bell, label: 'Notifications', desc: 'Alerts & updates settings', color: 'text-white bg-white/10' },
  { id: 'security', icon: Shield, label: 'Security', desc: 'Password and authentication', color: 'text-[hsl(25,95%,53%)] bg-[hsl(25,95%,53%)]/20' },
  { id: 'support', icon: HelpCircle, label: 'Help & Support', desc: 'Contact customer service', color: 'text-white bg-white/10' },
];

const customerNavItems = [
  { icon: Home, label: 'Home', to: '/customer' },
  { icon: Search, label: 'Browse', to: '/search' },
  { icon: Package, label: 'Orders', to: '/orders' },
  { icon: HelpCircle, label: 'Support', to: '/contact' },
];

const Account = () => {
  const { user, logout, login } = useAuth();
  const navigate = useNavigate();
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [profileForm, setProfileForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
    address: (user as any)?.address || '',
    cardNumber: (user as any)?.cardNumber || '',
  });
  const [loading, setLoading] = useState(false);

  // Sync form when user loads
  useEffect(() => {
    if (user) {
      setProfileForm({
        name: user.name || '',
        email: user.email || '',
        address: (user as any).address || '',
        cardNumber: (user as any).cardNumber || '',
      });
    }
  }, [user]);

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user?.id) return;
    try {
      setLoading(true);
      const { updateProfile } = await import('@/lib/api');
      const updatedUser = await updateProfile(user.id, profileForm);
      login(updatedUser as any);
      setIsEditingProfile(false);
      alert('Profile updated successfully!');
    } catch (err) {
      alert('Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const userInitials = user?.name
    ? user.name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2)
    : '??';

  return (
    <PageWrapper key={user?.id || 'guest'}>
      <div className="min-h-screen pb-12">
        <div className="container py-8 max-w-[1400px] flex gap-6">
          <DashboardSideNav items={customerNavItems} title="Customer" />
          <div className="flex-1 min-w-0">
            {/* Top App Bar */}
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
                <Button variant="outline" className="rounded-lg glass-card border-white/20 text-white hover:bg-white/10 gap-2" asChild>
                  <Link to="/customer"><LayoutDashboard className="h-4 w-4 text-white/70" /> Dashboard</Link>
                </Button>
                <Button className="gradient-warm rounded-lg neon-glow-primary border-0 text-white gap-2 font-semibold">
                  <Sliders className="h-4 w-4" /> Controls
                </Button>
                <Button variant="outline" className="rounded-lg glass-card border-white/20 text-white hover:bg-white/10 gap-2" asChild>
                  <Link to="/orders"><History className="h-4 w-4 text-white/70" /> History</Link>
                </Button>
                <Button variant="outline" className="rounded-lg glass-card border-white/20 text-white hover:bg-white/10 gap-2" onClick={handleLogout}>
                  <LogOut className="h-4 w-4 text-white/70" /> Logout
                </Button>
              </div>
            </motion.div>

            <div className="glass-ultra rounded-3xl p-6 liquid-shimmer">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <Sliders className="h-6 w-6 text-white" />
                  <h2 className="text-2xl font-heading font-bold text-white">Account Controls</h2>
                </div>
              </div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-xl glass-card border-white/10 p-6 mb-8 flex items-center gap-6"
              >
                <div className="h-24 w-24 rounded-full gradient-warm flex items-center justify-center neon-glow-primary border-4 border-white/20 shadow-xl">
                  <span className="text-3xl font-heading font-black text-white">{userInitials}</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-3xl font-heading font-bold text-white mb-1">{user?.name || 'Guest User'}</h3>
                  <p className="text-white/60 mb-2">{user?.email || 'No email provided'} • {user?.role || 'Customer'}</p>
                  <div className="flex gap-2">
                    <span className="px-3 py-1 rounded-full bg-white/10 text-xs text-white border border-white/20 font-semibold">Premium Member</span>
                    <Link to="/orders" className="px-3 py-1 rounded-full bg-white/10 text-xs text-white border border-white/20 font-semibold flex items-center gap-1 hover:bg-white/20 transition-colors">
                       <ShoppingBag className="h-3 w-3" /> View Orders
                    </Link>
                  </div>
                </div>
                <Button 
                  variant="ghost" 
                  className="rounded-xl glass-deep border-white/20 text-white hover:bg-white/20 h-12 w-12 p-0"
                  onClick={(e) => { e.preventDefault(); e.stopPropagation(); setIsEditingProfile(true); }}
                >
                  <Edit3 className="h-5 w-5" />
                </Button>

                <AnimatePresence>
                  {isEditingProfile && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
                      <motion.div 
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="w-full max-w-md rounded-2xl glass-ultra border border-white/10 p-6 shadow-2xl relative"
                      >
                        <h2 className="font-heading text-2xl font-bold text-white mb-4">Edit Profile</h2>
                        <form onSubmit={handleUpdateProfile} className="space-y-4">
                          <div className="space-y-2">
                            <label className="text-sm font-semibold text-white/70">Full Name</label>
                            <input 
                              className="w-full h-11 rounded-xl glass-deep border border-white/10 px-3 text-white outline-none focus:border-primary"
                              value={profileForm.name}
                              onChange={e => setProfileForm({ ...profileForm, name: e.target.value })}
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-sm font-semibold text-white/70">Email Address</label>
                            <input 
                              type="email"
                              className="w-full h-11 rounded-xl glass-deep border border-white/10 px-3 text-white outline-none focus:border-primary"
                              value={profileForm.email}
                              onChange={e => setProfileForm({ ...profileForm, email: e.target.value })}
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-sm font-semibold text-white/70">Delivery Address</label>
                            <input 
                              type="text"
                              className="w-full h-11 rounded-xl glass-deep border border-white/10 px-3 text-white outline-none focus:border-primary"
                              value={profileForm.address}
                              onChange={e => setProfileForm({ ...profileForm, address: e.target.value })}
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-sm font-semibold text-white/70">Card Number (Optional)</label>
                            <input 
                              type="text"
                              placeholder="**** **** **** ****"
                              className="w-full h-11 rounded-xl glass-deep border border-white/10 px-3 text-white outline-none focus:border-primary"
                              value={profileForm.cardNumber}
                              onChange={e => setProfileForm({ ...profileForm, cardNumber: e.target.value })}
                            />
                          </div>
                          <div className="mt-6 flex justify-end gap-2">
                            <Button type="button" variant="ghost" onClick={() => setIsEditingProfile(false)}>Cancel</Button>
                            <Button type="submit" disabled={loading} className="gradient-warm border-0 font-bold">
                              Save Changes
                            </Button>
                          </div>
                        </form>
                      </motion.div>
                    </div>
                  )}
                </AnimatePresence>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {controls.map((control, i) => (
                  <motion.div
                    key={control.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + (i * 0.05) }}
                    whileHover={{ y: -4, scale: 1.02 }}
                    className={`rounded-xl border border-white/20 p-5 cursor-pointer flex flex-col items-center text-center justify-center gap-4 transition-all hover:shadow-[0_0_30px_-5px_hsl(25,95%,53%/0.5)] glass-card hover:bg-white/5 ${
                      i === 0 || i === 1 ? 'bg-gradient-to-b from-white/10 to-transparent' : ''
                    }`}
                  >
                    <div className={`h-14 w-14 rounded-full flex items-center justify-center ${control.color}`}>
                      <control.icon className="h-7 w-7" />
                    </div>
                    <div>
                      <h3 className="font-heading font-bold text-lg text-white mb-1">{control.label}</h3>
                      <p className="text-sm text-white/50">{control.desc}</p>
                    </div>
                    <Button 
                      className="w-full mt-2 rounded-lg bg-white/10 border-white/20 text-white hover:bg-white/20 border" 
                      variant="ghost"
                      onClick={(e) => {
                        e.preventDefault(); e.stopPropagation();
                        if (['profile', 'addresses', 'payment'].includes(control.id)) setIsEditingProfile(true);
                        else alert(`${control.label} feature requires additional database tables and is coming soon!`);
                      }}
                    >
                      Manage
                    </Button>
                  </motion.div>
                ))}
              </div>

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
                  <Link to="/login?role=restaurant">Get Started</Link>
                </Button>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default Account;
