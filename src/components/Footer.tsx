import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Footer = () => (
  <footer className="border-t glass-strong mt-auto">
    <div className="container py-12">
      <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl gradient-warm shadow-glow">
              <span className="text-sm font-bold text-primary-foreground">F</span>
            </div>
            <span className="text-lg font-heading font-bold">Food<span className="text-gradient">Dash</span></span>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">Delivering happiness to your doorstep, one meal at a time.</p>
        </div>
        <div>
          <h4 className="mb-3 text-sm font-heading font-bold">Company</h4>
          <div className="flex flex-col gap-2.5 text-sm text-muted-foreground">
            <Link to="/" className="hover:text-primary transition-colors">About Us</Link>
            <Link to="/" className="hover:text-primary transition-colors">Careers</Link>
            <Link to="/" className="hover:text-primary transition-colors">Blog</Link>
          </div>
        </div>
        <div>
          <h4 className="mb-3 text-sm font-heading font-bold">For Restaurants</h4>
          <div className="flex flex-col gap-2.5 text-sm text-muted-foreground">
            <Link to="/dashboard" className="hover:text-primary transition-colors">Partner with us</Link>
            <Link to="/dashboard" className="hover:text-primary transition-colors">Restaurant Dashboard</Link>
          </div>
        </div>
        <div>
          <h4 className="mb-3 text-sm font-heading font-bold">For Drivers</h4>
          <div className="flex flex-col gap-2.5 text-sm text-muted-foreground">
            <Link to="/driver" className="hover:text-primary transition-colors">Become a Driver</Link>
            <Link to="/driver" className="hover:text-primary transition-colors">Driver Dashboard</Link>
          </div>
        </div>
      </div>
      <div className="mt-10 border-t pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
        <span>© 2024 FoodDash. All rights reserved.</span>
        <div className="flex gap-6">
          <Link to="/" className="hover:text-primary transition-colors">Privacy</Link>
          <Link to="/" className="hover:text-primary transition-colors">Terms</Link>
          <Link to="/" className="hover:text-primary transition-colors">Support</Link>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
