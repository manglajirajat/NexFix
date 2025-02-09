import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function CreateAccount() {
    const navigate = useNavigate();
    const [data, setData] = useState({
        name: "",
        email: "",
        contactNumber: "",
        password: ""
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        });
    };

    const validateEmail = (email) => {
        return /\S+@\S+\.\S+/.test(email);  // Simple email validation
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Basic validation
        if (!data.name || !data.email || !data.contactNumber || !data.password) {
            toast.error("All fields are required");
            return;
        }

        if (!validateEmail(data.email)) {
            toast.error("Invalid email format");
            return;
        }

        setLoading(true);

        try {
            const response = await fetch("http://localhost:3000/api/v1/user/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.message || "Something went wrong");
            }

            toast.success("Account created successfully!");
            navigate("/account");
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex justify-center">
            <form onSubmit={handleSubmit} className="text-center border-2 border-slate-400 p-4 m-2 rounded-md">
                <div>
                    <label className="block mb-1">Name:</label>
                    <input 
                        type="text" 
                        name="name" 
                        onChange={handleChange} 
                        value={data.name} 
                        className="w-80 px-2 py-1 rounded-md border-2 border-slate-200" 
                    />
                </div>
                <div>
                    <label className="block mb-1">Email:</label>
                    <input 
                        type="email" 
                        name="email" 
                        onChange={handleChange} 
                        value={data.email} 
                        className="w-80 px-2 py-1 rounded-md border-2 border-slate-200" 
                    />
                </div>
                <div>
                    <label className="block mb-1">Contact Number:</label>
                    <input 
                        type="text" 
                        name="contactNumber" 
                        onChange={handleChange} 
                        value={data.contactNumber} 
                        className="w-80 px-2 py-1 rounded-md border-2 border-slate-200" 
                    />
                </div>
                <div>
                    <label className="block mb-1">Password:</label>
                    <input 
                        type="password" 
                        name="password" 
                        onChange={handleChange} 
                        value={data.password} 
                        className="w-80 px-2 py-1 rounded-md border-2 border-slate-200" 
                    />
                </div>

                <button 
                    className="bg-blue-500 font-semibold text-white px-4 py-2 rounded-md mt-4 disabled:opacity-50" 
                    disabled={loading}
                >
                    {loading ? "Creating..." : "Create Now"}
                </button>
            </form>
        </div>
    );
}
