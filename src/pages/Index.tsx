import { Link, useNavigate } from 'react-router-dom';
import { Search, MapPin, ChevronRight, Star, Clock, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import RestaurantCard from '@/components/RestaurantCard';
import { categories, restaurants } from '@/data/mockData';
import { useState } from 'react';

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const featured = restaurants.filter(r => r.featured);
  const topRated = [...restaurants].sort((a, b) => b.rating - a.rating);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
  };

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-accent/5">
        <div className="container py-16 md:py-24">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-heading font-extrabold tracking-tight md:text-6xl">
              Delicious food,{' '}
              <span className="text-primary">delivered fast</span>
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Order from the best local restaurants with easy, on-demand delivery.
            </p>
            <form onSubmit={handleSearch} className="mt-8 flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="What are you craving?"
                  className="h-12 pl-10 text-base"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                />
              </div>
              <Button type="submit" size="lg" className="h-12 px-6">
                Search
              </Button>
            </form>
            <div className="mt-4 flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4" />
              <span>742 Evergreen Terrace, Springfield</span>
              <Button variant="link" size="sm" className="h-auto p-0 text-primary">Change</Button>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="container py-10">
        <h2 className="text-2xl font-heading font-bold mb-6">Explore Categories</h2>
        <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
          {categories.map(cat => (
            <Link
              key={cat.id}
              to={`/search?category=${cat.name}`}
              className="flex flex-col items-center gap-2 min-w-[80px] group"
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-muted text-2xl transition-all group-hover:bg-primary/10 group-hover:scale-105">
                {cat.icon}
              </div>
              <span className="text-xs font-medium text-muted-foreground group-hover:text-foreground">{cat.name}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured */}
      <section className="container py-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-heading font-bold">Featured Restaurants</h2>
          <Button variant="ghost" size="sm" className="gap-1 text-primary" asChild>
            <Link to="/search">See all <ArrowRight className="h-4 w-4" /></Link>
          </Button>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map(r => <RestaurantCard key={r.id} restaurant={r} />)}
        </div>
      </section>

      {/* Top Rated */}
      <section className="container py-6 pb-16">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-heading font-bold">Top Rated Near You</h2>
          <Button variant="ghost" size="sm" className="gap-1 text-primary" asChild>
            <Link to="/search">See all <ArrowRight className="h-4 w-4" /></Link>
          </Button>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {topRated.slice(0, 6).map(r => <RestaurantCard key={r.id} restaurant={r} />)}
        </div>
      </section>

      {/* CTA Banner */}
      <section className="bg-primary">
        <div className="container py-12 text-center">
          <h2 className="text-2xl font-heading font-bold text-primary-foreground md:text-3xl">Own a restaurant? Partner with us</h2>
          <p className="mt-2 text-primary-foreground/80">Reach thousands of new customers and grow your business</p>
          <Button variant="secondary" size="lg" className="mt-6" asChild>
            <Link to="/dashboard">Get Started</Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Index;
