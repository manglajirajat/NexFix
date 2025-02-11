import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Trash } from "lucide-react";
import { toast } from "react-toastify";

export default function MyCart() {
    const [cart, setCart] = useState(null);

    const fetchCart = async () => {
        try {
            const response = await fetch("http://localhost:3000/api/v1/cart/getCart", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                },
            });

            if (!response.ok) {
                throw new Error("An error occurred while fetching the cart");
            }

            const result = await response.json();
            setCart(result.data);
        } catch (error) {
            console.error(error);
        }
    };

    const removeFromCart = async (product) => {
        try {
            const response = await fetch("http://localhost:3000/api/v1/cart/removeFromCart",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                    },
                    body: JSON.stringify({ product }),
                }
            )

            if(!response.ok) {
                throw new Error("An error occurred while removing from cart");
            }

            toast.success("Product removed successfully");
            fetchCart();
        } catch (error) {
            console.log(error);
        }
    }  

    useEffect(() => {
        fetchCart();
    }, []);

    if (!cart) return <p>Loading cart...</p>;

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-semibold mb-4">My Cart</h1>
            <p className="mb-4">Cart ID: {cart._id}</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {cart.items?.map((item) => (
                    <div key={item._id} className="group">
                        
                            <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 group-hover:-translate-y-1">
                                <div className="relative h-64 bg-gray-100">
                                    <img
                                        src={item.product.displayPicture || "/placeholder.svg"}
                                        alt={item.product.name}
                                        className="object-cover w-full h-full"
                                    />
                                    <button className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-md text-sm font-semibold hover:bg-red-600 " 
                                    onClick={() => removeFromCart(item.product._id)}>
                                        <Trash size={16}/>
                                    </button>
                                </div>
                                
                                <div className="p-4">
                                <Link to={`/product/${item.product._id}`}>
                                    <div className="text-sm text-blue-600 mb-1">{item.product.category}</div>
                                    <h3 className="font-semibold mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                                        {item.product.name}
                                    </h3>
                                    <div className="flex items-baseline gap-2">
                                        <span className="text-lg font-bold text-blue-600">₹{item.price}</span>
                                        <span className="text-sm text-gray-500 line-through mb-2">₹{item.product.price}</span>
                                    </div>
                                    </Link>
                                    <div>
                                        <span>Quantity : </span>
                                        <select name="quantity" id="" value={item.quantity}>
                                            {[...Array(10).keys()].map((num) => (
                                                <option key={num} value={num + 1}>
                                                    {num + 1}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </div>
                        
                    </div>
                ))}
            </div>

            <p className="mt-6 text-lg font-semibold">Total: ₹{cart.total}</p>
            <button className="bg-yellow-400 font-bold px-2 py-1 rounded-md hover:bg-yellow-500">Buy Now</button>
        </div>
    );
}
