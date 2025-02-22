import { useState,useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export default function UpdateAddress() {
    const { addressId }= useParams();
    const [newaddress, setAddress] = useState({
        type: '',
        street: '',
        city: '',
        state: '',
        postalCode: '',
    });
    const navigate = useNavigate();

    const fetchAddress = async() => {
        try{
            const response = await fetch("http://localhost:3000/api/v1/address/getAddressById",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({addressId}),
                }
            )

            if(!response.ok){
                throw new Error("Something went wrong");
            }

            const result = await response.json();
            setAddress(result.data);
        } catch (error) {
            toast.error(error);
        }
    }

    const handleChange = (e) => {
        setAddress({...newaddress, [e.target.name]: e.target.value});
    }

    const handleSubmit = async(e) => {
        e.preventDefault();

        try{
            const response = await fetch("http://localhost:3000/api/v1/address/update",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization : `Bearer ${localStorage.getItem("accessToken")}`,
                    },
                    body: JSON.stringify(newaddress),
                }
            )

            if(!response.ok){
                throw new Error("Something went wrong");
            }

            toast.success("Address updated successfully");
            navigate("/account");
        }
        catch(error){
            toast.error(error);
        }
    }

    useEffect(() => {
        fetchAddress();
    },[]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md">
                <h1 className="text-xl font-bold mb-4 text-center">Update Address</h1>
                <p>id : {newaddress._id}</p>
                {/* {error && <p className="text-red-500 text-sm mb-2">{error}</p>} */}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="street" className="block font-medium">Type</label>
                        <input
                            type="text"
                            name="type"
                            value={newaddress.type}
                            onChange={handleChange}
                            required
                            className="w-full p-2 border rounded-md"
                        />
                    </div>
                    <div>
                        <label htmlFor="street" className="block font-medium">Street</label>
                        <input
                            type="text"
                            name="street"
                            value={newaddress.street}
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
                            value={newaddress.city}
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
                            value={newaddress.state}
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
                            value={newaddress.postalCode}
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