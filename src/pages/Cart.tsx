import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import {
  Minus,
  Plus,
  Trash2,
  ShoppingBag,
  ShoppingCart,
  Menu,
  X,
} from "lucide-react";
import axios from "axios";
import { toast } from "sonner";

const Cart = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartItems, setCartItems] = useState<any[]>([]);
  const { user } = useAuth();
  const navigate = useNavigate();

  // --------- helper: read user from JWT token ----------
  const getUserFromToken = () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return null;

      const payloadBase64 = token.split(".")[1];
      const payload = JSON.parse(atob(payloadBase64));
      return payload; // { id, email, name, role, ... }
    } catch (err) {
      console.error("Error decoding token:", err);
      return null;
    }
  };

  /* ======================================================
     FETCH CART FROM DATABASE
  ====================================================== */
  useEffect(() => {
    const tokenUser = getUserFromToken();
    const currentUserId = tokenUser?.id || user?.id;

    if (!currentUserId) {
      console.log("No logged in user, cannot load cart");
      return;
    }

    axios
      .get(`http://localhost:5000/api/cart/${currentUserId}`)
      .then((res) => {
        console.log("Cart API result:", res.data);
        const formatted = res.data.map((item: any) => ({
          ...item,
          price: Number(item.price) || 0,
          quantity: Number(item.quantity) || 0,
          image: item.image
            ? `http://localhost:5000/uploads/${item.image}`
            : "/placeholder.jpg",
        }));
        setCartItems(formatted);
      })
      .catch((err) => console.log("Cart fetch error:", err));
  }, [user]);

  /* ======================================================
     UPDATE QUANTITY (DATABASE)
  ====================================================== */
  const updateQty = async (item: any, newQty: number) => {
    if (newQty < 1) return;

    await axios.post("http://localhost:5000/api/cart/update", {
      id: item.id,
      quantity: newQty,
    });

    setCartItems((prev) =>
      prev.map((i) => (i.id === item.id ? { ...i, quantity: newQty } : i))
    );
  };

  /* ======================================================
     REMOVE FROM CART (DATABASE)
  ====================================================== */
  const removeItem = async (id: number) => {
    await axios.delete(`http://localhost:5000/api/cart/delete/${id}`);

    setCartItems((prev) => prev.filter((i) => i.id !== id));
  };

  /* ======================================================
     CART TOTAL
  ====================================================== */
  const total = cartItems.reduce(
    (sum, item) => sum + Number(item.price) * Number(item.quantity),
    0
  );

  /* ======================================================
     CHECKOUT
  ====================================================== */
  const handleCheckout = () => {
    const tokenUser = getUserFromToken();
    const currentUserId = tokenUser?.id || user?.id;

    if (!currentUserId) {
      toast.error("Please login to place an order");
      navigate("/login");
      return;
    }

    toast.success("Order placed successfully!");
    navigate("/orders");
  };

  /* ======================== NAVBAR ======================== */
  const Navbar = () => (
    <header className="fixed top-0 left-0 w-full bg-white shadow-sm z-50">
      <div className="container mx-auto flex justify-between items-center px-4 md:px-8 py-2">
        <Link to="/" className="text-2xl font-bold text-orange-500">
          Delicious <span className="text-black">Bites</span>
        </Link>

        <nav className="hidden md:flex items-center space-x-8">
          <Link to="/">Home</Link>
          <Link to="/menu">Menu</Link>
         
          <Link to="/about">About</Link>
          <Link to="/services">Services</Link>
          <Link to="/contact">Contact</Link>
        </nav>

        <div className="hidden md:flex items-center space-x-6">
          <Link to="/cart">
            <ShoppingCart className="w-5 h-5" />
          </Link>
          <Link to="/login">Login</Link>
          <Link
            to="/Register"
            className="bg-orange-500 text-white px-5 py-2 rounded-md"
          >
            Sign Up
          </Link>
        </div>

        <button
          className="md:hidden p-2 text-gray-800"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X /> : <Menu />}
        </button>
      </div>
    </header>
  );

  /* ======================== EMPTY CART ======================== */
  if (cartItems.length === 0) {
    return (
      <div>
        <Navbar />
        <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 pt-24">
          <ShoppingBag className="h-24 w-24 text-gray-400 mb-6" />
          <h2 className="text-3xl font-bold mb-4">Your cart is empty</h2>
          <Link to="/menu">
            <Button size="lg">Browse Menu</Button>
          </Link>
        </div>
      </div>
    );
  }

  /* ======================== CART CONTENT ======================== */
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <div className="container mx-auto px-4 pt-24 pb-12">
        <h1 className="text-4xl font-bold mb-8">Shopping Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <Card key={item.id}>
                <CardContent className="p-6">
                  <div className="flex gap-6">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-24 h-24 object-cover rounded-lg"
                    />

                    <div className="flex-1">
                      <h3 className="text-xl font-semibold mb-2">
                        {item.name}
                      </h3>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => updateQty(item, item.quantity - 1)}
                          >
                            <Minus className="h-4 w-4" />
                          </Button>

                          <span className="text-lg font-semibold w-8 text-center">
                            {item.quantity}
                          </span>

                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => updateQty(item, item.quantity + 1)}
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>

                        <div className="flex items-center gap-4">
                          <span className="text-xl font-bold">
                            ${(Number(item.price) * Number(item.quantity)).toFixed(2)}
                          </span>

                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => removeItem(item.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>

              <CardContent>
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-bold">${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between mt-3">
                  <span>Delivery</span>
                  <span className="font-bold">$5.00</span>
                </div>
                <div className="border-t pt-4 mt-4 flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span>${(total + 5).toFixed(2)}</span>
                </div>
              </CardContent>

              <CardFooter>
                <Button className="w-full" size="lg" onClick={handleCheckout}>
                  Proceed to Checkout
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
