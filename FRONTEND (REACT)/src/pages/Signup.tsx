import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { PageWrapper } from '@/components/PageWrapper';
import { User, Mail, Lock, Eye, EyeOff, SkipForward } from 'lucide-react';
import { signupUser } from '@/lib/api';
import { useAuth } from '@/context/AuthContext';

const roleDestinations: Record<string, string> = {
  customer: '/customer',
  restaurant: '/dashboard',
  driver: '/driver',
};

const Signup = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [searchParams] = useSearchParams();
  const initialRole = searchParams.get('role') || 'customer';
  
  const [selectedRole, setSelectedRole] = useState(initialRole);
  const destination = roleDestinations[selectedRole] || '/';

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      localStorage.removeItem('cravix_user'); // Force clear old session
      const userData = await signupUser(name, email, password, selectedRole);
      login(userData as any);
      const finalDest = roleDestinations[(userData as any).role] || destination;
      navigate(finalDest);
    } catch (err: any) {
      setError(err.message || 'Signup failed');
    } finally {
      setLoading(false);
    }
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
            <p className="text-muted-foreground mt-1">Join as <span className="text-primary font-semibold capitalize">{selectedRole}</span></p>
          </div>

          <form onSubmit={handleSignup} className="space-y-4">
            <div className="space-y-2">
              <Label className="font-heading font-semibold">I want to join as a:</Label>
              <select 
                className="w-full h-11 rounded-xl glass-deep border border-white/10 px-3 text-foreground bg-transparent focus:neon-border outline-none"
                value={selectedRole}
                onChange={e => setSelectedRole(e.target.value)}
              >
                <option value="customer" className="bg-[#1a1a1a]">Customer</option>
                <option value="restaurant" className="bg-[#1a1a1a]">Restaurant Owner</option>
                <option value="driver" className="bg-[#1a1a1a]">Driver</option>
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="name" className="font-heading font-semibold">Full Name</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input id="name" placeholder="John Doe" className="pl-10 rounded-xl glass-deep border-white/10 focus:neon-border transition-all text-foreground placeholder:text-muted-foreground" value={name} onChange={e => setName(e.target.value)} required />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="font-heading font-semibold">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input id="email" type="email" placeholder="you@example.com" className="pl-10 rounded-xl glass-deep border-white/10 focus:neon-border transition-all text-foreground placeholder:text-muted-foreground" value={email} onChange={e => setEmail(e.target.value)} required />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="font-heading font-semibold">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input id="password" type={showPassword ? 'text' : 'password'} placeholder="••••••••" className="pl-10 pr-10 rounded-xl glass-deep border-white/10 focus:neon-border transition-all text-foreground placeholder:text-muted-foreground" value={password} onChange={e => setPassword(e.target.value)} required />
                <Button type="button" variant="ghost" size="icon" className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 rounded-lg" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <EyeOff className="h-4 w-4 text-muted-foreground" /> : <Eye className="h-4 w-4 text-muted-foreground" />}
                </Button>
              </div>
            </div>
            {error && <p className="text-red-500 text-sm text-center font-medium">{error}</p>}
            <Button type="submit" className="w-full gradient-warm rounded-xl neon-glow-primary hover:shadow-xl transition-all border-0" size="lg" disabled={loading}>{loading ? 'Creating...' : 'Create Account'}</Button>
          </form>



          <p className="text-center text-sm text-muted-foreground">
            Already have an account? <Link to={`/login?role=${selectedRole}`} className="text-primary font-semibold hover:underline">Sign in</Link>
          </p>
        </motion.div>
      </div>
    </PageWrapper>
  );
};

export default Signup;
