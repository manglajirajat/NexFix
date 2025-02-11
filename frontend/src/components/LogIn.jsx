import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Typography, Input, Button } from "@material-tailwind/react";
import { EyeSlashIcon, EyeIcon } from "@heroicons/react/24/solid";

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
            window.location.reload();
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

    const logOut = () => {
        localStorage.removeItem("accessToken"); // Clear the access token
        setProfile(null); // Reset the profile state
        navigate("/"); // Redirect to the login page
    };

    useEffect(() => {
        checkAuthStatus();
    }, []);

    return (
        <section className="grid text-center h-screen items-center p-8">
            {!profile ? (
                <div>
                    <Typography variant="h3" color="blue-gray" className="mb-2">
                        Sign In
                    </Typography>
                    <Typography className="mb-16 text-gray-600 font-normal text-[18px]">
                        Enter your email and password to sign in
                    </Typography>
                    {error && <Typography color="red" className="mb-4">{error}</Typography>}
                    <form onSubmit={handleSubmit} className="mx-auto max-w-[24rem] text-left">
                        <div className="mb-6">
                            <label htmlFor="email">
                                <Typography variant="small" className="mb-2 block font-medium text-gray-900">
                                    Your Email
                                </Typography>
                            </label>
                            <Input
                                id="email"
                                color="gray"
                                size="lg"
                                type="email"
                                name="email"
                                placeholder="name@mail.com"
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
                        <Button type="submit" color="gray" size="lg" className="mt-6" fullWidth disabled={loginLoading}>
                            {loginLoading ? "Logging in..." : "Sign In"}
                        </Button>
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