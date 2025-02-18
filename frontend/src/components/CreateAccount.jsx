import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

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

    const handleChange = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        });
    };

    const otpGenration = async (e) => {
        e.preventDefault();

        if(!data.email) {
            toast.error("Email is required");
            return;
        }

        setLoading(true);
        try {
            const response = await fetch("http://localhost:3000/api/v1/otp/generate-otp", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({email: data.email})
            });
            if(!response.ok) {
                throw new Error("Something went wrong");
            }
            setPageState({...pagestate, emailGenration: false, otpVerification: true});
        } catch (error) {
            toast.error(error.message);
        }
        finally {
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
            const response = await fetch("http://localhost:3000/api/v1/otp/verify-otp", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({email: data.email, otp: data.otp})
            });

            if(!response.ok) {
                throw new Error("Invalid OTP");
            }
            setPageState({...pagestate, otpVerification: false, accountCreation: true});
        } catch (error) {
            toast.error(error.message);
        }
        finally{
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
            {(pagestate.emailGenration && (
                <form onSubmit={otpGenration} className="text-center border-2 border-slate-400 p-4 m-2 rounded-md">
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

                    <button 
                        className="bg-blue-500 font-semibold text-white px-4 py-2 rounded-md mt-4 disabled:opacity-50" 
                        disabled={loading}
                    >
                        {loading ? "Generating..." : "Generate OTP"}
                    </button>
                </form>
            ))}

            {(pagestate.otpVerification && (
                <form onSubmit={verifyOTP} className="text-center border-2 border-slate-400 p-4 m-2 rounded-md">
                    <div>email send to : {data.email}</div>
                    <div>
                        <label className="block mb-1">OTP:</label>
                        <input 
                            type="text" 
                            name="otp" 
                            onChange={handleChange} 
                            value={data.otp} 
                            className="w-80 px-2 py-1 rounded-md border-2 border-slate-200" 
                        />
                    </div>

                    <button 
                        className="bg-blue-500 font-semibold text-white px-4 py-2 rounded-md mt-4 disabled:opacity-50" 
                        disabled={loading}
                    >
                        {loading ? "Verifying..." : "Verify OTP"}
                    </button>
                </form>
            ))}

            {(pagestate.accountCreation && (
                <form onSubmit={generateAccount} className="text-center border-2 border-slate-400 p-4 m-2 rounded-md">
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
                    <label className="block mb-1">Set Password:</label>
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
            ))}
        </div>
    );
}
