import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { PageWrapper } from '@/components/PageWrapper';
import { User, Mail, Lock, Eye, EyeOff, SkipForward } from 'lucide-react';

const roleDestinations: Record<string, string> = {
  customer: '/',
  restaurant: '/dashboard',
  driver: '/driver',
};

const Signup = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const role = searchParams.get('role') || 'customer';
  const destination = roleDestinations[role] || '/';

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(destination);
  };

  return (
    <PageWrapper>
      <div className="relative flex min-h-[80vh] items-center justify-center px-4">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -left-40 top-1/4 h-80 w-80 rounded-full bg-accent/8 blur-[120px]" />
          <div className="absolute -right-40 bottom-1/4 h-80 w-80 rounded-full bg-primary/8 blur-[120px]" />
          <div className="absolute inset-0 bg-[linear-gradient(hsl(var(--primary)/0.02)_1px,transparent_1px),linear-gradient(90deg,hsl(var(--primary)/0.02)_1px,transparent_1px)] bg-[size:60px_60px]" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.5, type: 'spring', stiffness: 200 }}
          className="relative w-full max-w-sm space-y-8 glass-liquid rounded-3xl p-8 neon-border-teal"
        >
          <div className="text-center">
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', stiffness: 200, damping: 15 }}
              className="h-14 w-14 mx-auto rounded-2xl overflow-hidden neon-glow-primary mb-5"
            >
              <img src={new URL('@/assets/cravix-logo.jpeg', import.meta.url).href} alt="CraviX" className="h-full w-full object-cover" />
            </motion.div>
            <h1 className="text-2xl font-heading font-extrabold">Create your account</h1>
            <p className="text-muted-foreground mt-1">Join as <span className="text-primary font-semibold capitalize">{role}</span></p>
          </div>

          <form onSubmit={handleSignup} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="font-heading font-semibold">Full Name</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input id="name" placeholder="John Doe" className="pl-10 rounded-xl glass-card border-border/50 focus:neon-border transition-all" value={name} onChange={e => setName(e.target.value)} required />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="font-heading font-semibold">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input id="email" type="email" placeholder="you@example.com" className="pl-10 rounded-xl glass-card border-border/50 focus:neon-border transition-all" value={email} onChange={e => setEmail(e.target.value)} required />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="font-heading font-semibold">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input id="password" type={showPassword ? 'text' : 'password'} placeholder="••••••••" className="pl-10 pr-10 rounded-xl glass-card border-border/50 focus:neon-border transition-all" value={password} onChange={e => setPassword(e.target.value)} required />
                <Button type="button" variant="ghost" size="icon" className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 rounded-lg" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <EyeOff className="h-4 w-4 text-muted-foreground" /> : <Eye className="h-4 w-4 text-muted-foreground" />}
                </Button>
              </div>
            </div>
            <Button type="submit" className="w-full gradient-warm rounded-xl neon-glow-primary hover:shadow-xl transition-all" size="lg">Create Account</Button>
          </form>

          {/* Skip button */}
          <Button
            variant="ghost"
            className="w-full gap-2 text-muted-foreground hover:text-primary rounded-xl"
            onClick={() => navigate(destination)}
          >
            <SkipForward className="h-4 w-4" />
            Skip for now
          </Button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-border/50" /></div>
            <div className="relative flex justify-center text-xs uppercase"><span className="glass-card px-3 py-1 rounded-full text-muted-foreground">Or continue with</span></div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Button variant="outline" className="w-full rounded-xl glass-card border-border/50 hover:neon-border transition-all">Google</Button>
            <Button variant="outline" className="w-full rounded-xl glass-card border-border/50 hover:neon-border transition-all">Apple</Button>
          </div>

          <p className="text-center text-sm text-muted-foreground">
            Already have an account? <Link to={`/login?role=${role}`} className="text-primary font-semibold hover:underline">Sign in</Link>
          </p>
        </motion.div>
      </div>
    </PageWrapper>
  );
};

export default Signup;
