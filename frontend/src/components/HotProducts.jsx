import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

export function HotProducts() {
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState({});
  const [loading, setLoading] = useState(false);

  const getProducts = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/v1/product/getfeatured");
      if (!response.ok) throw new Error("Error occurred while fetching data");
      const result = await response.json();
      setProducts(result.data);
    } catch (error) {
      console.log(error);
    }
  };
  
  useEffect(() => {
    getProducts();
  }, []);
  
  const handleChange = (e, product, price) => {
    const { name, value } = e.target;
    setCartItems((prev) => ({
      ...prev,
      [product]: {
        ...prev[product], 
        product: product, 
        quantity: parseInt(value, 10),
        price: price
      },
    }));
  };

  const addToCart = async (productId) => {
    const item = cartItems[productId];
    if (!item || item.quantity === 0) {
      alert("Please select a quantity first.");
      return;
    }
    setLoading(true);

    try {
      const responce = await fetch("http://localhost:3000/api/v1/cart/addInCart",{
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body: JSON.stringify(item),
      })

      if (!responce.ok) throw new Error("Error occurred while adding to cart");
      setLoading(false);
      
      toast.success("Product added to cart successfully");

      setTimeout(() =>{
        window.location.reload();
      },5000);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="container mx-auto px-4 py-12">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl lg:text-3xl font-bold">Hot Selling Products</h2>
        <Link to="/featured" className="text-blue-600 hover:underline">View All</Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div key={product._id} className="group">
            <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 group-hover:-translate-y-1">
              <div className="relative">
                <div className="relative h-64 bg-gray-100">
                  <img src={product.displayPicture || "/placeholder.svg"} alt={product.name} className="object-cover w-full h-full" />
                </div>
                {product.badge && (
                  <span className="absolute top-2 left-2 bg-blue-600 text-white px-2 py-1 rounded-md text-sm font-semibold">
                    {product.badge}
                  </span>
                )}
              </div>
              <div className="p-4">
                <Link to={`/product/${product._id}`}>
                  <div className="text-sm text-blue-600 mb-1">{product.category}</div>
                  <h3 className="font-semibold mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                    {product.name}
                  </h3>
                  <div className="flex items-baseline gap-2">
                    <span className="text-lg font-bold text-blue-600">₹{product.netPrice}</span>
                    <span className="text-sm text-gray-500 line-through mb-2">₹{product.price}</span>
                  </div>
                </Link>
                <div className="flex justify-between items-center mt-2">
                  <button 
                  onClick={() => addToCart(product._id)} 
                  className="bg-yellow-400 text-black px-2 py-1 rounded-md font-bold hover:bg-yellow-500 transition-colors disabled:opacity-50" 
                  disabled={loading}>
                    Add to Cart
                  </button>
                  <div>
                    Quantity:&nbsp;
                    <select name="quantity" value={cartItems[product._id]?.quantity || 0} onChange={(e) => handleChange(e, product._id,product.netPrice)}>
                      <option value="0">0</option>
                      {[...Array(10).keys()].map((num) => (
                        <option key={num} value={num + 1}>{num + 1}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
