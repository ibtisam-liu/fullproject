import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Truck,
  Calendar,
  Users,
  Gift,
  Shield,
  Clock,
  ShoppingCart,
  Menu,
  X,
} from "lucide-react";

const Services = () => {
  const [isOpen, setIsOpen] = useState(false);

  const services = [
    {
      icon: Truck,
      title: "Fast Delivery",
      description:
        "Get your food delivered hot and fresh within 30 minutes to your doorstep.",
    },
    {
      icon: Calendar,
      title: "Pre-order Service",
      description:
        "Schedule your orders in advance for parties, events, or busy days.",
    },
    {
      icon: Users,
      title: "Catering Services",
      description:
        "Large orders for events, parties, and corporate gatherings with special pricing.",
    },
    {
      icon: Gift,
      title: "Loyalty Program",
      description:
        "Earn points with every order and redeem them for discounts and free items.",
    },
    {
      icon: Shield,
      title: "Quality Guarantee",
      description:
        "Not satisfied? We offer a 100 % satisfaction guarantee on all orders.",
    },
    {
      icon: Clock,
      title: "24/7 Support",
      description:
        "Our customer service team is always available to help with your orders.",
    },
  ];

  /* ========= NAVBAR ========= */
  const Navbar = () => (
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
            className="text-orange-500 font-semibold transition-colors"
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
            {[
              { name: "Home", path: "/" },
              { name: "Menu", path: "/menu" },
              { name: "About", path: "/about" },
              { name: "Services", path: "/services" },
              { name: "Contact", path: "/contact" },
            ].map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`transition-colors ${
                  link.name === "Services"
                    ? "text-orange-500 font-semibold"
                    : "hover:text-orange-500"
                }`}
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}

            <div className="flex items-center space-x-4 pt-4 border-t">
              <Link
                to="/cart"
                onClick={() => setIsOpen(false)}
                className="hover:text-orange-500"
              >
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
  );

  /* ========= MAIN CONTENT ========= */
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <div className="container mx-auto px-4 pt-24 pb-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4 text-orange-500">
            Our Services
          </h1>
          <p className="text-lg sm:text-xl text-gray-500 max-w-2xl mx-auto">
            We offer a range of services to make your dining experience
            exceptional
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {services.map((service, index) => (
            <Card
              key={index}
              className="p-6 border hover:shadow-lg transition-all duration-300"
            >
              <CardHeader className="text-center">
                <div className="mb-4 inline-flex p-3 rounded-lg bg-orange-100">
                  <service.icon className="h-8 w-8 text-orange-500" />
                </div>
                <CardTitle className="text-lg font-semibold mb-2">
                  {service.title}
                </CardTitle>
                <CardDescription className="text-base text-gray-600">
                  {service.description}
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>

        {/* Why Choose Us */}
        <div className="bg-orange-500 text-white rounded-2xl p-10 sm:p-14 shadow-md">
          <div className="max-w-3xl mx-auto text-center space-y-5">
            <h2 className="text-3xl font-bold mb-2">Why Choose Us?</h2>
            <p className="opacity-95 leading-relaxed">
              At Delicious Bites, we're committed to providing more than just
              food. We deliver a complete dining experience that combines
              quality, convenience, and excellent service.
            </p>
            <p className="opacity-95 leading-relaxed">
              Our team ensures every order meets our high standards — from
              sourcing ingredients to final delivery, maintaining quality
              control every step of the way.
            </p>
            <p className="opacity-95 leading-relaxed">
              Join thousands of satisfied customers who trust us for their daily meals,
              special occasions, and everything in between.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
