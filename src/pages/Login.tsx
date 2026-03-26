import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useState } from 'react';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/');
  };

  return (
    <div className="flex min-h-[80vh] items-center justify-center px-4">
      <div className="w-full max-w-sm space-y-8">
        <div className="text-center">
          <div className="flex h-12 w-12 mx-auto items-center justify-center rounded-xl bg-primary mb-4">
            <span className="text-xl font-bold text-primary-foreground">F</span>
          </div>
          <h1 className="text-2xl font-heading font-bold">Welcome back</h1>
          <p className="text-muted-foreground mt-1">Sign in to your FoodDash account</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="you@example.com" value={email} onChange={e => setEmail(e.target.value)} required />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between">
              <Label htmlFor="password">Password</Label>
              <Button variant="link" size="sm" className="h-auto p-0 text-xs">Forgot password?</Button>
            </div>
            <Input id="password" type="password" placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} required />
          </div>
          <Button type="submit" className="w-full" size="lg">Sign In</Button>
        </form>

        <div className="relative">
          <div className="absolute inset-0 flex items-center"><div className="w-full border-t" /></div>
          <div className="relative flex justify-center text-xs uppercase"><span className="bg-background px-2 text-muted-foreground">Or continue with</span></div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Button variant="outline" className="w-full">Google</Button>
          <Button variant="outline" className="w-full">Apple</Button>
        </div>

        <p className="text-center text-sm text-muted-foreground">
          Don't have an account? <Link to="/signup" className="text-primary font-medium hover:underline">Sign up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
