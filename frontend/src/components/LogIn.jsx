import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { 
  Eye, EyeOff, LogIn, User, LogOut, 
  Camera, Trash2, Heart, Home, Briefcase,
  Package, Edit3, Plus, MapPinned
} from 'lucide-react';
import { toast } from "react-toastify";

export default function Login() {
  const [data, setData] = useState({ email: "", password: "" });
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loginLoading, setLoginLoading] = useState(false);
  const [error, setError] = useState("");
  const [passwordShown, setPasswordShown] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');
  const [addresses,setAddress] = useState([]);
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => setPasswordShown((cur) => !cur);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!data.email || !data.password) {
      setError("Both fields are required.");
      return;
    }
    setLoginLoading(true);
    await getProfile();
    setLoginLoading(false);
  };

  const getProfile = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/v1/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Invalid email or password");
      }

      const result = await response.json();
      setProfile(result.data.user);
      localStorage.setItem("accessToken", result.data.accessToken);
      navigate("/");
      toast.success("Logged in successfully");
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (error) {
      setError(error.message);
    }
  };

  const checkAuthStatus = async () => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/api/v1/user/me", {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) {
        throw new Error("Session expired. Please log in again.");
      }

      const result = await response.json();
      setProfile(result.data);
      setAddress(result.data.address);
      await fetchOrders();
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    setProfile(null);
    navigate("/");
    toast.success("Logged out successfully");
    setTimeout(() => {
      window.location.reload();
    }, 2000);
  };

  const fetchOrders = async () => {
    try {
        const response = await fetch("http://localhost:3000/api/v1/order/getOrders", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
        });

        if (!response.ok) {
            throw new Error("Failed to fetch orders");
        }

        const result = await response.json();
        setOrders(result.data);
    } catch (error) {
        setError(error.message);
    } finally {
        setLoading(false);
    }
  };

  const deleteAddress = async (addressToDelete) => {
    try{
      const response = await fetch("http://localhost:3000/api/v1/address/delete", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body: JSON.stringify({ addressToDelete }),
      });

      if (!response.ok) {
        throw new Error("Failed to delete address");
      }

      toast.success("Address deleted successfully");
      checkAuthStatus();
    } catch (error) {
      toast.error(error.message);
    }
  }

  useEffect(() => {
    checkAuthStatus();
  }, [profile]);


  const [wishlist] = useState([
    { 
      id: 1, 
      name: 'Wireless Headphones', 
      price: '$99.99', 
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400',
      rating: 4.5,
      reviews: 128
    },
    { 
      id: 2, 
      name: 'Smart Watch', 
      price: '$199.99', 
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400',
      rating: 4.8,
      reviews: 256
    }
  ]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-lg shadow-gray-200/50">
          <div className="space-y-6">
            <div className="text-center">
              <div className="mx-auto w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center transform -rotate-6 hover:rotate-0 transition-transform duration-300">
                <LogIn className="w-6 h-6 text-white" />
              </div>
              <h1 className="mt-6 text-2xl font-semibold text-gray-900">Welcome back</h1>
              <p className="mt-2 text-sm text-gray-600">
                Please sign in to continue
              </p>
            </div>

            {error && (
              <div className="p-3 text-sm rounded-lg bg-red-50 text-red-600 border border-red-100">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={data.email}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors duration-200"
                  placeholder="Enter your email"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <div className="relative mt-1">
                  <input
                    id="password"
                    name="password"
                    type={passwordShown ? "text" : "password"}
                    required
                    value={data.password}
                    onChange={handleChange}
                    className="block w-full pr-10 px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors duration-200"
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-500"
                  >
                    {passwordShown ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-blue-500 focus:ring-blue-500/20 border-gray-300 rounded transition-colors duration-200"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-gray-600">
                    Remember me
                  </label>
                </div>
                <Link to={"/changePassword"} className="text-blue-600 hover:text-blue-500">
                  Forgot password?
                </Link>
              </div>

              <button
                type="submit"
                disabled={loginLoading}
                className="w-full py-2.5 px-4 border border-transparent rounded-lg text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-blue-500/20 transition-all duration-200"
              >
                {loginLoading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto" />
                ) : (
                  'Sign in'
                )}
              </button>

              <p className="text-center text-sm text-gray-600">
                Don't have an account?
                <Link to="/createAccount" className="text-blue-600 hover:text-blue-500 font-medium ml-1">
                  Create one
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    );
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return (
          <div className="space-y-8">
            <div className="relative">
              <div className="w-32 h-32 mx-auto relative">
                <img
                  src={profile.image}
                  alt="Profile"
                  className="w-full h-full object-cover rounded-full border-4 border-white shadow-lg"
                />
                <div className="absolute bottom-0 right-0 flex space-x-2">
                  <button className="p-2 bg-blue-500 rounded-full text-white hover:bg-blue-600 transition-colors shadow-lg">
                    <Camera className="w-4 h-4" />
                  </button>
                  <button className="p-2 bg-red-500 rounded-full text-white hover:bg-red-600 transition-colors shadow-lg">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-500">Name</label>
                <div className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200 hover:border-blue-500 transition-colors group">
                  <span className="text-gray-900">{profile.name}</span>
                  <Edit3 className="w-4 h-4 text-gray-400 group-hover:text-blue-500 cursor-pointer transition-colors" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-500">Email</label>
                <div className="p-4 bg-white rounded-lg border border-gray-200">
                  <span className="text-gray-900">{profile.email}</span>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-500">Phone</label>
                <div className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200 hover:border-blue-500 transition-colors group">
                  <span className="text-gray-900">{profile.contactNumber}</span>
                  <Edit3 className="w-4 h-4 text-gray-400 group-hover:text-blue-500 cursor-pointer transition-colors" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-500">Member Since</label>
                <div className="p-4 bg-white rounded-lg border border-gray-200">
                  <span className="text-gray-900">{new Date(profile.createdAt).toLocaleDateString('en-IN')}</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">Shipping Addresses</h2>
                <Link to="/addAddress" className="flex items-center px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors">
                  <Plus className="w-4 h-4 mr-2" />
                  Add New Address
                </Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {addresses.map((address) => (
                  <div
                    key={address._id}
                    className="p-4 bg-white rounded-lg border border-gray-200 hover:border-blue-500 transition-colors relative group"
                  >
                    <div className="flex items-start space-x-3">
                      <div className="p-2 bg-blue-50 rounded-lg">
                        {address.type === "Home" && <Home className="h-5 w-5 text-blue-500" />}
                        {address.type === "Work" && <Briefcase className="h-5 w-5 text-blue-500" />}
                        {address.type === "Other" && <MapPinned className="h-5 w-5 text-blue-500" />}
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">{address.type}</h3>
                        <p className="text-sm text-gray-600 mt-1">{address.street}</p>
                        <p className="text-sm text-gray-600">
                          {address.city}, {address.state} {address.postalCode}
                        </p>
                      </div>
                    </div>
                    <div className="mt-4 flex items-center justify-end space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Link to={`/updateAddress/${address._id}`} className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                        Edit
                      </Link>
                      <button className="text-red-600 hover:text-red-700 text-sm font-medium" onClick={()=>deleteAddress(address._id)}>
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      case 'orders':
        return (
          <div className="space-y-4">
            {orders.length != 0 ? (orders.map((order) => (
              <div key={order._id} className="bg-white rounded-lg border border-gray-200 hover:border-blue-500 transition-colors overflow-hidden">
                <div className="p-4 border-b border-gray-100">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm text-gray-500">Order #{order._id}</p>
                      <p className="font-medium text-gray-900 mt-1">{new Date(order.createdAt).toLocaleString('en-US', { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-semibold text-blue-600">{order.total}</p>
                      <span className="inline-block px-2 py-1 text-xs rounded-full bg-blue-50 text-blue-600 mt-1">
                        {order.orderStatus}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="px-4 py-3 bg-gray-50">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center text-gray-600">
                      <Package className="w-4 h-4 mr-2" />
                      {order.items.length} items
                    </div>
                    <div className="flex items-center text-blue-600 hover:text-blue-700 cursor-pointer">
                      <span className="mr-2">Track Order</span>
                      {/* <span className="text-gray-400">#{"order.trackingNumber"}</span> */}
                    </div>
                  </div>
                </div>
              </div>
            ))) : (
              <div className="p-4 bg-white rounded-lg border border-gray-200 text-gray-600">
                You have no orders yet.
              </div>
            )}
          </div>
        );
      case 'wishlist':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {wishlist.map(item => (
              <div key={item.id} className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:border-blue-500 transition-colors group">
                <div className="relative">
                  <img src={item.image} alt={item.name} className="w-full h-48 object-cover" />
                  <button className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
                    <Heart className="w-5 h-5 text-red-500" />
                  </button>
                </div>
                <div className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium text-gray-900">{item.name}</h3>
                      <p className="text-lg font-semibold text-blue-600 mt-1">{item.price}</p>
                    </div>
                    <div className="flex items-center space-x-1 text-sm">
                      <span className="text-yellow-400">★</span>
                      <span className="font-medium">{item.rating}</span>
                      <span className="text-gray-400">({item.reviews})</span>
                    </div>
                  </div>
                  <button className="mt-4 w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-white">My Dashboard</h1>
                <p className="text-blue-100 mt-1">Welcome back, {profile.name}</p>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center px-4 py-2 bg-white text-blue-600 rounded-lg hover:bg-blue-50 transition-colors shadow-lg"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Sign out
              </button>
            </div>
          </div>

          <div className="flex flex-col md:flex-row min-h-[calc(100vh-12rem)]">
            <div className="w-full md:w-64 p-6 border-r border-gray-200 bg-gray-50">
              <nav className="space-y-2">
                <button
                  onClick={() => setActiveTab('profile')}
                  className={`w-full flex items-center px-4 py-2.5 rounded-lg transition-colors ${
                    activeTab === 'profile' 
                      ? 'bg-blue-50 text-blue-600 font-medium' 
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <User className="w-5 h-5 mr-3" />
                  Profile
                </button>
                <button
                  onClick={() => setActiveTab('orders')}
                  className={`w-full flex items-center px-4 py-2.5 rounded-lg transition-colors ${
                    activeTab === 'orders' 
                      ? 'bg-blue-50 text-blue-600 font-medium' 
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <Package className="w-5 h-5 mr-3" />
                  Orders
                </button>
                <button
                  onClick={() => setActiveTab('wishlist')}
                  className={`w-full flex items-center px-4 py-2.5 rounded-lg transition-colors ${
                    activeTab === 'wishlist' 
                      ? 'bg-blue-50 text-blue-600 font-medium' 
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <Heart className="w-5 h-5 mr-3" />
                  Wishlist
                </button>
              </nav>
            </div>

            <div className="flex-1 p-6 overflow-auto">
              {renderTabContent()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}