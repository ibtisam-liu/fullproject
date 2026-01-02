import { useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, Menu, X, Users, Heart, Award, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const About = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      {/* ================= Navbar ================= */}
      <header className="fixed top-0 left-0 w-full bg-white shadow-sm z-50">
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

          {/* Right Side */}
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
            className="md:hidden p-2 text-gray-800"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Dropdown */}
        {isOpen && (
          <div className="md:hidden bg-white border-t shadow-md">
            <div className="flex flex-col items-center py-6 space-y-4">
              <Link
                to="/"
                className="hover:text-orange-500 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/menu"
                className="hover:text-orange-500 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Menu
              </Link>
              
              <Link
                to="/about"
                className="hover:text-orange-500 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                About
              </Link>
              <Link
                to="/services"
                className="hover:text-orange-500 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Services
              </Link>
              <Link
                to="/contact"
                className="hover:text-orange-500 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Contact
              </Link>
              <div className="flex items-center space-x-4 pt-4 border-t">
                <Link to="/cart" onClick={() => setIsOpen(false)}>
                  <ShoppingCart className="w-5 h-5 text-gray-700" />
                </Link>
                <Link
                  to="/login"
                  onClick={() => setIsOpen(false)}
                  className="hover:text-orange-500"
                >
                  Login
                </Link>
                <Link
                  to="/Register"
                  onClick={() => setIsOpen(false)}
                  className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-4 py-2 rounded-md transition-colors"
                >
                  Sign Up
                </Link>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* ================= About Section ================= */}
      <main className="pt-24 pb-20 container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4 text-orange-500">
            About Us
          </h1>
          <p className="text-lg sm:text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed">
            Serving delicious food with passion and dedication since 2024
          </p>
        </div>

        {/* Story + Highlights */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 mb-20">
          {/* Our Story */}
          <div>
            <h2 className="text-3xl font-bold mb-6 text-gray-900">Our Story</h2>
            <div className="space-y-5 text-gray-600 leading-relaxed">
              <p>
                <span className="font-semibold text-gray-800">
                  Delicious Bites
                </span>{" "}
                was founded with a simple mission — to bring the finest
                culinary experiences right to your doorstep. What started as a
                small family kitchen has grown into one of Beirut’s most beloved
                food destinations.
              </p>
              <p>
                Our chefs blend traditional recipes with modern techniques,
                using only the freshest ingredients from trusted local suppliers.
                Every dish is prepared with care and precision, ensuring each
                bite is a flavorful delight.
              </p>
              <p>
                We believe great food brings people together. Whether you’re
                celebrating, relaxing, or sharing a meal with loved ones, we’re
                committed to making every dining experience unforgettable.
              </p>
            </div>
          </div>

          {/* Feature Cards */}
          <div className="space-y-6">
            {[
              {
                icon: <Heart className="h-6 w-6 text-orange-500" />,
                title: "Made with Love",
                desc: "Every dish is crafted with passion and attention to detail.",
              },
              {
                icon: <Award className="h-6 w-6 text-orange-500" />,
                title: "Quality Ingredients",
                desc: "We source only the freshest, highest-quality ingredients.",
              },
              {
                icon: <Users className="h-6 w-6 text-orange-500" />,
                title: "Expert Chefs",
                desc: "Our talented chefs bring creativity and skill to every dish.",
              },
              {
                icon: <Clock className="h-6 w-6 text-orange-500" />,
                title: "Fast Service",
                desc: "Quick preparation and delivery without compromising quality.",
              },
            ].map((item, index) => (
              <Card
                key={index}
                className="hover:shadow-lg transition-shadow duration-300"
              >
                <CardContent className="p-6 flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-orange-100">{item.icon}</div>
                  <div>
                    <h3 className="text-xl font-semibold mb-1 text-gray-900">
                      {item.title}
                    </h3>
                    <p className="text-gray-600">{item.desc}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Mission Section */}
        <div className="bg-orange-500 rounded-2xl p-10 sm:p-14 text-center text-white shadow-lg">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Our Mission</h2>
          <p className="text-lg sm:text-xl max-w-3xl mx-auto leading-relaxed opacity-95">
            To provide exceptional dining experiences through quality food,
            excellent service, and a heartfelt commitment to customer
            satisfaction. At Delicious Bites, every meal is made to delight —
            and every customer is part of our family.
          </p>
        </div>
      </main>
    </div>
  );
};

export default About;
