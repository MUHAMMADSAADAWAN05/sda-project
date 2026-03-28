import { Link, useNavigate } from 'react-router-dom';
import { Search, MapPin, ArrowRight, Sparkles, TrendingUp, Flame } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import RestaurantCard from '@/components/RestaurantCard';
import { categories, restaurants } from '@/data/mockData';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { PageWrapper } from '@/components/PageWrapper';

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
    <PageWrapper>
      <div className="min-h-screen">
        {/* Hero */}
        <section className="relative overflow-hidden gradient-hero">
          {/* Decorative blobs */}
          <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />
          <div className="absolute -right-32 top-16 h-80 w-80 rounded-full bg-accent/8 blur-3xl" />
          <div className="absolute bottom-0 left-1/3 h-64 w-64 rounded-full bg-primary/3 blur-2xl" />

          <div className="container relative py-20 md:py-28">
            <div className="mx-auto max-w-2xl text-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, type: 'spring', stiffness: 200 }}
                className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-2 text-sm font-medium text-primary"
              >
                <Sparkles className="h-4 w-4" />
                Free delivery on your first order!
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="text-4xl font-heading font-extrabold tracking-tight md:text-6xl lg:text-7xl"
              >
                Delicious food,{' '}
                <span className="text-gradient">delivered fast</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
                className="mt-5 text-lg text-muted-foreground md:text-xl"
              >
                Order from the best local restaurants with easy, on-demand delivery.
              </motion.p>

              <motion.form
                onSubmit={handleSearch}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.3 }}
                className="mt-10 flex gap-2"
              >
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="What are you craving?"
                    className="h-14 rounded-2xl border-2 bg-card/70 glass-card pl-12 text-base shadow-card transition-all focus:shadow-card-hover focus:border-primary/40 focus:neon-border"
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                  />
                </div>
                <Button type="submit" size="lg" className="h-14 rounded-2xl px-8 gradient-warm neon-glow-primary hover:shadow-xl transition-all">
                  Search
                </Button>
              </motion.form>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-5 flex items-center justify-center gap-2 text-sm text-muted-foreground"
              >
                <MapPin className="h-4 w-4 text-primary" />
                <span>742 Evergreen Terrace, Springfield</span>
                <Button variant="link" size="sm" className="h-auto p-0 text-primary font-semibold">Change</Button>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Categories */}
        <section className="container py-12">
          <motion.h2
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-2xl font-heading font-bold mb-6"
          >
            Explore Categories
          </motion.h2>
          <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
            {categories.map((cat, i) => (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04 }}
                whileHover={{ y: -4, scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to={`/search?category=${cat.name}`}
                  className="flex flex-col items-center gap-2.5 min-w-[88px] group"
                >
                  <div className="flex h-18 w-18 items-center justify-center rounded-2xl bg-secondary text-3xl transition-all group-hover:bg-primary/10 group-hover:shadow-glow/30 border border-transparent group-hover:border-primary/20"
                    style={{ height: '72px', width: '72px' }}
                  >
                    {cat.icon}
                  </div>
                  <span className="text-xs font-semibold text-muted-foreground group-hover:text-primary transition-colors">{cat.name}</span>
                </Link>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Featured */}
        <section className="container py-8">
          <div className="flex items-center justify-between mb-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-2"
            >
              <Flame className="h-6 w-6 text-primary" />
              <h2 className="text-2xl font-heading font-bold">Featured Restaurants</h2>
            </motion.div>
            <Button variant="ghost" size="sm" className="gap-1 text-primary font-semibold group" asChild>
              <Link to="/search">See all <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></Link>
            </Button>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((r, i) => <RestaurantCard key={r.id} restaurant={r} index={i} />)}
          </div>
        </section>

        {/* Top Rated */}
        <section className="container py-8 pb-16">
          <div className="flex items-center justify-between mb-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-2"
            >
              <TrendingUp className="h-6 w-6 text-success" />
              <h2 className="text-2xl font-heading font-bold">Top Rated Near You</h2>
            </motion.div>
            <Button variant="ghost" size="sm" className="gap-1 text-primary font-semibold group" asChild>
              <Link to="/search">See all <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></Link>
            </Button>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {topRated.slice(0, 6).map((r, i) => <RestaurantCard key={r.id} restaurant={r} index={i} />)}
          </div>
        </section>

        {/* CTA Banner */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="relative overflow-hidden"
        >
          <div className="gradient-warm">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMTAiIGN5PSIxMCIgcj0iMS41IiBmaWxsPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMSkiLz48L3N2Zz4=')] opacity-30" />
            <div className="container relative py-16 text-center">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-3xl font-heading font-bold text-primary-foreground md:text-4xl"
              >
                Own a restaurant? Partner with us
              </motion.h2>
              <p className="mt-3 text-primary-foreground/80 text-lg">Reach thousands of new customers and grow your business</p>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                <Button variant="secondary" size="lg" className="mt-8 rounded-2xl px-8 font-bold shadow-lg hover:shadow-xl transition-all" asChild>
                  <Link to="/dashboard">Get Started</Link>
                </Button>
              </motion.div>
            </div>
          </div>
        </motion.section>
      </div>
    </PageWrapper>
  );
};

export default Index;
