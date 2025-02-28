import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Trash2, Wand, ShoppingBag, MapPin, CreditCard, Truck, Package, Loader2, Plus } from "lucide-react";
import { toast } from "react-toastify";

export default function MyCart() {
    const [cart, setCart] = useState(null);
    const [user, setUser] = useState([]);
    const [address, setAddress] = useState(null);
    const [paymentMethod, setPaymentMethod] = useState("online");
    const [loading, setLoading] = useState(true);
    const [processing, setProcessing] = useState(false);

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
            toast.error(error.message);
            setLoading(true);
        }
    };

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
            toast.error(error.message);
        } finally {
            setLoading(false);
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
            toast.error(error.message);
        }
    };

    const updateQuantity = async (productId, quantity) => {
        // Add your quantity update logic here
        console.log("Updating quantity:", productId, quantity);
    };

    const buyNow = async () => {
        if (cart.items.length === 0) {
            toast.error("Your cart is empty");
            return;
        }

        if (!address) {
            toast.error("Please select a shipping address");
            return;
        }

        setProcessing(true);

        try {
            const response = await fetch("http://localhost:3000/api/v1/order/placeOrderViaCart", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                },
                body: JSON.stringify({ paymentMethod, shippingAddress: address }),
            });

            if (!response.ok) {
                throw new Error("An error occurred while placing the order");
            }

            const result = await response.json();
            const order = result.data;

            if (paymentMethod === "online") {
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
                    window.open(paymentResult.link_url, "_blank");
                }, 1500);
            } else {
                toast.success("Order placed successfully!");
            }
            
            setTimeout(() => {
                fetchCart();
            }, 2000);
        } catch (error) {
            toast.error(error.message);
        } finally {
            setProcessing(false);
        }
    };

    useEffect(() => {
        fetchCart();
        getUser();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="flex items-center gap-3 text-blue-600">
                    <Loader2 className="h-6 w-6 animate-spin" />
                    <span className="font-medium">Loading your cart...</span>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center gap-3 mb-8">
                    <ShoppingBag className="h-8 w-8 text-blue-600" />
                    <h1 className="text-2xl font-bold text-gray-900">Shopping Cart</h1>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-8">
                        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                            <div className="p-6">
                                {cart.items?.length === 0 ? (
                                    <div className="text-center py-12">
                                        <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                                        <h3 className="text-lg font-medium text-gray-900 mb-2">Your cart is empty</h3>
                                        <p className="text-gray-500 mb-6">Looks like you haven't added anything to your cart yet.</p>
                                        <Link
                                            to="/"
                                            className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                                        >
                                            Continue Shopping
                                        </Link>
                                    </div>
                                ) : (
                                    <div className="space-y-6">
                                        {cart.items?.map((item) => (
                                            <div key={item._id} className="flex gap-6 py-6 border-b border-gray-200 last:border-0">
                                                <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                                    <img
                                                        src={item.product.displayPicture || "https://via.placeholder.com/200"}
                                                        alt={item.product.name}
                                                        className="h-full w-full object-cover object-contain"
                                                    />
                                                </div>

                                                <div className="flex flex-1 flex-col">
                                                    <div>
                                                        <div className="flex justify-between">
                                                            <h3 className="text-base font-medium text-gray-900">
                                                                <Link to={`/product/${item.product._id}`} className="hover:text-blue-600">
                                                                    {item.product.name}
                                                                </Link>
                                                            </h3>
                                                            <button
                                                                onClick={() => removeFromCart(item.product._id)}
                                                                className="text-gray-400 hover:text-red-500 transition-colors"
                                                            >
                                                                <Trash2 className="h-5 w-5" />
                                                            </button>
                                                        </div>
                                                        <p className="mt-1 text-sm text-gray-500">{item.product.category}</p>
                                                    </div>
                                                    <div className="flex flex-1 items-end justify-between">
                                                        <div className="flex items-center gap-4">
                                                            <div className="flex items-center gap-2">
                                                                <label htmlFor={`quantity-${item._id}`} className="text-sm text-gray-600">
                                                                    Quantity:
                                                                </label>
                                                                <select
                                                                    id={`quantity-${item._id}`}
                                                                    value={item.quantity}
                                                                    onChange={(e) => updateQuantity(item.product._id, e.target.value)}
                                                                    className="rounded-md border-gray-300 py-1.5 text-base focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                                                                >
                                                                    {[...Array(10)].map((_, i) => (
                                                                        <option key={i + 1} value={i + 1}>
                                                                            {i + 1}
                                                                        </option>
                                                                    ))}
                                                                </select>
                                                            </div>
                                                        </div>
                                                        <div className="flex items-baseline gap-2">
                                                            <p className="text-lg font-medium text-gray-900">₹{item.price}</p>
                                                            {item.price < item.product.price && (
                                                                <p className="text-sm text-gray-500 line-through">₹{item.product.price}</p>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="bg-white rounded-xl shadow-sm overflow-hidden hidden lg:block">
                            <div className="p-6">
                                <div className="flex items-center gap-4">
                                    <Wand className="h-12 w-12 text-yellow-500 inline block"/>
                                    <p className="font-bold">Recommend For you</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-xl shadow-sm divide-y divide-gray-200">
                            <div className="p-6">
                                <h2 className="text-lg font-medium text-gray-900 mb-4">Order Summary</h2>
                                <div className="flow-root">
                                    <dl className="-my-4 divide-y divide-gray-200">
                                        <div className="py-4 flex items-center justify-between">
                                            <dt className="text-gray-600">Subtotal</dt>
                                            <dd className="font-medium text-gray-900">₹{cart.total}</dd>
                                        </div>
                                        <div className="py-4 flex items-center justify-between">
                                            <dt className="text-gray-600">Shipping</dt>
                                            <dd className="font-medium text-gray-900">Free</dd>
                                        </div>
                                        <div className="py-4 flex items-center justify-between">
                                            <dt className="text-base font-medium text-gray-900">Order Total</dt>
                                            <dd className="text-base font-medium text-gray-900">₹{cart.total}</dd>
                                        </div>
                                    </dl>
                                </div>
                            </div>

                            <div className="p-6 space-y-6">
                                <div>
                                    <h3 className="text-base font-medium text-gray-900 mb-4 flex items-center gap-2">
                                        <MapPin className="h-5 w-5 text-gray-500" />
                                        Shipping Address
                                    </h3>
                                    <div className="space-y-3">
                                        {user.address?.map((addr) => (
                                            <label
                                                key={addr._id}
                                                className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${
                                                    addr._id === address
                                                        ? "border-blue-500 bg-blue-50"
                                                        : "border-gray-200 hover:border-gray-300"
                                                }`}
                                            >
                                                <input
                                                    type="radio"
                                                    name="address"
                                                    value={addr._id}
                                                    checked={addr._id === address}
                                                    onChange={(e) => setAddress(e.target.value)}
                                                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                                                />
                                                <div className="flex-1 text-sm">
                                                    <p className="font-medium text-gray-900">{addr.type}</p>
                                                    <p className="text-gray-500">
                                                        {addr.street}, {addr.city}, {addr.state} {addr.postalCode}
                                                    </p>
                                                </div>
                                            </label>
                                        ))}
                                        <Link
                                            to="/addAddress"
                                            className={`flex items-center justify-center gap-2 p-3 rounded-lg border border-dashed border-gray-300 text-sm font-medium text-blue-600 hover:border-gray-400 hover:bg-gray-50 transition-colors ${user.address?.length == 3 ? "hidden" : ""}`}
                                        >
                                            <Plus className="h-4 w-4" />
                                            Add New Address
                                        </Link>
                                    </div>
                                </div>

                                <div>
                                    <h3 className="text-base font-medium text-gray-900 mb-4 flex items-center gap-2">
                                        <CreditCard className="h-5 w-5 text-gray-500" />
                                        Payment Method
                                    </h3>
                                    <div className="space-y-3">
                                        <label
                                            className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${
                                                paymentMethod === "online"
                                                    ? "border-blue-500 bg-blue-50"
                                                    : "border-gray-200 hover:border-gray-300"
                                            }`}
                                        >
                                            <input
                                                type="radio"
                                                name="paymentMethod"
                                                value="online"
                                                checked={paymentMethod === "online"}
                                                onChange={(e) => setPaymentMethod(e.target.value)}
                                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                                            />
                                            <div className="flex-1">
                                                <p className="font-medium text-gray-900">Online Payment</p>
                                                <p className="text-sm text-gray-500">Pay securely with your credit/debit card</p>
                                            </div>
                                        </label>

                                        <label
                                            className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${
                                                paymentMethod === "cod"
                                                    ? "border-blue-500 bg-blue-50"
                                                    : "border-gray-200 hover:border-gray-300"
                                            }`}
                                        >
                                            <input
                                                type="radio"
                                                name="paymentMethod"
                                                value="cod"
                                                checked={paymentMethod === "cod"}
                                                onChange={(e) => setPaymentMethod(e.target.value)}
                                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                                            />
                                            <div className="flex-1">
                                                <p className="font-medium text-gray-900">Cash on Delivery</p>
                                                <p className="text-sm text-gray-500">Pay when you receive your order</p>
                                            </div>
                                        </label>
                                    </div>
                                </div>
                            </div>

                            <div className="p-6">
                                <button
                                    onClick={buyNow}
                                    disabled={processing || cart.items?.length === 0}
                                    className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                >
                                    {processing ? (
                                        <>
                                            <Loader2 className="h-5 w-5 animate-spin" />
                                            Processing...
                                        </>
                                    ) : (
                                        <>
                                            <Truck className="h-5 w-5" />
                                            Place Order
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}