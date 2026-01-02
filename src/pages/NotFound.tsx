import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Frown, Home } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-orange-100 via-white to-orange-50 text-center px-4">
      {/* Icon */}
      <div className="flex items-center justify-center mb-6">
        <div className="p-6 rounded-full bg-orange-500/10">
          <Frown className="w-16 h-16 text-orange-500" />
        </div>
      </div>

      {/* Heading */}
      <h1 className="text-6xl sm:text-7xl font-extrabold text-orange-500 mb-4 drop-shadow-sm">
        404
      </h1>

      {/* Subtext */}
      <p className="text-xl sm:text-2xl text-gray-700 mb-6 max-w-md leading-relaxed">
        Oops! The page you’re looking for doesn’t exist or may have been moved.
      </p>

      {/* Back Button */}
      <Link
        to="/"
        className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded-lg shadow-md transition-all duration-200"
      >
        <Home className="w-5 h-5" />
        Back to Home
      </Link>

      {/* Decorative bottom text */}
      <p className="text-sm text-gray-500 mt-8 opacity-80">
        Delicious Bites – Serving Happiness 🍽️
      </p>
    </div>
  );
};

export default NotFound;
