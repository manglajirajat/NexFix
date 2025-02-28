import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Heart, ShoppingCart, Star, ChevronLeft, ChevronRight } from "lucide-react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ProductList() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState("featured");
  const { category, subCategory } = useParams();

  const productsPerPage = 12;
  const totalPages = Math.ceil(data.length / productsPerPage);

  const fetchCategoryData = async (category) => {
    try {
      setLoading(true);
      const response = await fetch(
        `http://localhost:3000/api/v1/product/getCategory/${category}`,
        { method: "GET" }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }

      const result = await response.json();
      setData(result.data);
    } catch (error) {
      console.log(error);
      toast.error("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  const fetchSubcatData = async (subCategory) => {
    try {
      setLoading(true);
      const response = await fetch(
        `http://localhost:3000/api/v1/product/getSubcategory/${subCategory}`,
        { method: "GET" }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch");
      }

      const result = await response.json();
      setData(result.data);
    } catch (error) {
      console.log(error);
      toast.error("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (productId) => {
    try {
      const response = await fetch("http://localhost:3000/api/v1/cart/addToCart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body: JSON.stringify({
          product: productId,
          quantity: 1,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to add to cart");
      }

      toast.success("Added to cart successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to add to cart. Please try again.");
    }
  };

  const sortProducts = (products) => {
    switch (sortBy) {
      case "price-low":
        return [...products].sort((a, b) => a.netPrice - b.netPrice);
      case "price-high":
        return [...products].sort((a, b) => b.netPrice - a.netPrice);
      case "name":
        return [...products].sort((a, b) => a.name.localeCompare(b.name));
      default:
        return products;
    }
  };

  const getCurrentPageProducts = () => {
    const sortedProducts = sortProducts(data);
    const startIndex = (currentPage - 1) * productsPerPage;
    return sortedProducts.slice(startIndex, startIndex + productsPerPage);
  };

  useEffect(() => {
    if (subCategory) {
      fetchSubcatData(subCategory);
    } else if (category) {
      fetchCategoryData(category);
    }
  }, [category, subCategory]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900">
          {category || subCategory || "All Products"}
        </h1>
        <div className="flex items-center space-x-4">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="border rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="featured">Featured</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="name">Name</option>
          </select>
        </div>
      </div>

      {/* Product Grid */}
      {data.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {getCurrentPageProducts().map((product) => (
            <div key={product._id} className="group">
              <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 group-hover:-translate-y-1">
                <Link to={`/product/${product._id}`} className="block relative">
                  <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden bg-gray-200">
                    <img
                      src={product.displayPicture}
                      alt={product.name}
                      className="object-cover object-center w-full h-full group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="absolute top-2 right-2 flex space-x-2">
                    <button className="p-2 rounded-full bg-white/80 hover:bg-white transition-colors">
                      <Heart size={20} className="text-gray-600" />
                    </button>
                  </div>
                </Link>

                <div className="p-4">
                  <Link to={`/product/${product._id}`}>
                    <div className="text-sm text-blue-600 mb-1">{product.category}</div>
                    <h3 className="font-semibold mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                      {product.name}
                    </h3>
                  </Link>

                  <div className="flex items-center mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={16}
                        className={i < (product.rating || 4) ? "text-yellow-400" : "text-gray-300"}
                        fill={i < (product.rating || 4) ? "currentColor" : "none"}
                      />
                    ))}
                  </div>

                  <div className="flex items-baseline gap-2 mb-4">
                    <span className="text-lg font-bold text-gray-900">₹{product.netPrice}</span>
                    <span className="text-sm text-gray-500 line-through">₹{product.price}</span>
                    <span className="text-sm text-green-600 font-semibold">
                      {Math.round(((product.price - product.netPrice) / product.price) * 100)}% off
                    </span>
                  </div>

                  <button
                    onClick={() => addToCart(product._id)}
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-md flex items-center justify-center gap-2 hover:bg-blue-700 transition-colors"
                  >
                    <ShoppingCart size={20} />
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No products found.</p>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center space-x-2 mt-8">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="p-2 rounded-md border hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft size={20} />
          </button>

          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i + 1}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-4 py-2 rounded-md ${
                currentPage === i + 1
                  ? "bg-blue-600 text-white"
                  : "border hover:bg-gray-100"
              }`}
            >
              {i + 1}
            </button>
          ))}

          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="p-2 rounded-md border hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      )}
    </div>
  );
}