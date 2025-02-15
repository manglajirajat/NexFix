import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

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
            },5000);
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
        window.location.reload();
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
                                className="px-2 rounded-full border-2 border-slate-200"
                                value={data.email}
                                onChange={handleChange}
                                className="w-full placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200"
                            />
                        </div>
                        <div className="mb-6">
                            <label htmlFor="password">
                                <Typography variant="small" className="mb-2 block font-medium text-gray-900">
                                    Password
                                </Typography>
                            </label>
                            <Input
                                size="lg"
                                placeholder="********"
                                className="w-full placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200"
                                type={passwordShown ? "text" : "password"}
                                name="password"
                                value={data.password}
                                onChange={handleChange}
                                icon={
                                    <i onClick={togglePasswordVisibility}>
                                        {passwordShown ? <EyeIcon className="h-5 w-5" /> : <EyeSlashIcon className="h-5 w-5" />}
                                    </i>
                                }
                            />
                        </div>

                        <button
                            className="rounded-full p-2 px-4 m-2 bg-blue-500 text-white disabled:opacity-50"
                            type="submit"
                            disabled={loginLoading}
                        >
                            {loginLoading ? "Logging in..." : "Log in now"}
                        </button>
                    </form>
                </div>
            ) : (
                <div>
                    <Typography variant="h4" color="blue-gray" className="mb-4">
                        Profile Details
                    </Typography>
                    <Typography className="mb-2">
                        <strong>Name:</strong> {profile.name}
                    </Typography>
                    <Typography className="mb-4">
                        <strong>Email:</strong> {profile.email}
                    </Typography>
                    <Button
                        color="red"
                        size="lg"
                        className="mt-4"
                        fullWidth
                        onClick={logOut} // Call the logOut function on button click
                    >
                        Log Out
                    </Button>
                </div>
            )}
        </section>
    );
}