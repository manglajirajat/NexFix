import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { TimerReset as KeyReset, Mail, Lock, ArrowRight, ArrowLeft, Eye, EyeOff, Shield } from "lucide-react";
import { backendUrl } from "../../constant";

export default function ForgotPassword() {
    const navigate = useNavigate();
    const [data, setData] = useState({
        email: "",
        otp: "",
        newPassword: "",
        confirmPassword: ""
    });
    const [pageState, setPageState] = useState({
        generateOTP: true,
        verifyOTP: false,
        setNewPassword: false
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
        if (pageState.verifyOTP) {
            setPageState({...pageState, generateOTP: true, verifyOTP: false});
        } else if (pageState.setNewPassword) {
            setPageState({...pageState, generateOTP: true, setNewPassword: false});
        }
    };

    const handleGenerateOTP = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await fetch(`${backendUrl}/api/v1/otp/generate-otp-for-pass-change`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: data.email })
            });
            if (!response.ok) throw new Error("Failed to generate OTP");
            setPageState({...pageState, generateOTP: false, verifyOTP: true});
            toast.success("OTP sent successfully!");
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleVerifyOTP = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await fetch(`${backendUrl}/api/v1/otp/verify-otp`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: data.email, otp: data.otp })
            });
            if (!response.ok) throw new Error("Invalid OTP");
            setPageState({...pageState, verifyOTP: false, setNewPassword: true});
            setData({...data, otp: ""});
            toast.success("OTP verified successfully!");
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleSetNewPassword = async (e) => {
        e.preventDefault();
        if (data.newPassword !== data.confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }
        setLoading(true);
        try {
            const response = await fetch(`${backendUrl}/api/v1/user/set-new-password`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email: data.email,
                    newPassword: data.newPassword
                })
            });
            if (!response.ok) throw new Error("Failed to set new password");
            toast.success("Password reset successfully!");
            navigate("/account");
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    const renderProgressBar = () => {
        const steps = ['Email', 'Verify', 'Reset'];
        const currentStep = pageState.generateOTP ? 0 : pageState.verifyOTP ? 1 : 2;
        
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
                        <KeyReset className="w-12 h-12 text-blue-500" />
                    </div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        Reset your password
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-600">
                        Don't worry, we'll help you recover access
                    </p>
                </div>

                {renderProgressBar()}

                <div className="mt-8 bg-white py-8 px-4 shadow-xl rounded-lg sm:px-10">
                    {pageState.generateOTP && (
                        <form onSubmit={handleGenerateOTP} className="space-y-6">
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
                                {loading ? "Sending..." : "Send Reset Code"}
                                <ArrowRight className="ml-2 w-4 h-4" />
                            </button>
                        </form>
                    )}

                    {pageState.verifyOTP && (
                        <form onSubmit={handleVerifyOTP} className="space-y-6">
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

                    {pageState.setNewPassword && (
                        <form onSubmit={handleSetNewPassword} className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">New Password</label>
                                <div className="mt-1 relative">
                                    <Lock className="absolute top-3 left-3 text-gray-400 w-5 h-5" />
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        name="newPassword"
                                        required
                                        className="pl-10 pr-10 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="••••••••"
                                        onChange={handleChange}
                                        value={data.newPassword}
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
                                <label className="block text-sm font-medium text-gray-700 mt-2">Confirm Password</label>
                                <div className="mt-1 relative">
                                    <Lock className="absolute top-3 left-3 text-gray-400 w-5 h-5" />
                                    <input
                                        type="password"
                                        name="confirmPassword"
                                        required
                                        className="pl-10 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="••••••••"
                                        onChange={handleChange}
                                        value={data.confirmPassword}
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
                                    {loading ? "Resetting..." : "Reset Password"}
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