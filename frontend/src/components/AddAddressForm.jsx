import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AddAddressForm() {
    const [data, setData] = useState({ street: "", city: "", state: "", postalCode: "" });
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
                const errorData = (await response.json()).message;
                console.log(await response.json());
                throw new Error(errorData.message || "Failed to add address");
            }

            console.log("Address added successfully");
            navigate("/account");
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md">
                <h1 className="text-xl font-bold mb-4 text-center">Add Address</h1>
                {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="street" className="block font-medium">Street</label>
                        <input
                            type="text"
                            name="street"
                            value={data.street}
                            onChange={handleChange}
                            required
                            className="w-full p-2 border rounded-md"
                        />
                    </div>
                    <div>
                        <label htmlFor="city" className="block font-medium">City</label>
                        <input
                            type="text"
                            name="city"
                            value={data.city}
                            onChange={handleChange}
                            required
                            className="w-full p-2 border rounded-md"
                        />
                    </div>
                    <div>
                        <label htmlFor="state" className="block font-medium">State</label>
                        <input
                            type="text"
                            name="state"
                            value={data.state}
                            onChange={handleChange}
                            required
                            className="w-full p-2 border rounded-md"
                        />
                    </div>
                    <div>
                        <label htmlFor="postalCode" className="block font-medium">Postal Code</label>
                        <input
                            type="text"
                            name="postalCode"
                            value={data.postalCode}
                            onChange={handleChange}
                            required
                            className="w-full p-2 border rounded-md"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-md"
                    >
                        Add Address
                    </button>
                </form>
            </div>
        </div>
    );
}
