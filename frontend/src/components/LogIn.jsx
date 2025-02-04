import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LogIn() {
    const [data, setData] = useState({ email: "", password: "" });
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [loginLoading, setLoginLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
        setError(""); // Clear error when user types
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

    const handleLogout = () => {
        localStorage.removeItem("accessToken");
        setProfile(null);
        navigate("/");
        window.location.reload();
    };

    useEffect(() => {
        const check = async () =>{
            await checkAuthStatus();
        }

        check();
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
                                name="email"
                                onChange={handleChange}
                            />
                        </div>

                        <div className="m-2">
                            <label htmlFor="password">Enter password:</label>
                            <input
                                type="password"
                                className="px-2 rounded-full border-2 border-slate-200"
                                value={data.password}
                                name="password"
                                onChange={handleChange}
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
                    <h2>My Profile</h2>
                    <p>ID: {profile._id}</p>
                    <p>Name: {profile.name}</p>
                    <p>conact : {profile.contactNumber}</p>
                    <p>email : {profile.email}</p>
                    <div>
                        {(profile.address != 0) ? (
                            <div>
                                <p>address : </p>
                                {profile.address.map((address) => (
                                    <p key={address._id}>
                                        {address.street}, {address.city}, {address.state}, {address.postalCode} {(address.isDefault) ? "Default" : ""}
                                    </p>
                                ))}
                            </div>
                        ) : (
                            <p>no address</p>
                        ) }
                    </div>
                    <div>
                        <p>cart id : {profile.cart._id}</p>
                        {profile.cart.items.length != 0 ? (
                            profile.cart.items.map((item) => (
                                <div key={item._id}>
                                    <p>product id : {item.product}</p>
                                    <p>quantity : {item.quantity}</p>
                                </div>
                            ))
                        ) : (
                            <p>no items in cart</p>
                        )}
                    </div>
                    <p>cart price : {profile.cart.total}</p>
                    <button
                        onClick={handleLogout}
                        className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
                    >
                        Logout
                    </button>
                </div>
            )}
        </div>
    );
}