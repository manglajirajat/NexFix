import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { toast } from "react-toastify";
import { Typography, Input, Button } from "@material-tailwind/react";
import { Link } from "react-router-dom";

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
            console.log(data);
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
        loading ? (
            <p>Loading...</p>
        ) : !profile ? (
            <div className='flex'>
                <div className='w-[60%] bg-amber-50'>
                    <img src="https://img.freepik.com/free-vector/mobile-login-concept-illustration_114360-83.jpg?t=st=1739805063~exp=1739808663~hmac=4a51e84bac1ddfd9c09e341d562a854e329754f7d6883163f2c0c2b2de11c9ef&w=1060" alt="Login Image Not Found" className='w-full h-screen' />
                </div>

                <div className='w-[40%] bg-blue-500 px-32 py-40'>
                    <h1 className='font-mono font-extrabold text-amber-50 text-4xl flex text-nowrap'>
                        <EyeIcon className='w-12 h-12 text-amber-600'/>
                        Login to karle 😭
                    </h1>
                    <p className='my-2'>
                        Account nahi bana rakha pehle se ? <a className="hover:text-blue-50 underline" href="">Register</a>
                        {error && <p className="text-red-500">{error}</p>}
                    </p>

                    <form onSubmit={handleSubmit}>

                        <div className='py-1.5'>
                            <label htmlFor="Email" className='text-amber-800 text'>Email</label>
                            <input type="email" name="email" placeholder='Email daal bhadwe' value={data.email} onChange={handleChange} required className='w-full border py-1.5 px-2 rounded-lg '/>
                        </div>

                        <div className='my-2'>
                            <label htmlFor="Password" className='text-amber-800 text'>Password</label>
                            <div className="relative">
                                <input 
                                    size="lg" 
                                    type={passwordShown ? "text" : "password"} 
                                    value={data.password} 
                                    name="password" 
                                    onChange={handleChange} 
                                    placeholder='password daal' 
                                    className='w-full border py-1.5 px-2 rounded-lg'
                                />
                                <i onClick={togglePasswordVisibility} className='absolute right-2 top-3 cursor-pointer'>
                                    {passwordShown ? <EyeIcon className='h-5 w-5' /> : <EyeSlashIcon className='h-5 w-5' />}
                                </i>
                            </div>
                        </div>
    
                        <button className='mt-2 w-20 border border-gray-600 rounded-lg hover:bg-blue-700 transition duration-300 px-1.5 py-1.5' type="submit">
                            <span className='text-white'>LogIn</span>
                        </button>

                        <p>
                            <a href="" className='text-xs underline hover:text-white'>Forgot Password ?</a>
                        </p>
                    </form>

                    <div>dont have account <Link to={"/createAccount"} className="text-white hover:underline">Create Now!</Link></div>
                </div>
            </div>
        ) : (
            <div>
                <span color="blue-gray" className="mb-4">
                    Profile Details
                </span>
                <span className="mb-2">
                    <strong>Name: </strong> {profile.name}
                </span>
                <span className="mb-4">
                    <strong>Email:</strong> {profile.email}
                </span>
                    <div>
                        address :
                        {profile.address && profile.address.map((address) => (
                            <address key={address._id}>{address.street}, {address.city} {address.state}-{address.postalCode}</address>
                        ))}
                        <Link to={"/addAddress"} className="text-blue-500 hover:underline">add address</Link>
                    </div>
                <Button color="red" size="lg" className="mt-4" fullWidth onClick={handleLogout}>
                    Log Out
                </Button>
            </div>
        )
    );
}
