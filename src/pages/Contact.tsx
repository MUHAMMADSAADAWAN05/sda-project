import { motion } from 'framer-motion';
import { PageWrapper } from '@/components/PageWrapper';
import { Mail, Phone, MapPin, MessageCircle, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useState } from 'react';
import { toast } from 'sonner';

const Contact = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    toast.success('Message sent! We\'ll get back to you soon.');
  };

  return (
    <PageWrapper>
      <div className="min-h-screen">
        <section className="relative overflow-hidden gradient-hero py-20 md:py-28">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-primary/8 blur-[120px]" />
            <div className="absolute -right-32 top-16 h-80 w-80 rounded-full bg-accent/10 blur-[100px]" />
          </div>
          <div className="container relative text-center">
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl font-heading font-extrabold md:text-6xl">
              Get in <span className="text-gradient">Touch</span>
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              Have a question or feedback? We'd love to hear from you.
            </motion.p>
          </div>
        </section>

        <section className="container py-16">
          <div className="grid gap-10 lg:grid-cols-2 max-w-5xl mx-auto">
            {/* Contact Info */}
            <div className="space-y-6">
              <h2 className="text-2xl font-heading font-bold">Let's <span className="text-gradient">Connect</span></h2>
              <p className="text-muted-foreground">Our team is available 24/7 to help with any questions about orders, partnerships, or driving with CraviX.</p>

              {[
                { icon: Mail, label: 'Email', value: 'support@cravix.com' },
                { icon: Phone, label: 'Phone', value: '+1 (555) 123-4567' },
                { icon: MapPin, label: 'Address', value: '100 Innovation Drive, San Francisco, CA 94105' },
                { icon: MessageCircle, label: 'Live Chat', value: 'Available 24/7 in the app' },
              ].map((item, i) => (
                <motion.div key={item.label} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="flex items-start gap-4 glass-card neon-border rounded-2xl p-4 shadow-card hover:shadow-card-hover transition-all">
                  <div className="h-10 w-10 shrink-0 rounded-xl gradient-warm neon-glow-primary flex items-center justify-center">
                    <item.icon className="h-5 w-5 text-primary-foreground" />
                  </div>
                  <div>
                    <p className="font-heading font-bold text-sm">{item.label}</p>
                    <p className="text-sm text-muted-foreground">{item.value}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Contact Form */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="glass-card neon-border rounded-3xl p-8 shadow-card-hover">
              {submitted ? (
                <div className="flex flex-col items-center justify-center h-full gap-4 text-center py-10">
                  <div className="h-16 w-16 rounded-2xl gradient-warm neon-glow-primary flex items-center justify-center">
                    <Send className="h-8 w-8 text-primary-foreground" />
                  </div>
                  <h3 className="text-xl font-heading font-bold">Message Sent!</h3>
                  <p className="text-muted-foreground">Thank you for reaching out. We'll respond within 24 hours.</p>
                  <Button variant="outline" className="rounded-xl neon-border" onClick={() => setSubmitted(false)}>Send Another</Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <h3 className="text-xl font-heading font-bold">Send us a message</h3>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label className="font-heading font-semibold">Name</Label>
                      <Input placeholder="Your name" className="rounded-xl glass-card border-border/50 focus:neon-border" required />
                    </div>
                    <div className="space-y-2">
                      <Label className="font-heading font-semibold">Email</Label>
                      <Input type="email" placeholder="you@example.com" className="rounded-xl glass-card border-border/50 focus:neon-border" required />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label className="font-heading font-semibold">Subject</Label>
                    <Input placeholder="How can we help?" className="rounded-xl glass-card border-border/50 focus:neon-border" required />
                  </div>
                  <div className="space-y-2">
                    <Label className="font-heading font-semibold">Message</Label>
                    <Textarea placeholder="Tell us more..." rows={5} className="rounded-xl glass-card border-border/50 focus:neon-border resize-none" required />
                  </div>
                  <Button type="submit" className="w-full gradient-warm rounded-xl neon-glow-primary hover:shadow-xl transition-all" size="lg">
                    <Send className="h-4 w-4 mr-2" /> Send Message
                  </Button>
                </form>
              )}
            </motion.div>
          </div>
        </section>
      </div>
    </PageWrapper>
  );
};

export default Contact;
