import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, Grid3X3, List, SlidersHorizontal } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import RestaurantCard from '@/components/RestaurantCard';
import { restaurants, categories } from '@/data/mockData';
import { motion } from 'framer-motion';
import { PageWrapper } from '@/components/PageWrapper';

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('q') || '');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'all');
  const [sortBy, setSortBy] = useState('relevance');
  const [view, setView] = useState<'grid' | 'list'>('grid');

  const filtered = useMemo(() => {
    let result = [...restaurants];
    if (query) result = result.filter(r => r.name.toLowerCase().includes(query.toLowerCase()) || r.cuisine.toLowerCase().includes(query.toLowerCase()));
    if (selectedCategory && selectedCategory !== 'all') result = result.filter(r => r.cuisine === selectedCategory);
    if (sortBy === 'rating') result.sort((a, b) => b.rating - a.rating);
    if (sortBy === 'delivery') result.sort((a, b) => parseInt(a.deliveryTime) - parseInt(b.deliveryTime));
    if (sortBy === 'price') result.sort((a, b) => a.deliveryFee - b.deliveryFee);
    return result;
  }, [query, selectedCategory, sortBy]);

  return (
    <PageWrapper>
      <div className="container py-8">
        <motion.h1
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-3xl font-heading font-extrabold mb-6"
        >
          {query ? <>Results for "<span className="text-gradient">{query}</span>"</> : selectedCategory !== 'all' ? <span className="text-gradient">{selectedCategory}</span> : 'All Restaurants'}
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-col gap-4 sm:flex-row sm:items-center mb-8"
        >
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search restaurants or cuisines..." className="pl-10 rounded-xl glass-card border-border/50 focus:neon-border transition-all" value={query} onChange={e => setQuery(e.target.value)} />
          </div>
          <div className="flex gap-2">
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-[140px] rounded-xl glass-card border-border/50"><SelectValue placeholder="Category" /></SelectTrigger>
              <SelectContent className="glass-strong rounded-xl border-border/50">
                <SelectItem value="all">All</SelectItem>
                {categories.map(c => <SelectItem key={c.id} value={c.name}>{c.icon} {c.name}</SelectItem>)}
              </SelectContent>
            </Select>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[150px] rounded-xl glass-card border-border/50"><SelectValue placeholder="Sort by" /></SelectTrigger>
              <SelectContent className="glass-strong rounded-xl border-border/50">
                <SelectItem value="relevance">Relevance</SelectItem>
                <SelectItem value="rating">Top Rated</SelectItem>
                <SelectItem value="delivery">Fastest Delivery</SelectItem>
                <SelectItem value="price">Lowest Fee</SelectItem>
              </SelectContent>
            </Select>
            <div className="hidden sm:flex glass-card rounded-xl overflow-hidden neon-border">
              <Button variant={view === 'grid' ? 'secondary' : 'ghost'} size="icon" className="h-9 w-9 rounded-none" onClick={() => setView('grid')}><Grid3X3 className="h-4 w-4" /></Button>
              <Button variant={view === 'list' ? 'secondary' : 'ghost'} size="icon" className="h-9 w-9 rounded-none" onClick={() => setView('list')}><List className="h-4 w-4" /></Button>
            </div>
          </div>
        </motion.div>

        {filtered.length === 0 ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-20 text-center">
            <div className="flex h-24 w-24 mx-auto items-center justify-center rounded-3xl glass-card neon-border mb-4">
              <Search className="h-12 w-12 text-muted-foreground" />
            </div>
            <p className="text-xl font-heading font-bold">No restaurants found</p>
            <p className="text-muted-foreground mt-2">Try adjusting your search or filters</p>
          </motion.div>
        ) : (
          <div className={view === 'grid' ? 'grid gap-6 sm:grid-cols-2 lg:grid-cols-3' : 'space-y-4'}>
            {filtered.map((r, i) => <RestaurantCard key={r.id} restaurant={r} index={i} />)}
          </div>
        )}
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="mt-6 text-sm text-muted-foreground glass-card inline-block rounded-full px-4 py-2 neon-border">
          {filtered.length} restaurant{filtered.length !== 1 ? 's' : ''} found
        </motion.p>
      </div>
    </PageWrapper>
  );
};

export default SearchPage;
