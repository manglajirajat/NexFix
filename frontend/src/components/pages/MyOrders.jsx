import { useState, useEffect } from "react";
import { Package2, CreditCard, Banknote, AlertCircle, Loader2, Calendar, ShoppingBag, TrendingUp, Truck, CheckCircle2, ThumbsUp, ThumbsDown, CircleX, ChevronLeft, ChevronRight } from "lucide-react";
import { backendUrl } from "../../constant";

export default function MyOrders() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [view, setView] = useState('grid');
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [ordersPerPage] = useState(4);

    const fetchOrders = async () => {
        try {
            const response = await fetch(`${backendUrl}/api/v1/order/getOrders`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                },
            });

            if (!response.ok) {
                throw new Error("Failed to fetch orders");
            }

            const result = await response.json();
            setOrders(result.data);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const updateOrderStatus = () => {
        orders.forEach(async(order) => {
            const response = await fetch(`${backendUrl}/api/v1/order/updateOrderStatus/${order._id}`, {
                method : "GET",
                headers : {
                    "Content-Type" : "application/json",
                    Authorization : `Bearer ${localStorage.getItem("accessToken")}`
                }
            });
        });
    }

    const redirectToPayment = (id) => async () => {
        try {
            const response = await fetch(`${backendUrl}/api/v1/order/getPaymentLink/${id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                },
            });

            if (!response.ok) {
                throw new Error("Failed to fetch payment link");
            }

            const result = await response.json();
            window.open(result.data, "_blank");
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        fetchOrders()
    }, []);

    useEffect(() => {
        updateOrderStatus();
    }, [orders]);

    const getOrderStatusIcon = (status) => {
        switch (status) {
            case 'processing':
                return <Package2 className="w-4 h-4" />;
            case 'shipped':
                return <Truck className="w-4 h-4" />;
            case 'delivered':
                return <CheckCircle2 className="w-4 h-4" />;
            case 'cancelled':
                return <CircleX className="w-4 h-4" />;
            default:
                return <Loader2 className="w-4 h-4 animate-spin" />;
        }
    };

    const getOrderStatusCss = (status) => {
        switch (status) {
            case 'pending':
                return 'bg-red-50 text-red-700 ring-1 ring-red-600/30';
            case 'processing':
                return 'bg-yellow-50 text-yellow-700 ring-1 ring-yellow-600/30';
            case 'shipped':
                return 'bg-blue-50 text-blue-700 ring-1 ring-blue-600/30';
            case 'delivered':
                return 'bg-green-50 text-green-700 ring-1 ring-green-600/30';
            default:
                return 'bg-red-50 text-red-700 ring-1 ring-red-600/30';
        }
    }

    const getPaymentMethodIcon = (status) => {
        switch(status) {
            case 'online':
                return <CreditCard className="w-5 h-5" />;
            default:
                return <Banknote className="w-5 h-5" />;
        }
    };

    const getPaymentStatusIcon = (status) => {
        switch(status) {
            case 'completed':
                return <ThumbsUp className="w-4 h-4" />;
            default:
                return <ThumbsDown className="w-4 h-4" />;
        }
    };

    // Get current orders
    const indexOfLastOrder = currentPage * ordersPerPage;
    const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
    const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);

    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
            <div className="text-center">
                <div className="relative">
                    <ShoppingBag className="w-16 h-16 text-blue-600 mx-auto mb-4 animate-bounce" />
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-16 bg-blue-600/10 rounded-full animate-ping" />
                </div>
                <p className="text-lg font-medium text-gray-900">Loading your orders...</p>
                <p className="text-sm text-gray-500">Just a moment while we fetch your shopping history</p>
            </div>
        </div>
    );

    if (error) return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
            <div className="bg-white p-8 rounded-2xl shadow-lg max-w-md w-full text-center">
                <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4 animate-pulse" />
                <h2 className="text-2xl font-semibold text-gray-900 mb-2">Error Loading Orders</h2>
                <p className="text-gray-600">{error}</p>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">My Orders</h1>
                        <p className="text-gray-500">Track and manage your purchases</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setView('grid')}
                            className={`p-2 rounded-lg transition-colors ${view === 'grid' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-500 hover:bg-white/50'}`}
                        >
                            <TrendingUp className="w-5 h-5" />
                        </button>
                        <button
                            onClick={() => setView('list')}
                            className={`p-2 rounded-lg transition-colors ${view === 'list' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-500 hover:bg-white/50'}`}
                        >
                            <Package2 className="w-5 h-5" />
                        </button>
                        <div className="h-6 w-px bg-gray-200" />
                        <span className="text-sm font-medium text-gray-500">
                            {orders.length} {orders.length === 1 ? 'order' : 'orders'} found
                        </span>
                    </div>
                </div>
                
                {orders.length > 0 ? (
                    <>
                        <div className={`${view === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 gap-6' : 'space-y-6'}`}>
                            {currentOrders.map((order) => (
                                <div 
                                    key={order._id} 
                                    className={`bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-all duration-300 ${
                                        selectedOrder === order._id ? 'ring-2 ring-blue-500 ring-offset-2' : ''
                                    }`}
                                    onClick={() => setSelectedOrder(selectedOrder === order._id ? null : order._id)}
                                >
                                    <div className="p-6">
                                        <div className="flex items-center justify-between mb-6">
                                            <div className="space-y-1">
                                                <div className="flex items-center gap-2 text-gray-900">
                                                    <Package2 className="w-5 h-5 text-blue-600" />
                                                    <span className="text-sm font-medium">Order #{order._id}</span>
                                                </div>
                                                <div className="flex items-center gap-2 text-gray-500 text-sm">
                                                    <Calendar className="w-4 h-4" />
                                                    <span>{new Date(order.createdAt).toLocaleDateString('en-US', { 
                                                        year: 'numeric', 
                                                        month: 'long', 
                                                        day: 'numeric' 
                                                    })}</span>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${
                                                    getOrderStatusCss(order.orderStatus)
                                                }`}>
                                                    {getOrderStatusIcon(order.orderStatus)}
                                                    {order.orderStatus}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="space-y-4">
                                            {order.items.map((item) => (
                                                <div key={item._id} className="flex gap-4 p-3 bg-gray-50/50 rounded-xl hover:bg-gray-50 transition-colors group">
                                                    <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 bg-white p-2 group-hover:scale-105 transition-transform">
                                                        <img
                                                            src={item.product.displayPicture || "/placeholder.svg"}
                                                            alt={item.product.name}
                                                            className="w-full h-full object-contain"
                                                        />
                                                    </div>
                                                    <div className="flex-1 min-w-0 flex flex-col justify-center">
                                                        <h3 className="font-medium text-gray-900 text-base leading-tight mb-1 group-hover:text-blue-600 transition-colors">
                                                            {item.product.name}
                                                        </h3>
                                                        <div className="flex items-baseline gap-2 mb-1">
                                                            <span className="text-lg font-semibold text-blue-600">₹{item.price.toLocaleString()}</span>
                                                            {item.product.price !== item.price && (
                                                                <span className="text-sm text-gray-500 line-through">₹{item.product.price.toLocaleString()}</span>
                                                            )}
                                                        </div>
                                                        <div className="text-sm text-gray-600">
                                                            Quantity: {item.quantity}
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>

                                        <div className="mt-6 pt-6 border-t border-gray-100">
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-2 text-gray-600">
                                                    {getPaymentMethodIcon(order.paymentMethod)}
                                                    <span className="text-sm font-medium">{order.paymentMethod}</span>
                                                </div>
                                                <div className="text-xl font-bold text-gray-900">
                                                    ₹{order.total.toLocaleString()}
                                                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs ml-2 font-medium ${
                                                        order.paymentStatus === 'completed' 
                                                        ? 'bg-green-50 text-green-700 ring-1 ring-green-600/10'
                                                        : 'bg-red-50 text-red-700 ring-1 ring-red-600/10'
                                                     }`}>
                                                        {getPaymentStatusIcon(order.paymentStatus)}
                                                        {order.paymentStatus}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="border-t border-gray-100 py-6 mx-6 flex items-center justify-between">
                                            <button className="text-blue-600 text-sm font-semibold hover:underline">Track Order</button>
                                            <button className="text-gray-500 text-sm hover:underline"
                                                onClick={redirectToPayment(order._id)}
                                            >
                                                {order.paymentStatus === "completed" ? "Receipt" : "Pay Now"}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Pagination Controls */}
                        <div className="flex justify-center mt-8">
                            <nav className="inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                                <button
                                    onClick={() => setCurrentPage(currentPage - 1)}
                                    disabled={currentPage === 1}
                                    className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                                >
                                    <span className="sr-only">Previous</span>
                                    <ChevronLeft className="h-5 w-5" aria-hidden="true" />
                                </button>
                                {Array.from({ length: Math.ceil(orders.length / ordersPerPage) }, (_, i) => (
                                    <button
                                        key={i + 1}
                                        onClick={() => paginate(i + 1)}
                                        className={`relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium ${
                                            currentPage === i + 1 ? 'text-blue-600 bg-blue-50' : 'text-gray-700 hover:bg-gray-50'
                                        }`}
                                    >
                                        {i + 1}
                                    </button>
                                ))}
                                <button
                                    onClick={() => setCurrentPage(currentPage + 1)}
                                    disabled={currentPage === Math.ceil(orders.length / ordersPerPage)}
                                    className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                                >
                                    <span className="sr-only">Next</span>
                                    <ChevronRight className="h-5 w-5" aria-hidden="true" />
                                </button>
                            </nav>
                        </div>
                    </>
                ) : (
                    <div className="bg-white rounded-2xl shadow-sm p-12 text-center max-w-2xl mx-auto">
                        <div className="relative mb-6">
                            <ShoppingBag className="w-20 h-20 text-gray-400 mx-auto" />
                            <div className="absolute inset-0 bg-gray-400/10 rounded-full animate-ping" />
                        </div>
                        <h2 className="text-2xl font-semibold text-gray-900 mb-3">No Orders Found</h2>
                        <p className="text-gray-600 max-w-md mx-auto">
                            Your shopping journey hasn't begun yet. When you make your first purchase, your orders will appear here.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}