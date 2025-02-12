import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Link  } from "react-router-dom";

export default function LogIn() {
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

    return (
        <div className="p-4">
            {loading ? (
                <p>Loading...</p>
            ) : !profile ? (
                <div>
                    <h2 className="m-2">Log in first</h2>
                    {error && <p className="text-red-500">{error}</p>}
                    <form onSubmit={handleSubmit}>
                        <div className="m-2">
                            <label htmlFor="email">Enter email:</label>
                            <input
                                type="email"
                                name="email"
                                value={data.email}
                                onChange={handleChange}
                                className="w-full border-2 border-slate-300 rounded-md"
                            />
                        </div>
                        <div className="mb-6">
                            <label htmlFor="password">Password</label>
                            <input
                                className="w-full border-2 border-slate-300 rounded-md"s
                                type={passwordShown ? "text" : "password"}
                                name="password"
                                value={data.password}
                                onChange={handleChange}
                            />
                            <i onClick={togglePasswordVisibility}>
                                {passwordShown ? "👁" : "🙈"}
                            </i>
                        </div>

                        <button
                            className="rounded-full p-2 px-4 m-2 bg-blue-500 text-white disabled:opacity-50"
                            type="submit"
                            disabled={loginLoading}
                        >
                            {loginLoading ? "Logging in..." : "Log in now"}
                        </button>
                    </form>
                    <p>dont have account? <Link to='/createAccount' className="text-blue-500 hover:underline">Create now !</Link></p>
                </div>
            ) : (
                <div>
                    <h4 className="mb-4">Profile Details</h4>
                    <p className="mb-2">
                        <strong>Name:</strong> {profile.name}
                    </p>
                    <p className="mb-4">
                        <strong>Email:</strong> {profile.email}
                    </p>
                    <button
                        className="mt-4 bg-red-500 text-white p-2 rounded-full"
                        onClick={handleLogout}
                    >
                        Log Out
                    </button>
                </div>
            )}
        </div>
    );
}
