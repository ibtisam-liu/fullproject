import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Map from "@/components/Map";
import {
  Mail,
  Phone,
  MapPin,
  ShoppingCart,
  Menu,
  X,
} from "lucide-react";
import { toast } from "sonner";

const Contact = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Message sent successfully! We'll get back to you soon.");
    setFormData({ name: "", email: "", message: "" });
  };

  /* ========== NAVBAR ========== */
  const Navbar = () => (
    <header className="fixed top-0 left-0 w-full bg-white shadow-sm z-50">
      <div className="container mx-auto flex justify-between items-center px-4 md:px-8 py-2">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-orange-500">
          Delicious <span className="text-black">Bites</span>
        </Link>

        {/* Desktop Navigation */}
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
                className="hover:text-orange-500 transition-colors"
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

  /* ========== CONTACT PAGE CONTENT ========== */
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="container mx-auto px-4 pt-24 pb-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4 text-orange-500">
            Contact Us
          </h1>
          <p className="text-lg sm:text-xl text-gray-500">
            Get in touch with us
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
          {/* Form Section */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Send us a message</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      rows={5}
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full">
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Contact Info Section */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-4">
                  <MapPin className="h-5 w-5 text-orange-500 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-1">Address</h3>
                    <p className="text-gray-600">
                      Salim Slem, Beirut
                      <br />
                      Lebanon
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Phone className="h-5 w-5 text-orange-500 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-1">Phone</h3>
                    <p className="text-gray-600">+961 XXX XXX</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Mail className="h-5 w-5 text-orange-500 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-1">Email</h3>
                    <p className="text-gray-600">info@deliciousbites.com</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Opening Hours</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Monday - Friday</span>
                    <span className="font-semibold">10:00 AM - 10:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Saturday - Sunday</span>
                    <span className="font-semibold">9:00 AM - 11:00 PM</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Map Section */}
        <div>
          <h2 className="text-3xl font-bold mb-6">Find Us</h2>
          <Map />
        </div>
      </div>
    </div>
  );
};

export default Contact;
