import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import MenuCard from "@/components/MenuCard";
import { useCart } from "@/contexts/CartContext";
import { menuItems } from "@/data/menuItems";
import heroImage from "@/assets/hero-image.jpg";
import {
  ArrowRight,
  Clock,
  Award,
  Truck,
  Menu,
  X,
  ShoppingCart,
} from "lucide-react";

const Home = () => {
  const { addToCart } = useCart();
  const featuredItems = menuItems.slice(0, 3);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <header className="fixed top-0 left-0 w-full bg-white z-50 shadow-sm">
        <div className="container mx-auto flex justify-between items-center px-4 md:px-8 py-2">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-orange-500">
            Delicious <span className="text-black">Bites</span>
          </Link>

          {/* Desktop Menu */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="hover:text-orange-500 transition-colors">
              Home
            </Link>
            <Link to="/menu" className="hover:text-orange-500 transition-colors">
              Menu
            </Link>
               
            <Link to="/about" className="hover:text-orange-500 transition-colors">
              About
            </Link>
            <Link
              to="/services"
              className="hover:text-orange-500 transition-colors"
            >
              Services
            </Link>
            <Link
              to="/contact"
              className="hover:text-orange-500 transition-colors"
            >
              Contact
            </Link>
          </nav>

          {/* Right Section */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/cart" className="hover:text-orange-500">
              <ShoppingCart className="w-5 h-5" />
            </Link>
            <Link to="/login" className="hover:text-orange-500">
              Login
            </Link>
            <Link
              to="/Register"
              className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-5 py-2 rounded-md transition-colors"
            >
              Sign Up
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-gray-700"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Dropdown */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t shadow-md">
            <nav className="flex flex-col items-center space-y-4 py-4">
              <Link to="/" onClick={() => setIsMenuOpen(false)}>
                Home
              </Link>
              <Link to="/menu" onClick={() => setIsMenuOpen(false)}>
                Menu
              </Link>
               
              <Link to="/about" onClick={() => setIsMenuOpen(false)}>
                About
              </Link>
              <Link to="/services" onClick={() => setIsMenuOpen(false)}>
                Services
              </Link>
              <Link to="/contact" onClick={() => setIsMenuOpen(false)}>
                Contact
              </Link>
              <div className="flex items-center space-x-4">
                <Link to="/cart" onClick={() => setIsMenuOpen(false)}>
                  <ShoppingCart className="w-5 h-5" />
                </Link>
                <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                  Login
                </Link>
                <Link
                  to="/Register"
                  onClick={() => setIsMenuOpen(false)}
                  className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-4 py-2 rounded-md transition-colors"
                >
                  Sign Up
                </Link>
              </div>
            </nav>
          </div>
        )}
      </header>

      {/* Hero Section (no white gap) */}
      <section className="relative h-[600px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="Delicious restaurant dishes"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background/90 to-background/50" />
        </div>

        <div className="relative z-10 container mx-auto px-4 text-center mt-[64px]">
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-6 bg-hero-gradient bg-clip-text text-transparent">
            Delicious Food,
            <br className="hidden sm:block" />
            Delivered Fast
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Experience the finest cuisine from our kitchen to your doorstep
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/menu">
              <Button size="lg" className="text-lg px-8 w-full sm:w-auto">
                Order Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/about">
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8 w-full sm:w-auto"
              >
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 sm:py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-4">
                <Clock className="h-8 w-8" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold mb-2">
                Fast Delivery
              </h3>
              <p className="text-muted-foreground">
                Get your food delivered within 30 minutes
              </p>
            </div>
            <div className="text-center p-6">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-4">
                <Award className="h-8 w-8" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold mb-2">
                Quality Food
              </h3>
              <p className="text-muted-foreground">
                Fresh ingredients and expert preparation
              </p>
            </div>
            <div className="text-center p-6">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-4">
                <Truck className="h-8 w-8" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold mb-2">
                Free Shipping
              </h3>
              <p className="text-muted-foreground">
                Free delivery on orders over $30
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Menu Items */}
      <section className="py-16 sm:py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10 sm:mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Featured Dishes
            </h2>
            <p className="text-lg sm:text-xl text-muted-foreground">
              Try our customer favorites
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 mb-8">
            {featuredItems.map((item) => (
              <MenuCard key={item.id} item={item} onAddToCart={addToCart} />
            ))}
          </div>

          <div className="text-center">
            <Link to="/menu">
              <Button size="lg" className="px-8">
                View Full Menu
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
