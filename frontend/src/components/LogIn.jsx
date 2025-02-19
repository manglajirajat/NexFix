import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { toast } from "react-toastify";
import { Typography, Input, Button } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import {
    Activity,
    Award,
    Camera,
    Gift,
    LogOut,
    Package,
    Settings,
    ShoppingCart,
    Trash,
    TrendingUp,
    User,
} from "lucide-react";
import React from "react";

export default function LogIn() {
    const [data, setData] = useState({ email: "", password: "" });
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [loginLoading, setLoginLoading] = useState(false);
    const [error, setError] = useState("");
    const [passwordShown, setPasswordShown] = useState(false);
    const navigate = useNavigate();
    const [profileImage, setProfileImage] = useState("/placeholder-user.jpg");

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
            console.log(data);
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

    const handleImageUpload = (event) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => setProfileImage(reader.result);
            reader.readAsDataURL(file);
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

    return (
        loading ? (
            <p>Loading...</p>
        ) : !profile ? (
            <div className='flex'>
                <div className='w-[60%] bg-amber-50'>
                    <img src="https://img.freepik.com/free-vector/mobile-login-concept-illustration_114360-83.jpg?t=st=1739805063~exp=1739808663~hmac=4a51e84bac1ddfd9c09e341d562a854e329754f7d6883163f2c0c2b2de11c9ef&w=1060" alt="Login Image Not Found" className='w-full h-screen' />
                </div>

                <div className='w-[40%] bg-blue-500 px-32 py-40'>
                    <h1 className='font-mono font-extrabold text-amber-50 text-4xl flex text-nowrap'>
                        <EyeIcon className='w-12 h-12 text-amber-600'/>
                        Login to karle 😭
                    </h1>
                    <p className='my-2'>
                        Account nahi bana rakha pehle se ? <a className="hover:text-blue-50 underline" href="">Register</a>
                        {error && <p className="text-red-500">{error}</p>}
                    </p>

                    <form onSubmit={handleSubmit}>

                        <div className='py-1.5'>
                            <label htmlFor="Email" className='text-amber-800 text'>Email</label>
                            <input type="email" name="email" placeholder='Email daal bhadwe' value={data.email} onChange={handleChange} required className='w-full border py-1.5 px-2 rounded-lg '/>
                        </div>

                        <div className='my-2'>
                            <label htmlFor="Password" className='text-amber-800 text'>Password</label>
                            <div className="relative">
                                <input 
                                    size="lg" 
                                    type={passwordShown ? "text" : "password"} 
                                    value={data.password} 
                                    name="password" 
                                    onChange={handleChange} 
                                    placeholder='password daal' 
                                    className='w-full border py-1.5 px-2 rounded-lg'
                                />
                                <i onClick={togglePasswordVisibility} className='absolute right-2 top-3 cursor-pointer'>
                                    {passwordShown ? <EyeIcon className='h-5 w-5' /> : <EyeSlashIcon className='h-5 w-5' />}
                                </i>
                            </div>
                        </div>
    
                        <button className='mt-2 w-20 border border-gray-600 rounded-lg hover:bg-blue-700 transition duration-300 px-1.5 py-1.5' type="submit">
                            <span className='text-white'>LogIn</span>
                        </button>

                        <p>
                            <a href="" className='text-xs underline hover:text-white'>Forgot Password ?</a>
                        </p>
                    </form>

                    <div>dont have account <Link to={"/createAccount"} className="text-white hover:underline">Create Now!</Link></div>
                </div>
            </div>
        ) : (
            <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-6">
                {/* Profile Header */}
                <div className="relative mb-8 bg-blue-600 text-white rounded-2xl p-6 shadow-lg">
                    <div className="flex flex-col md:flex-row items-center gap-6">
                        {/* Profile Image */}
                        <div className="relative group">
                            <div className="h-32 w-32 rounded-full border-4 border-white shadow-lg overflow-hidden">
                                <img src={profileImage} alt="Profile" className="h-full w-full object-cover" />
                            </div>
                            <label className="absolute bottom-0 right-0 bg-gray-800 text-white p-2 rounded-full cursor-pointer">
                                <Camera className="h-5 w-5" />
                                <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
                            </label>
                        </div>

                        {/* User Info */}
                        <div>
                            <h1 className="text-3xl font-bold">{profile.name}</h1>
                            <p className="text-blue-200">Premium Member since 2023</p>
                        </div>

                        {/* Settings and Logout */}
                        <div className="md:ml-auto flex gap-3">
                            <button className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg flex items-center gap-2">
                                <Settings className="h-4 w-4" /> Settings
                            </button>
                            <button className="bg-red-500 text-white px-4 py-2 rounded-lg flex items-center gap-2" onClick={handleLogout}>
                                <LogOut className="h-4 w-4" /> Logout
                            </button>
                        </div>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid gap-4 md:grid-cols-4 mb-8">
                    {[
                        { icon: Package, label: "Total Orders", value: "248", trend: "+12%", color: "blue" },
                        { icon: ShoppingCart, label: "Wishlist Items", value: "35", trend: "+3%", color: "purple" },
                        { icon: Award, label: "Achievement Points", value: "1,502", trend: "+18%", color: "amber" },
                        { icon: Activity, label: "Reviews Given", value: "28", trend: "+7%", color: "green" },
                    ].map((stat, index) => (
                        <div key={index} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition">
                            <div className={`inline-flex rounded-lg bg-${stat.color}-50 p-3 mb-3 group-hover:scale-110 transition-transform duration-300`}>
                                <stat.icon className={`h-6 w-6 text-${stat.color}-600`} />
                            </div>
                            <h3 className="font-semibold text-2xl">{stat.value}</h3>
                            <div className="flex items-center gap-2 mt-1">
                                <span className="text-sm text-muted-foreground">{stat.label}</span>
                                <span className="text-xs text-green-600 flex items-center gap-0.5">
                                    <TrendingUp className="h-3 w-3" />
                                    {stat.trend}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Main Content */}
                <div className="grid gap-6 lg:grid-cols-12">
                    {/* Left Column - Activity */}
                    <div className="lg:col-span-4 space-y-6">
                        <div className="bg-white p-6 rounded-lg shadow-lg">
                            <h2 className="text-xl font-semibold mb-2">Recent Activity</h2>
                            <p className="text-sm text-gray-500 mb-4">Your latest interactions</p>
                            <div className="space-y-6">
                                {[
                                    { icon: Package, text: "Order #12345 delivered", time: "2 hours ago", color: "blue" },
                                    { icon: Gift, text: "Added 3 items to wishlist", time: "5 hours ago", color: "purple" },
                                    { icon: Award, text: "Earned Gold Member badge", time: "2 days ago", color: "amber" },
                                ].map((activity, index) => (
                                    <div key={index} className="flex items-start gap-4">
                                        <div className={`rounded-full p-2 bg-${activity.color}-50`}>
                                            <activity.icon className={`h-4 w-4 text-${activity.color}-600`} />
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-sm font-medium">{activity.text}</p>
                                            <p className="text-xs text-gray-500">{activity.time}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="bg-white p-6 rounded-lg shadow-lg">
                            <h2 className="text-xl font-semibold mb-2">Achievement Badges</h2>
                            <p className="text-sm text-gray-500 mb-4">Milestones reached</p>
                            <div className="grid grid-cols-3 gap-4">
                                {[...Array(6)].map((_, i) => (
                                    <div key={i} className="flex flex-col items-center gap-2">
                                        <div className="h-12 w-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white">
                                            <Award className="h-6 w-6" />
                                        </div>
                                        <span className="text-xs text-center font-medium">Level {i + 1}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Main Content */}
                    <div className="lg:col-span-8">
                        <div className="bg-white p-6 rounded-lg shadow-lg">
                            <h2 className="text-xl font-semibold mb-4">Profile</h2>
                            <div className="space-y-6">
                                <div className="grid gap-6 md:grid-cols-2">
                                    <div className="space-y-2">
                                        <label htmlFor="first-name" className="text-sm font-medium">First name</label>
                                        <input id="first-name" placeholder="John" className="w-full border py-1.5 px-2 rounded-lg" />
                                    </div>
                                    <div className="space-y-2">
                                        <label htmlFor="last-name" className="text-sm font-medium">Last name</label>
                                        <input id="last-name" placeholder="Doe" className="w-full border py-1.5 px-2 rounded-lg" />
                                    </div>
                                    <div className="space-y-2">
                                        <label htmlFor="email" className="text-sm font-medium">Email</label>
                                        <input id="email" type="email" placeholder="john@example.com" className="w-full border py-1.5 px-2 rounded-lg" />
                                    </div>
                                    <div className="space-y-2">
                                        <label htmlFor="phone" className="text-sm font-medium">Phone</label>
                                        <input id="phone" placeholder="+1 (555) 000-0000" className="w-full border py-1.5 px-2 rounded-lg" />
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <h3 className="text-lg font-semibold">Shipping Address</h3>
                                    <div className="grid gap-4">
                                        <div className="space-y-2">
                                            <label htmlFor="street" className="text-sm font-medium">Street Address</label>
                                            <input id="street" placeholder="123 Main St" className="w-full border py-1.5 px-2 rounded-lg" />
                                        </div>
                                        <div className="grid gap-4 md:grid-cols-3">
                                            <div className="space-y-2">
                                                <label htmlFor="city" className="text-sm font-medium">City</label>
                                                <input id="city" placeholder="New York" className="w-full border py-1.5 px-2 rounded-lg" />
                                            </div>
                                            <div className="space-y-2">
                                                <label htmlFor="state" className="text-sm font-medium">State</label>
                                                <input id="state" placeholder="NY" className="w-full border py-1.5 px-2 rounded-lg" />
                                            </div>
                                            <div className="space-y-2">
                                                <label htmlFor="zip" className="text-sm font-medium">ZIP Code</label>
                                                <input id="zip" placeholder="10001" className="w-full border py-1.5 px-2 rounded-lg" />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex justify-end">
                                    <button className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 py-2 rounded-lg">Save Changes</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    );
}