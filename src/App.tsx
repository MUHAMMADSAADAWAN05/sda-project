import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { CartProvider } from "@/context/CartContext";
import { ThemeProvider } from "@/context/ThemeContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
<<<<<<< HEAD
=======
import BackToWelcome from "@/components/BackToWelcome";
>>>>>>> 9ff8e9ec60d7bfcd236ee7588f3d2e9a4fc2ba55
import SplashScreen from "./pages/SplashScreen";
import Index from "./pages/Index";
import SearchPage from "./pages/SearchPage";
import RestaurantDetail from "./pages/RestaurantDetail";
import Checkout from "./pages/Checkout";
import OrderTracking from "./pages/OrderTracking";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Account from "./pages/Account";
import Orders from "./pages/Orders";
import Dashboard from "./pages/Dashboard";
import Driver from "./pages/Driver";
import Admin from "./pages/Admin";
import About from "./pages/About";
import Blog from "./pages/Blog";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
    <TooltipProvider>
      <CartProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
<<<<<<< HEAD
            <Route path="/" element={<SplashScreen />} />
=======
            <Route path="/welcome" element={<SplashScreen />} />
>>>>>>> 9ff8e9ec60d7bfcd236ee7588f3d2e9a4fc2ba55
            <Route path="*" element={
              <div className="flex min-h-screen flex-col">
                <Header />
                <main className="flex-1">
                  <Routes>
<<<<<<< HEAD
                    <Route path="/customer" element={<Index />} />
=======
                    <Route path="/" element={<Index />} />
>>>>>>> 9ff8e9ec60d7bfcd236ee7588f3d2e9a4fc2ba55
                    <Route path="/search" element={<SearchPage />} />
                    <Route path="/restaurant/:id" element={<RestaurantDetail />} />
                    <Route path="/checkout" element={<Checkout />} />
                    <Route path="/tracking/:orderId" element={<OrderTracking />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/account" element={<Account />} />
                    <Route path="/orders" element={<Orders />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/driver" element={<Driver />} />
                    <Route path="/admin" element={<Admin />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/blog" element={<Blog />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </main>
                <Footer />
                <CartDrawer />
<<<<<<< HEAD
=======
                <BackToWelcome />
>>>>>>> 9ff8e9ec60d7bfcd236ee7588f3d2e9a4fc2ba55
              </div>
            } />
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
