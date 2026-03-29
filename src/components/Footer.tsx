import { Link } from 'react-router-dom';

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
            <Link to="/about" className="hover:text-primary transition-colors">About Us</Link>
            <Link to="/blog" className="hover:text-primary transition-colors">Blog</Link>
            <Link to="/contact" className="hover:text-primary transition-colors">Contact Us</Link>
          </div>
        </div>
        <div>
          <h4 className="mb-3 text-sm font-heading font-bold">Support</h4>
          <div className="flex flex-col gap-2.5 text-sm text-muted-foreground">
            <Link to="/contact" className="hover:text-primary transition-colors">Help Center</Link>
            <Link to="/contact" className="hover:text-primary transition-colors">FAQs</Link>
            <Link to="/contact" className="hover:text-primary transition-colors">Live Chat</Link>
          </div>
        </div>
        <div>
          <h4 className="mb-3 text-sm font-heading font-bold">Legal</h4>
          <div className="flex flex-col gap-2.5 text-sm text-muted-foreground">
            <Link to="/about" className="hover:text-primary transition-colors">Privacy Policy</Link>
            <Link to="/about" className="hover:text-primary transition-colors">Terms of Service</Link>
            <Link to="/about" className="hover:text-primary transition-colors">Cookie Policy</Link>
          </div>
        </div>
      </div>
      <div className="mt-10 border-t pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
        <span>© 2024 FoodDash. All rights reserved.</span>
        <div className="flex gap-6">
          <Link to="/about" className="hover:text-primary transition-colors">Privacy</Link>
          <Link to="/about" className="hover:text-primary transition-colors">Terms</Link>
          <Link to="/contact" className="hover:text-primary transition-colors">Support</Link>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
