import { Link } from 'react-router-dom';

const Footer = () => (
  <footer className="border-t bg-card mt-auto">
    <div className="container py-12">
      <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <span className="text-sm font-bold text-primary-foreground">F</span>
            </div>
            <span className="text-lg font-heading font-bold">Food<span className="text-primary">Dash</span></span>
          </div>
          <p className="text-sm text-muted-foreground">Delivering happiness to your doorstep, one meal at a time.</p>
        </div>
        <div>
          <h4 className="mb-3 text-sm font-semibold">Company</h4>
          <div className="flex flex-col gap-2 text-sm text-muted-foreground">
            <Link to="/" className="hover:text-foreground transition-colors">About Us</Link>
            <Link to="/" className="hover:text-foreground transition-colors">Careers</Link>
            <Link to="/" className="hover:text-foreground transition-colors">Blog</Link>
          </div>
        </div>
        <div>
          <h4 className="mb-3 text-sm font-semibold">For Restaurants</h4>
          <div className="flex flex-col gap-2 text-sm text-muted-foreground">
            <Link to="/dashboard" className="hover:text-foreground transition-colors">Partner with us</Link>
            <Link to="/dashboard" className="hover:text-foreground transition-colors">Restaurant Dashboard</Link>
          </div>
        </div>
        <div>
          <h4 className="mb-3 text-sm font-semibold">For Drivers</h4>
          <div className="flex flex-col gap-2 text-sm text-muted-foreground">
            <Link to="/driver" className="hover:text-foreground transition-colors">Become a Driver</Link>
            <Link to="/driver" className="hover:text-foreground transition-colors">Driver Dashboard</Link>
          </div>
        </div>
      </div>
      <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
        © 2024 FoodDash. All rights reserved.
      </div>
    </div>
  </footer>
);

export default Footer;
