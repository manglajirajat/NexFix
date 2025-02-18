import {Link} from 'react-router-dom';
import { ShoppingCart, User } from 'lucide-react';
import { useState, useEffect } from 'react';
import LocationSelector from "./LocationSelector.jsx";
import AnimatedSearch from "./AnimatedSearch.jsx";


export default function MainHeader () {
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

      setProfile(result.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    checkAuthStatus();
  },[]);

  return (
 
<header className="container mx-auto px-4 py-4 lg:py-6">
<div className="flex flex-col lg:flex-row items-center gap-4 lg:gap-0 lg:justify-between">
  <div className="flex items-center justify-between w-full lg:w-auto gap-4">
    <Link to="/" className="flex flex-col">
      <div className="text-2xl lg:text-3xl font-extrabold text-blue-600">
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
          {profile ? profile.cart.items.length : 0}
        </span>
      </div>
      <span>{profile ? ("₹" + profile.cart.total) : ("₹0.00")}</span>
    </Link>
  </div>
</div>
</header>


);

}