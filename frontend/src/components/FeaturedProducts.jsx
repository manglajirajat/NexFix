import { Link } from "react-router-dom";

export function FeaturedProducts() {
  const products = [
    {
      id: 1,
      name: "Premium Stainless Steel Tools Set",
      price: "₹2,499",
      image: "/placeholder.svg?text=Steel+Tools+Set&height=200&width=200",
      category: "Hand Tools",
    },
    {
      id: 2,
      name: "Asian Paints Premium Emulsion",
      price: "₹1,899",
      image: "/placeholder.svg?text=Asian+Paints&height=200&width=200",
      category: "Paints",
    },
    {
      id: 3,
      name: "Hindware Ceramic Collection",
      price: "₹3,999",
      image: "/placeholder.svg?text=Hindware+Ceramics&height=200&width=200",
      category: "Ceramics",
    },
    {
      id: 4,
      name: "Bosch Professional Power Tools",
      price: "₹12,999",
      image: "/placeholder.svg?text=Bosch+Tools&height=200&width=200",
      category: "Power Tools",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <h2 className="text-2xl lg:text-3xl font-bold mb-8">Featured Products</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {products.map((product) => (
          <Link key={product.id} to={`/product/${product.id}`} className="group">
            <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 group-hover:-translate-y-1">
              <div className="relative h-48 bg-gray-100">
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="p-4">
                <div className="text-sm text-blue-600 mb-1">{product.category}</div>
                <h3 className="font-semibold mb-2 line-clamp-2">{product.name}</h3>
                <div className="text-lg font-bold text-blue-600">{product.price}</div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
