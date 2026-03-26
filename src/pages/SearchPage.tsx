import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, SlidersHorizontal, Grid3X3, List, Star } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import RestaurantCard from '@/components/RestaurantCard';
import { restaurants, categories } from '@/data/mockData';

const SearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
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
    <div className="container py-8">
      <h1 className="text-3xl font-heading font-bold mb-6">
        {query ? `Results for "${query}"` : selectedCategory !== 'all' ? selectedCategory : 'All Restaurants'}
      </h1>

      {/* Filters */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center mb-8">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Search restaurants or cuisines..." className="pl-10" value={query} onChange={e => setQuery(e.target.value)} />
        </div>
        <div className="flex gap-2">
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-[140px]"><SelectValue placeholder="Category" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              {categories.map(c => <SelectItem key={c.id} value={c.name}>{c.icon} {c.name}</SelectItem>)}
            </SelectContent>
          </Select>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[150px]"><SelectValue placeholder="Sort by" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="relevance">Relevance</SelectItem>
              <SelectItem value="rating">Top Rated</SelectItem>
              <SelectItem value="delivery">Fastest Delivery</SelectItem>
              <SelectItem value="price">Lowest Fee</SelectItem>
            </SelectContent>
          </Select>
          <div className="hidden sm:flex border rounded-lg">
            <Button variant={view === 'grid' ? 'secondary' : 'ghost'} size="icon" className="h-9 w-9" onClick={() => setView('grid')}><Grid3X3 className="h-4 w-4" /></Button>
            <Button variant={view === 'list' ? 'secondary' : 'ghost'} size="icon" className="h-9 w-9" onClick={() => setView('list')}><List className="h-4 w-4" /></Button>
          </div>
        </div>
      </div>

      {/* Results */}
      {filtered.length === 0 ? (
        <div className="py-20 text-center">
          <p className="text-xl font-heading font-semibold">No restaurants found</p>
          <p className="text-muted-foreground mt-2">Try adjusting your search or filters</p>
        </div>
      ) : (
        <div className={view === 'grid' ? 'grid gap-6 sm:grid-cols-2 lg:grid-cols-3' : 'space-y-4'}>
          {filtered.map(r => <RestaurantCard key={r.id} restaurant={r} />)}
        </div>
      )}
      <p className="mt-6 text-sm text-muted-foreground">{filtered.length} restaurant{filtered.length !== 1 ? 's' : ''} found</p>
    </div>
  );
};

export default SearchPage;
