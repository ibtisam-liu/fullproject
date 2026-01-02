import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import MenuCard from "@/components/MenuCard";
import { ShoppingCart, Menu, X } from "lucide-react";

const MenuPage = () => {
  const [menuItems, setMenuItems] = useState<any[]>([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [isOpen, setIsOpen] = useState(false);

  /* ============================================================
     FETCH MENU FROM BACKEND
  ============================================================ */
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/menu")
      .then((res) => {
        const fixedData = res.data.map((item: any) => ({
          ...item,
          price: Number(item.price) || 0,
          image: item.image
            ? item.image.startsWith("http")
              ? item.image
              : `http://localhost:5000/uploads/${item.image}`
            : "/placeholder.jpg",
        }));
        setMenuItems(fixedData);
      })
      .catch((err) => console.log("Menu fetch error:", err));
  }, []);

  /* ============================================================
     CREATE CATEGORY LIST
  ============================================================ */
  const categories = [
    "All",
    ...new Set(
      menuItems.map((item) =>
        item.category ? item.category : "Uncategorized"
      )
    ),
  ];

  /* ============================================================
     FILTER ITEMS
  ============================================================ */
  const filteredItems =
    activeCategory === "All"
      ? menuItems
      : menuItems.filter((item) => item.category === activeCategory);

  /* ============================================================
     DECODE JWT FOR USER ID
  ============================================================ */
  const decodeToken = () => {
    const token = localStorage.getItem("token");
    if (!token) return null;
    try {
      const payload = token.split(".")[1];
      return JSON.parse(atob(payload));
    } catch {
      return null;
    }
  };

  /* ============================================================
     ADD TO CART
  ============================================================ */
 const handleAddToCart = async (item: any) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login first.");
      return;
    }

    const payload = JSON.parse(atob(token.split(".")[1])); // { id, ... }

    const res = await axios.post("http://localhost:5000/api/cart/add", {
      user_id: payload.id,
      item_id: item.id,
      name: item.name,
      price: item.price,
      quantity: 1,
    });

    console.log("Add to cart response:", res.data);
    alert("Item added to cart!");
  } catch (err: any) {
    console.error("Add to cart error:", err.response?.data || err);
    alert(
      "Failed to add item to cart: " +
        (err.response?.data?.error || "server error")
    );
  }
};


  /* ============================================================
     NAVBAR
  ============================================================ */
  const Navbar = () => (
    <header className="fixed top-0 left-0 w-full bg-white shadow-sm z-50">
      <div className="container mx-auto flex justify-between items-center px-4 md:px-8 py-2">
        <Link to="/" className="text-2xl font-bold text-orange-500">
          Delicious <span className="text-black">Bites</span>
        </Link>

        <nav className="hidden md:flex items-center space-x-8">
          <Link to="/">Home</Link>
          <Link to="/menu" className="text-orange-500">Menu</Link>
          <Link to="/about">About</Link>
          <Link to="/services">Services</Link>
          <Link to="/contact">Contact</Link>
        </nav>

        <div className="hidden md:flex items-center space-x-6">
          <Link to="/cart">
            <ShoppingCart className="w-5 h-5" />
          </Link>
          <Link to="/login" className="text-orange-500 font-medium">
            Login
          </Link>
          <Link
            to="/Register"
            className="bg-orange-500 text-white px-5 py-2 rounded-md"
          >
            Sign Up
          </Link>
        </div>

        <button
          className="md:hidden p-2 text-gray-800"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>
    </header>
  );

  /* ============================================================
     PAGE CONTENT
  ============================================================ */
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <div className="container mx-auto px-4 pt-24 pb-12">

        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-orange-500">Our Menu</h1>
          <p className="text-lg text-gray-500">Explore our delicious dishes</p>
        </div>

        {/* CATEGORIES */}
        <div className="mb-12 flex flex-wrap gap-3 justify-center">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-md ${
                activeCategory === category
                  ? "bg-orange-500 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* MENU GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item) => (
            <MenuCard
              key={item.id}
              item={item}
              onAddToCart={() => handleAddToCart(item)}
            />
          ))}
        </div>

      </div>
    </div>
  );
};

export default MenuPage;
