import { motion } from 'framer-motion';
import { PageWrapper } from '@/components/PageWrapper';
import { Calendar, ArrowRight, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';

const posts = [
  { title: 'How CraviX is Revolutionizing Food Delivery', excerpt: 'Our AI-powered routing system reduces delivery times by 40%, ensuring your food arrives hot and fresh every single time.', date: 'Mar 15, 2024', readTime: '5 min', img: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&h=400&fit=crop', tag: 'Technology' },
  { title: 'Top 10 Restaurants You Must Try This Spring', excerpt: 'From artisan pizzerias to authentic sushi bars, discover the must-try restaurants that CraviX users are raving about.', date: 'Mar 10, 2024', readTime: '4 min', img: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&h=400&fit=crop', tag: 'Food' },
  { title: 'Behind the Scenes: A Day in the Life of a CraviX Driver', excerpt: 'Meet Alex, one of our top-rated drivers who delivers over 30 orders daily while maintaining a perfect 5-star rating.', date: 'Mar 5, 2024', readTime: '6 min', img: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&h=400&fit=crop', tag: 'Stories' },
  { title: 'Sustainable Packaging: Our Green Initiative', excerpt: 'We\'re committed to reducing our carbon footprint. Learn about our switch to 100% biodegradable packaging materials.', date: 'Feb 28, 2024', readTime: '3 min', img: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=600&h=400&fit=crop', tag: 'Sustainability' },
  { title: 'New Feature: Group Ordering Made Easy', excerpt: 'Order together with friends and split the bill automatically. Group ordering is now available in all 200+ cities.', date: 'Feb 20, 2024', readTime: '3 min', img: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&h=400&fit=crop', tag: 'Product' },
  { title: 'Restaurant Success Story: From Local to National', excerpt: 'How Mario\'s Pizzeria grew from a single location to a 15-city franchise with CraviX\'s restaurant partner program.', date: 'Feb 15, 2024', readTime: '7 min', img: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&h=400&fit=crop', tag: 'Partners' },
];

const Blog = () => (
  <PageWrapper>
    <div className="min-h-screen">
      <section className="relative overflow-hidden gradient-hero py-20 md:py-28">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-primary/8 blur-[120px]" />
          <div className="absolute -right-32 top-16 h-80 w-80 rounded-full bg-accent/10 blur-[100px]" />
        </div>
        <div className="container relative text-center">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl font-heading font-extrabold md:text-6xl">
            The <span className="text-gradient">CraviX</span> Blog
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Stories, updates, and insights from the world of food delivery.
          </motion.p>
        </div>
      </section>

      <section className="container py-16">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post, i) => (
            <motion.article key={post.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} whileHover={{ y: -6 }} className="glass-card neon-border rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-all group cursor-pointer">
              <div className="relative overflow-hidden h-48">
                <img src={post.img} alt={post.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                <div className="absolute top-3 left-3">
                  <span className="text-xs font-bold px-3 py-1 rounded-full gradient-warm text-primary-foreground">{post.tag}</span>
                </div>
              </div>
              <div className="p-5 space-y-3">
                <h3 className="font-heading font-bold text-lg leading-tight group-hover:text-primary transition-colors">{post.title}</h3>
                <p className="text-sm text-muted-foreground line-clamp-2">{post.excerpt}</p>
                <div className="flex items-center justify-between text-xs text-muted-foreground pt-2">
                  <div className="flex items-center gap-1"><Calendar className="h-3 w-3" /> {post.date}</div>
                  <div className="flex items-center gap-1"><Clock className="h-3 w-3" /> {post.readTime}</div>
                </div>
                <Button variant="ghost" size="sm" className="gap-1 text-primary font-semibold p-0 h-auto group/btn">
                  Read more <ArrowRight className="h-3 w-3 transition-transform group-hover/btn:translate-x-1" />
                </Button>
              </div>
            </motion.article>
          ))}
        </div>
      </section>
    </div>
  </PageWrapper>
);

export default Blog;
