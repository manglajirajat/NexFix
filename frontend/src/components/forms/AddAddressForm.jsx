import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Home, Briefcase, MapPin, Building2, MapPinned, Navigation, X } from "lucide-react";
import { toast } from "react-toastify";

export default function AddAddressForm() {
    const [data, setData] = useState({ type: "", street: "", city: "", state: "", postalCode: "" });
    const [error, setError] = useState("");
    const navigate = useNavigate();
    
    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const response = await fetch("http://localhost:3000/api/v1/address/add", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Failed to add address");
            }

            navigate("/account");
            toast.success("Address added successfully");
        } catch (error) {
            setError(error);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md mx-auto">
                <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                    <div className="bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-4">
                        <div className="flex items-center justify-between">
                            <h1 className="text-xl font-bold text-white flex items-center gap-2">
                                <MapPinned className="h-5 w-5" />
                                Add New Address
                            </h1>
                            <button
                                onClick={() => navigate("/account")}
                                className="text-white hover:text-blue-100 transition-colors"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        </div>
                    </div>

                    {error && (
                        <div className="bg-red-50 border-l-4 border-red-400 p-4 mx-6 mt-4">
                            <div className="flex">
                                <div className="flex-shrink-0">
                                    <X className="h-5 w-5 text-red-400" />
                                </div>
                                <div className="ml-3">
                                    <p className="text-sm text-red-700">{error}</p>
                                </div>
                            </div>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="p-6 space-y-6">
                        <div className="space-y-2">
                            <label htmlFor="type" className="block text-sm font-medium text-gray-700">
                                Address Type
                            </label>
                            <div className="relative">
                                <select
                                    name="type"
                                    value={data.type}
                                    onChange={handleChange}
                                    required
                                    className="block h-10 w-full pl-3 pr-10 py-2.5 text-base border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 rounded-lg transition duration-150 ease-in-out"
                                >
                                    <option value="">Select type</option>
                                    <option value="Home">Home</option>
                                    <option value="Work">Work</option>
                                    <option value="Other">Other</option>
                                </select>
                                <div className="absolute inset-y-0 right-0 flex items-center pr-6 pointer-events-none">
                                    {data.type === "Home" && <Home className="h-5 w-5 text-gray-400" />}
                                    {data.type === "Work" && <Briefcase className="h-5 w-5 text-gray-400" />}
                                    {data.type === "Other" && <MapPin className="h-5 w-5 text-gray-400" />}
                                </div>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="street" className="block text-sm font-medium text-gray-700">
                                Street Address
                            </label>
                            <div className="relative">
                                <input
                                    type="text"
                                    name="street"
                                    value={data.street}
                                    onChange={handleChange}
                                    required
                                    className="block w-full pl-3 pr-10 py-2.5 text-base border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 rounded-lg"
                                    placeholder="Enter street address"
                                />
                                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                    <Navigation className="h-5 w-5 text-gray-400" />
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                                    City
                                </label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        name="city"
                                        value={data.city}
                                        onChange={handleChange}
                                        required
                                        className="block w-full pl-3 pr-10 py-2.5 text-base border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 rounded-lg"
                                        placeholder="City"
                                    />
                                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                        <Building2 className="h-5 w-5 text-gray-400" />
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="state" className="block text-sm font-medium text-gray-700">
                                    State
                                </label>
                                <input
                                    type="text"
                                    name="state"
                                    value={data.state}
                                    onChange={handleChange}
                                    required
                                    className="block w-full pl-3 pr-10 py-2.5 text-base border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 rounded-lg"
                                    placeholder="State"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700">
                                Postal Code
                            </label>
                            <input
                                type="text"
                                name="postalCode"
                                value={data.postalCode}
                                onChange={handleChange}
                                required
                                className="block w-full pl-3 pr-10 py-2.5 text-base border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 rounded-lg"
                                placeholder="Postal code"
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white font-medium py-2.5 px-4 rounded-lg hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transform transition-all duration-150 ease-in-out hover:scale-[1.02] active:scale-[0.98] shadow-md"
                        >
                            Add Address
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}