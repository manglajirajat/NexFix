import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { ShoppingBag, Mail, Lock, User, Phone, ArrowRight, ArrowLeft, Eye, EyeOff, Shield } from "lucide-react";
import { backendUrl } from "../../constant";

export default function CreateAccount() {
    const navigate = useNavigate();
    const [data, setData] = useState({
        email: "",
        otp: "",
        name: "",
        contactNumber: "",
        password: ""
    });
    const [pagestate, setPageState] = useState({
        emailGenration: true,
        otpVerification: false,
        accountCreation: false
    });
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        });
    };

    const handleBack = () => {
        if (pagestate.otpVerification) {
            setPageState({...pagestate, emailGenration: true, otpVerification: false});
        } else if (pagestate.accountCreation) {
            setPageState({...pagestate, emailGenration: true, accountCreation: false});
        }
    };

    const otpGenration = async (e) => {
        e.preventDefault();
        if(!data.email) {
            toast.error("Email is required");
            return;
        }
        setLoading(true);
        try {
            const response = await fetch(`${backendUrl}/api/v1/otp/generate-otp`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({email: data.email})
            });
            if(!response.ok) throw new Error("something went wrong");
            setPageState({...pagestate, emailGenration: false, otpVerification: true});
            toast.success("OTP sent successfully!");
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    const verifyOTP = async (e) => {
        e.preventDefault();
        if(!data.otp) {
            toast.error("OTP is required");
            return;
        }
        setLoading(true);
        try {
            const response = await fetch(`${backendUrl}/api/v1/otp/verify-otp`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({email: data.email, otp: data.otp})
            });
            if(!response.ok) throw new Error("Invalid OTP");
            setPageState({...pagestate, otpVerification: false, accountCreation: true});
            setData({...data, ['otp']: ""});
            toast.success("OTP verified successfully!");
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    const generateAccount = async (e) => {
        e.preventDefault();
        if (!data.name || !data.contactNumber || !data.password) {
            toast.error("All fields are required");
            return;
        }
        setLoading(true);
        try {
            const response = await fetch(`${backendUrl}/api/v1/user/register`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data)
            });
            const result = await response.json();
            if (!response.ok) throw new Error(result.message || "Something went wrong");
            toast.success("Account created successfully!");
            navigate("/account");
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    const renderProgressBar = () => {
        const steps = ['Email', 'Verify', 'Details'];
        const currentStep = pagestate.emailGenration ? 0 : pagestate.otpVerification ? 1 : 2;
        
        return (
            <div className="flex items-center justify-center mb-8">
                {steps.map((step, index) => (
                    <div key={step} className="flex items-center">
                        <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
                            index <= currentStep ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-500'
                        }`}>
                            {index + 1}
                        </div>
                        {index < steps.length - 1 && (
                            <div className={`w-20 h-1 mx-2 ${
                                index < currentStep ? 'bg-blue-500' : 'bg-gray-200'
                            }`} />
                        )}
                    </div>
                ))}
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div>
                    <div className="flex justify-center">
                        <ShoppingBag className="w-12 h-12 text-blue-500" />
                    </div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        Create your account
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-600">
                        Join our community of shoppers
                    </p>
                </div>

                {renderProgressBar()}

                <div className="mt-8 bg-white py-8 px-4 shadow-xl rounded-lg sm:px-10">
                    {pagestate.emailGenration && (
                        <form onSubmit={otpGenration} className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Email address</label>
                                <div className="mt-1 relative">
                                    <Mail className="absolute top-3 left-3 text-gray-400 w-5 h-5" />
                                    <input
                                        type="email"
                                        name="email"
                                        required
                                        className="pl-10 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="you@example.com"
                                        onChange={handleChange}
                                        value={data.email}
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? "Sending..." : "Continue"}
                                <ArrowRight className="ml-2 w-4 h-4" />
                            </button>
                        </form>
                    )}

                    {pagestate.otpVerification && (
                        <form onSubmit={verifyOTP} className="space-y-6">
                            <div className="rounded-md bg-blue-50 p-4 mb-4">
                                <div className="flex">
                                    <div className="flex-shrink-0">
                                        <Mail className="h-5 w-5 text-blue-400" />
                                    </div>
                                    <div className="ml-3">
                                        <p className="text-sm text-blue-700">
                                            We've sent a verification code to {data.email}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Verification Code</label>
                                <div className="mt-1 relative">
                                    <Shield className="absolute top-3 left-3 text-gray-400 w-5 h-5" />
                                    <input
                                        type="text"
                                        name="otp"
                                        required
                                        maxLength={6}
                                        className="pl-10 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="Enter 6-digit code"
                                        onChange={handleChange}
                                        value={data.otp}
                                    />
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <button
                                    type="button"
                                    onClick={handleBack}
                                    className="flex-1 flex justify-center items-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                >
                                    <ArrowLeft className="mr-2 w-4 h-4" />
                                    Back
                                </button>
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="flex-1 flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {loading ? "Verifying..." : "Verify Code"}
                                    <ArrowRight className="ml-2 w-4 h-4" />
                                </button>
                            </div>
                        </form>
                    )}

                    {pagestate.accountCreation && (
                        <form onSubmit={generateAccount} className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Full Name</label>
                                <div className="mt-1 relative">
                                    <User className="absolute top-3 left-3 text-gray-400 w-5 h-5" />
                                    <input
                                        type="text"
                                        name="name"
                                        required
                                        className="pl-10 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="Prince Maan"
                                        onChange={handleChange}
                                        value={data.name}
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Contact Number</label>
                                <div className="mt-1 relative">
                                    <Phone className="absolute top-3 left-3 text-gray-400 w-5 h-5" />
                                    <input
                                        type="tel"
                                        name="contactNumber"
                                        required
                                        className="pl-10 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="+91 98123XXXXX"
                                        onChange={handleChange}
                                        value={data.contactNumber}
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Password</label>
                                <div className="mt-1 relative">
                                    <Lock className="absolute top-3 left-3 text-gray-400 w-5 h-5" />
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        required
                                        className="pl-10 pr-10 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="••••••••"
                                        onChange={handleChange}
                                        value={data.password}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                    >
                                        {showPassword ? (
                                            <EyeOff className="h-5 w-5 text-gray-400" />
                                        ) : (
                                            <Eye className="h-5 w-5 text-gray-400" />
                                        )}
                                    </button>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <button
                                    type="button"
                                    onClick={handleBack}
                                    className="flex-1 flex justify-center items-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                >
                                    <ArrowLeft className="mr-2 w-4 h-4" />
                                    Back
                                </button>
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="flex-1 flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {loading ? "Creating Account..." : "Complete Sign Up"}
                                    <ArrowRight className="ml-2 w-4 h-4" />
                                </button>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
}