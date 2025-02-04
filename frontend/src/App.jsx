import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
//navbar imports
import AnnouncementBar from "./components/AnnouncementBar.jsx";
import NavigationMenu from "./components/NavigationMenu.jsx";
import SecondHeader from "./components/SecondHeader.jsx";

//my account
import LogIn from "./components/LogIn.jsx";

//form imports
import AddProductForm from "./components/AddProductForm.jsx";

//pages import
import HardwarePage from "./components/pages/HardwarePage.jsx";
import HandToolPage from "./components/pages/HandToolPage.jsx";

export default function App() {
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
      <select className="bg-transparent">
        <option>INR</option>
        <option>USD</option>
      </select>
    </div>
  </div>
</div>

{/* Main Header */}
<header className="container mx-auto px-4 py-4 lg:py-6">
  <div className="flex flex-col lg:flex-row items-center gap-4 lg:gap-0 lg:justify-between">
    <div className="flex items-center justify-between w-full lg:w-auto gap-4">
      <Link to="/" className="flex flex-col">
        <div className="text-2xl lg:text-3xl font-bold text-blue-600">NexFix</div>
        <div className="text-xs lg:text-sm text-gray-500">Hardware & Tools</div>
      </Link>
      <LocationSelector />
    </div>

    <div className="flex-1 w-full lg:max-w-2xl lg:mx-12">
      <AnimatedSearch />
    </div>

    <div className="flex items-center gap-4">
      <Link to="/account" className="flex items-center gap-2 hover:text-blue-600">
        <User className="w-5 h-5" />
        <span className="hidden sm:inline">Account</span>
      </Link>
      <Link to="/cart" className="flex items-center gap-2">
        <div className="relative">
          <ShoppingCart className="w-5 h-5" />
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
            0
          </span>
        </div>
        <span>₹0.00</span>
      </Link>
    </div>
  </div>
</header>

      <NavigationMenu />
      <Routes>
        <Route path="/" element={"ye le"} />
        <Route path="/hardware" element={<HardwarePage />} />
        <Route path="/hardware/hand-tools" element={<HandToolPage />} /> 
      </Routes>
    </Router>
  );
}