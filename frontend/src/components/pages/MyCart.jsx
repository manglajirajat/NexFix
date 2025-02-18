import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Trash } from "lucide-react";
import { toast } from "react-toastify";

export default function MyCart() {
    const [cart, setCart] = useState(null);
    const [user, setUser] = useState([]);
    const [address, setAddress] = useState(null);

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

    const getUser = async () => {
        try {
            const response = await fetch("http://localhost:3000/api/v1/user/me", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                },
            });

            if (!response.ok) {
                throw new Error("An error occurred while fetching user details");
            }

            const result = await response.json();
            setUser(result.data);
        } catch (error) {
            console.error(error);
        }
    };

    const removeFromCart = async (product) => {
        try {
            const response = await fetch("http://localhost:3000/api/v1/cart/removeFromCart", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                },
                body: JSON.stringify({ product }),
            });

            if (!response.ok) {
                throw new Error("An error occurred while removing from cart");
            }

            toast.success("Product removed successfully");
            fetchCart();
        } catch (error) {
            console.log(error);
        }
    };

    const buyNow = async () => {
        if(cart.items.length == 0){
            toast.error("Cart is empty");
            return;
        }

        if (!address) {
            toast.error("Please select a shipping address.");
            return;
        }

        try {
            const response = await fetch("http://localhost:3000/api/v1/order/placeOrderViaCart", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                },
                body: JSON.stringify({ paymentMethod: "online", shippingAddress: address }),
            });

            if (!response.ok) {
                throw new Error("An error occurred while placing the order");
            }

            const result = await response.json();
            const order = result.data;

            const paymentResponse = await fetch("http://localhost:3000/api/v1/payment/generate-payment-link", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                },
                body: JSON.stringify({
                    link_id: order._id,
                    link_amount: order.total,
                    link_currency: "INR",
                    link_purpose: "placing order",
                    customer_details: {
                        customer_phone: user.contactNumber,
                        customer_email: user.email,
                        customer_name: user.name,
                    },
                    link_notify: { send_sms: true, send_email: true },
                }),
            });

            if (!paymentResponse.ok) {
                throw new Error("An error occurred while generating payment link");
            }

            const paymentResult = await paymentResponse.json();
            toast.success("Redirecting to payment gateway...");
            setTimeout(() => {
                redirectToPayment(paymentResult.link_url);
            }, 2000);
        } catch (error) {
            console.error(error);
            toast.error(error.message);
        }
    };

    const redirectToPayment = (link) => {
        window.open(link, "_blank");
    };

    useEffect(() => {
        fetchCart();
        getUser();
    }, []);

    if (!cart) return <p>Loading cart...</p>;

    return (
        <div className="flex">
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
                                    <button
                                        className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-md text-sm font-semibold hover:bg-red-600"
                                        onClick={() => removeFromCart(item.product._id)}
                                    >
                                        <Trash size={16} />
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
                                        Quantity:&nbsp;
                                        <select name="quantity" value={item.quantity}>
                                            <option value="0">0</option>
                                            {[...Array(10).keys()].map((num) => (
                                                <option key={num} value={num + 1}>{num + 1}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <p className="mt-6 text-lg font-semibold">Total: ₹{cart.total}</p>
                <button className="bg-yellow-400 font-bold px-2 py-1 rounded-md hover:bg-yellow-500" onClick={buyNow}>Buy Now</button>
            </div>

            <div className="p-4">
                <div className="">
                    <p className="mb-4">Select Shipping Address:</p>
                    {user.address?.map((addr) => (
                        <div key={addr._id}>
                            <input type="radio" name="address" id={addr._id} value={addr._id} checked={addr._id === address} onChange={(e) => setAddress(e.target.value)} />
                            <label htmlFor={addr._id}>{addr.street}, {addr.city} {addr.state}-{addr.postalCode}</label>
                        </div>
                    ))}
                    <Link to={"/addAddress"} className="text-blue-500 hover:underline">add address</Link>
                </div>

                <div className="">
                    <p className="my-4">Payment Mode : </p>
                    <div>
                        <input type="radio" name="paymentMode" id="online" value="online" />
                        <label htmlFor="online">Online</label>
                    </div>
                    <div>
                        <input type="radio" name="paymentMode" id="cod" value="cod" />
                        <label htmlFor="cod">Cash on Delivery</label>
                    </div>
                </div>
            </div>
        </div>
    );
}





// Check Payment Status
            // const checkPaymentStatus = {
            //     method: 'GET',
            //     headers: {
            //         'x-client-id': 'TEST10480256ed35a6380df1066e386d65208401',
            //         'x-client-secret': 'cfsk_ma_test_e94dbc2f14d6e0b297dc6fcd383f0f12_eeeac491',
            //         'x-api-version': '2025-01-01'
            //     }
            // };
    
            // const paymentStatus = await fetch(`https://sandbox.cashfree.com/pg/links/${order._id}`, checkPaymentStatus);
            
            // if (!paymentStatus.ok) {
            //     throw new Error("An error occurred while checking payment status");
            // }
    
            // const paymentStatusResult = await paymentStatus.json();
    
            // if (paymentStatusResult.status === "PAID") {
            //     toast.success("Order placed successfully!");
            // } else {
            //     toast.error("Payment failed. Please try again.");
            // }
