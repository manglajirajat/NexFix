import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, LogIn, User, MapPin, LogOut } from 'lucide-react';
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

export default function Login() {
  const [data, setData] = useState({ email: "", password: "" });
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loginLoading, setLoginLoading] = useState(false);
  const [error, setError] = useState("");
  const [passwordShown, setPasswordShown] = useState(false);
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
    } catch (error) {
      setError(error.message);
      localStorage.removeItem("accessToken");
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

  useEffect(() => {
    checkAuthStatus();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
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
                    className="block w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors duration-200"
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
                <a href="#" className="text-blue-600 hover:text-blue-500">
                  Forgot password?
                </a>
              </div>

              <button
                type="submit"
                disabled={loginLoading}
                className="w-full py-2.5 px-4 border border-transparent rounded-lg text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-blue-500/20 transition-all duration-200"
              >
                {loginLoading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto" />
                ) : (
                  'Sign in'
                )}
              </button>

              <p className="text-center text-sm text-gray-600">
                Don't have an account?{' '}
                <Link to="/createAccount" className="text-blue-600 hover:text-blue-500 font-medium">
                  Create one
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-xl mx-auto bg-white rounded-2xl shadow-lg shadow-gray-200/50 overflow-hidden">
        <div className="p-8">
          <div className="flex items-center space-x-4 mb-8">
            <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center transform -rotate-6 hover:rotate-0 transition-transform duration-300">
              <User className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-gray-900">Profile</h2>
              <p className="text-sm text-gray-500">Manage your account</p>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <label className="text-sm font-medium text-gray-500">Name</label>
              <p className="mt-1 text-lg font-medium text-gray-900">{profile.name}</p>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-500">Email</label>
              <p className="mt-1 text-lg font-medium text-gray-900">{profile.email}</p>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-500">Contact Number</label>
              <p className="mt-1 text-lg font-medium text-gray-900">{profile.contactNumber}</p>
            </div>

            {profile.address && profile.address.length > 0 && (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <label className="text-sm font-medium text-gray-500">Addresses</label>
                  {(profile.address.length < 6 && (
                    <Link
                    to="/addAddress"
                    className={`inline-flex items-center text-sm text-blue-600 hover:text-blue-500 font-medium`}
                    >
                      <MapPin className="w-4 h-4 mr-1" />
                      Add address
                    </Link>
                  ))}
                </div>
                <div className="space-y-3">
                  {profile.address.map((address) => (
                    <div
                      key={address._id}
                      className="p-4 rounded-lg bg-gray-50 border border-gray-100"
                    >
                      <p className="text-gray-900 font-medium">
                        {address.street}
                      </p>
                      <p className="text-sm text-gray-600">
                        {address.city}, {address.state} {address.postalCode}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center px-4 py-2.5 text-sm font-medium rounded-lg text-white bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-200"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Sign out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
