import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Home, Briefcase, MapPin, Building2, MapPinned, Navigation, X, Loader2 } from "lucide-react";

export default function UpdateAddress() {
    const { addressId } = useParams();
    const [newaddress, setAddress] = useState({
        type: '',
        street: '',
        city: '',
        state: '',
        postalCode: '',
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const navigate = useNavigate();

    const fetchAddress = async () => {
        try {
            const response = await fetch("http://localhost:3000/api/v1/address/getAddressById",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ addressId }),
                }
            );

            if (!response.ok) {
                throw new Error("Failed to fetch address details");
            }

            const result = await response.json();
            setAddress(result.data);
        } catch (error) {
            setError(error.message);
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        setAddress({ ...newaddress, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        setError("");

        try {
            const response = await fetch("http://localhost:3000/api/v1/address/update",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                    },
                    body: JSON.stringify(newaddress),
                }
            );

            if (!response.ok) {
                throw new Error("Failed to update address");
            }

            toast.success("Address updated successfully");
            navigate("/account");
        } catch (error) {
            setError(error.message);
            toast.error(error.message);
        } finally {
            setSubmitting(false);
        }
    };

    useEffect(() => {
        fetchAddress();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center">
                <div className="flex items-center gap-2 text-blue-600">
                    <Loader2 className="h-6 w-6 animate-spin" />
                    <span className="font-medium">Loading address details...</span>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md mx-auto">
                <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                    <div className="bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-4">
                        <div className="flex items-center justify-between">
                            <h1 className="text-xl font-bold text-white flex items-center gap-2">
                                <MapPinned className="h-5 w-5" />
                                Update Address
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
                                    value={newaddress.type}
                                    onChange={handleChange}
                                    required
                                    className="block w-full h-10 pl-3 pr-10 py-2.5 text-base border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 rounded-lg transition duration-150 ease-in-out"
                                >
                                    <option value="">Select type</option>
                                    <option value="Home">Home</option>
                                    <option value="Work">Work</option>
                                    <option value="Other">Other</option>
                                </select>
                                <div className="absolute inset-y-0 right-0 flex items-center pr-6 pointer-events-none">
                                    {newaddress.type === "Home" && <Home className="h-5 w-5 text-gray-400" />}
                                    {newaddress.type === "Work" && <Briefcase className="h-5 w-5 text-gray-400" />}
                                    {newaddress.type === "Other" && <MapPin className="h-5 w-5 text-gray-400" />}
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
                                    value={newaddress.street}
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
                                        value={newaddress.city}
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
                                    value={newaddress.state}
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
                                value={newaddress.postalCode}
                                onChange={handleChange}
                                required
                                className="block w-full pl-3 pr-10 py-2.5 text-base border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 rounded-lg"
                                placeholder="Postal code"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={submitting}
                            className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white font-medium py-2.5 px-4 rounded-lg hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transform transition-all duration-150 ease-in-out hover:scale-[1.02] active:scale-[0.98] shadow-md disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                        >
                            {submitting ? (
                                <div className="flex items-center justify-center gap-2">
                                    <Loader2 className="h-5 w-5 animate-spin" />
                                    <span>Updating...</span>
                                </div>
                            ) : (
                                "Update Address"
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}