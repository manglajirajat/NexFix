import { useState,useEffect } from "react";
import { Link } from "react-router-dom";

export function HotProducts() {
  const [products, setProducts] = useState([]);

  const getProducts = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/v1/product/getfeatured");

      if(!response.ok){
        throw new Error("error occured while fetching the data");
      }

      const result = await response.json();
      setProducts(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProducts();
  })

  return (
    <section className="container mx-auto px-4 py-12">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl lg:text-3xl font-bold">Hot Selling Products</h2>
        <Link to="/featured" className="text-blue-600 hover:underline">
          View All
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <Link key={product._id} to={`/product/${product._id}`} className="group">
            <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 group-hover:-translate-y-1">
              <div className="relative">
                <div className="relative h-64 bg-gray-100">
                  <img src={product.displayPicture || "/placeholder.svg"} alt={product.name} className="object-cover w-full h-full" />
                </div>
                {/* Badge text placed directly in the image container */}
                {product.badge && (
                  <span className="absolute top-2 left-2 bg-blue-600 text-white px-2 py-1 rounded-md text-sm font-semibold">
                    {product.badge}
                  </span>
                )}
              </div>
              <div className="p-4">
                <div className="text-sm text-blue-600 mb-1">{product.category}</div>
                <h3 className="font-semibold mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                  {product.name}
                </h3>
                <div className="flex items-baseline gap-2">
                  <span className="text-lg font-bold text-blue-600">₹{product.netPrice}</span>
                  <span className="text-sm text-gray-500 line-through mb-2">₹{product.price}</span>
                </div>
                <div>
                  <button className="bg-yellow-400 text-white px-2 py-1 rounded-md hover:text-black">add to cart</button>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
