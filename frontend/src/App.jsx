import { Link } from "react-router-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { MapPin, User, ShoppingCart } from "lucide-react";
import { ToastContainer } from "react-toastify";
import { useEffect, useState } from "react";

// Navbar imports
import AnnouncementBar from "./components/AnnouncementBar.jsx";
import NavigationMenu from "./components/NavigationMenu.jsx";
import LocationSelector from "./components/LocationSelector.jsx";
import AnimatedSearch from "./components/AnimatedSearch.jsx";

// Form imports
import AddProductForm from "./components/AddProductForm.jsx";

// My account
import LogIn from "./components/LogIn.jsx";

// Pages import
import ProductList from "./components/pages/ProductList.jsx";

export default function App() {
  const [profile, setProfile] = useState(null);
  const checkAuthStatus = async () => {
    const token = localStorage.getItem("accessToken");

    if(!token) {
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/api/v1/user/me", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if(!response.ok) {
        throw new Error("An error occurred while checking for authentication");
      }

      const result = await response.json();
      console.log(result);

      setProfile(result.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    checkAuthStatus();
  },[]);

  return (
    <Router>
      <AnnouncementBar />

      {/* Secondary Header */}
      <div className="border-b hidden lg:block">
        <div className="container mx-auto px-4 py-2 flex flex-col sm:flex-row items-center justify-between text-sm">
          <div className="flex flex-wrap gap-4 sm:gap-6 justify-center sm:justify-start mb-2 sm:mb-0">
            <Link to="/about" className="hover:text-blue-600">
              About Us
            </Link>
            <Link to="/account" className="hover:text-blue-600">
              My account
            </Link>
            <Link to="/wishlist" className="hover:text-blue-600">
              Wishlist
            </Link>
            <Link to="/tracking" className="hover:text-blue-600">
              Order Tracking
            </Link>
          </div>

          <div className="flex flex-wrap items-center gap-4 sm:gap-6 justify-center text-center sm:text-left">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center">
                <MapPin className="w-3 h-3 text-blue-600" />
              </div>
              <span className="hidden md:inline">
                100% Secure delivery without contacting the courier
              </span>
            </div>
            <div className="hidden md:block">
              Need help? Call Us: <span className="text-blue-500">+ 0020 500</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="container mx-auto px-4 py-4 lg:py-6">
        <div className="flex flex-col lg:flex-row items-center gap-4 lg:gap-0 lg:justify-between">
          <div className="flex items-center justify-between w-full lg:w-auto gap-4">
            <Link to="/" className="flex flex-col">
              <div className="text-2xl lg:text-3xl font-bold text-blue-600">
                NexFix
              </div>
              <div className="text-xs lg:text-sm text-gray-500">
                Hardware & Paints
              </div>
            </Link>
            <LocationSelector />
          </div>

          <div className="flex-1 w-full lg:max-w-2xl lg:mx-12">
            <AnimatedSearch />
          </div>

          <div className="flex items-center gap-4">
            <Link to="/account" className="flex items-center gap-2 hover:text-blue-600">
              <User className="w-5 h-5" />
              <span className="hidden sm:inline">{profile ? (profile.name.charAt(0).toUpperCase()+profile.name.slice(1)) : ("Log In")}</span>
            </Link>
            <Link to="/cart" className="flex items-center gap-2">
              <div className="relative">
                <ShoppingCart className="w-5 h-5" />
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  1
                </span>
              </div>
              <span>₹0.00</span>
            </Link>
          </div>
        </div>
      </header>

      <ToastContainer />
      <NavigationMenu />

      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/addProduct" element={<AddProductForm />} />
        <Route path="/account" element={<LogIn />} />
        <Route path="/hardware" element={<ProductList category="Hardware" />} />
        <Route path="/hardware/hand-tools" element={<ProductList subCategory="Hand Tools" />} />
        <Route path="/hardware/safety-&-security" element={<ProductList subCategory="Safety %26 Security" />} />
        <Route path="/paint" element={<ProductList category="Paint" />} />
        <Route path="/paint/interior-paints" element={<ProductList subCategory="Interior" />} />
        <Route path="/paint/enamels" element={<ProductList subCategory="Enamel" />} />
      </Routes>
    </Router>
  );
}
