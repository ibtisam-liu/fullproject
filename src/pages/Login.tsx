import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { ShoppingCart, Menu, X } from "lucide-react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsLoading(true);

  try {
    const res = await axios.post("http://localhost:5000/api/login", {
      email,
      password,
    });

    toast.success("Logged in successfully!");

    if (res.data.token) {
      localStorage.setItem("token", res.data.token);
    }

    // Decode JWT
    const token = res.data.token;
    const decoded = JSON.parse(atob(token.split(".")[1]));

    // Role redirection
    if (decoded.role === "admin") {
      navigate("/admin/menu/add");
    } else {
      navigate("/");
    }

  } catch (error: any) {
    if (error.response?.data?.error === "Invalid email or password") {
      toast.error("Invalid email or password");
    } else {
      toast.error("Login failed. Try again.");
    }
  } finally {
    setIsLoading(false);
  }
};

  /* ========= NAVBAR ========= */
  const Navbar = () => (
    <header className="fixed top-0 left-0 w-full bg-white shadow-sm z-50">
      <div className="container mx-auto flex justify-between items-center px-4 md:px-8 py-2">
        <Link to="/" className="text-2xl font-bold text-orange-500">
          Delicious <span className="text-black">Bites</span>
        </Link>

        <nav className="hidden md:flex items-center space-x-8">
          <Link to="/" className="hover:text-orange-500">Home</Link>
          <Link to="/menu" className="hover:text-orange-500">Menu</Link>
          <Link to="/about" className="hover:text-orange-500">About</Link>
          <Link to="/services" className="hover:text-orange-500">Services</Link>
          <Link to="/contact" className="hover:text-orange-500">Contact</Link>
        </nav>

        <div className="hidden md:flex items-center space-x-6">
          <Link to="/cart" className="hover:text-orange-500">
            <ShoppingCart className="w-5 h-5" />
          </Link>
          <Link to="/login" className="text-orange-500 font-medium">
            Login
          </Link>
          <Link
            to="/Register"
            className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-5 py-2 rounded-md transition-colors"
          >
            Sign Up
          </Link>
        </div>

        <button
          className="md:hidden p-2 text-gray-800"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

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
                className="hover:text-orange-500"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );

  /* ========= LOGIN PAGE CONTENT ========= */
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <div className="min-h-[80vh] flex items-center justify-center px-4 py-12 pt-28">
        <Card className="w-full max-w-md shadow-md">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-orange-500">
              Welcome Back
            </CardTitle>
            <CardDescription>
              Login to your account to continue
            </CardDescription>
          </CardHeader>

          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </CardContent>

            <CardFooter className="flex flex-col gap-4">
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Logging in..." : "Login"}
              </Button>

              <p className="text-sm text-gray-500 text-center">
                Don't have an account?{" "}
                <Link to="/register" className="text-orange-500 hover:underline">
                  Sign up
                </Link>
              </p>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default Login;
