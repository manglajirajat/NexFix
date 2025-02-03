import { Link } from "react-router-dom";

export function HotProducts() {
  const products = [
    {
      id: 1,
      name: "Bosch GSB 500W Professional Impact Drill",
      price: "₹3,499",
      originalPrice: "₹4,299",
      image: "/placeholder.svg?text=Bosch+Drill&height=300&width=300",
      badge: "Best Seller",
      category: "Power Tools",
    },
    {
      id: 2,
      name: "Asian Paints Royale Interior Emulsion",
      price: "₹2,199",
      originalPrice: "₹2,599",
      image: "/placeholder.svg?text=Asian+Paints&height=300&width=300",
      badge: "Top Rated",
      category: "Paints",
    },
    {
      id: 3,
      name: "Kajaria Floor Tiles Premium Collection",
      price: "₹89",
      originalPrice: "₹129",
      image: "/placeholder.svg?text=Kajaria+Tiles&height=300&width=300",
      badge: "Hot",
      category: "Tiles",
      perUnit: "per sq.ft",
    },
    {
      id: 4,
      name: "Havells LED Panel Light 15W",
      price: "₹799",
      originalPrice: "₹999",
      image: "/placeholder.svg?text=Havells+LED&height=300&width=300",
      badge: "New",
      category: "Lighting",
    },
  ];

  return (
    <section className="container mx-auto px-4 py-12">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl lg:text-3xl font-bold">Hot Selling Products</h2>
        <Link to="/hot-products" className="text-blue-600 hover:underline">
          View All
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <Link key={product.id} to={`/product/${product.id}`} className="group">
            <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 group-hover:-translate-y-1">
              <div className="relative">
                <div className="relative h-64 bg-gray-100">
                  <img src={product.image || "/placeholder.svg"} alt={product.name} className="object-cover w-full h-full" />
                </div>
                {/* Badge text placed directly in the image container */}
                <div className="absolute top-2 right-2 bg-blue-600 text-white px-2 py-1 text-xs rounded-md">
                  {product.badge}
                </div>
              </div>
              <div className="p-4">
                <div className="text-sm text-blue-600 mb-1">{product.category}</div>
                <h3 className="font-semibold mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                  {product.name}
                </h3>
                <div className="flex items-baseline gap-2">
                  <span className="text-lg font-bold text-blue-600">{product.price}</span>
                  <span className="text-sm text-gray-500 line-through">{product.originalPrice}</span>
                  {product.perUnit && <span className="text-sm text-gray-500">{product.perUnit}</span>}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
