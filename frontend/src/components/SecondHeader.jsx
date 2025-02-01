import { Link } from "react-router-dom";
import { MapPin } from "lucide-react";

export default function SecondHeader() {
  return (
    <div className="border-b hidden lg:block">
      <div className="container mx-auto px-4 py-2 flex flex-col sm:flex-row items-center justify-between text-sm">
        <div className="flex flex-wrap gap-4 sm:gap-6 justify-center sm:justify-start mb-2 sm:mb-0">
          <Link to="/about" className="hover:text-blue-600">
            About Us
          </Link>
          <Link to="/account" className="hover:text-blue-600">
            My Account
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
          <select className="bg-transparent border border-gray-300 rounded px-2 py-1">
            <option>INR</option>
            <option>USD</option>
          </select>
        </div>
      </div>
    </div>
  );
}
