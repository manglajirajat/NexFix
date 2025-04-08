import { Link } from "react-router-dom";

export function FeaturedProducts() {
  const products = [
    {
      id: 1,
      name: "Barbques & Grills",
      price: "₹900",
      image: "https://th.bing.com/th/id/OIP.x49RtAoKt2eUXm2OHKD5wgHaHa?rs=1&pid=ImgDetMain",
      category: "Hand Tools",
    },
    {
      id: 2,
      name: "Asian Paints Premium Emulsion",
      price: "₹1,899",
      image: "https://imgs.search.brave.com/ABXxNOWk9fXAU9cNDdj7DxRTTZ6DCsv0-xXv1l1MF8E/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9zdGF0/aWMuYXNpYW5wYWlu/dHMuY29tL2NvbnRl/bnQvZGFtL2FzaWFu/X3BhaW50cy9wcm9k/dWN0cy9wYWNrc2hv/dHMvaW50ZXJpb3It/d2FsbHMtdHJhY3Rv/ci1lbXVsc2lvbi1z/aHluZS1hc2lhbi1w/YWludHMucG5nLnRy/YW5zZm9ybS9jYy13/aWR0aC0yMzAtaGVp/Z2h0LTI3My9pbWFn/ZS5wbmc",
      category: "Paints",
    },
    {
      id: 3,
      name: "Hindware Ceramic Collection",
      price: "₹3,999",
      image: "https://hindware.com/wp-content/uploads/2025/02/mrwhispers2560x1440.png",
      category: "Ceramics",
    },
    {
      id: 4,
      name: "Gas Stoves",
      price: "₹12,99",
      image: "https://i5.walmartimages.com/seo/Hassch-Rocket-Stove-for-Cooking-Outdoor-Camping-Portable-Wood-Burning-Stove-Camp-Fire-Tower-for-BBQ-Hunting-Fishing-Black_9e9f02bc-c3b5-498c-b88e-6121b4313d5a.d42b6291638ceccd9158b8a965e96798.jpeg?odnHeight=768&odnWidth=768&odnBg=FFFFFF",
      category: "Power Tools",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl lg:text-3xl font-bold mb-4">Featured Products</h2>
      <div className="flex gap-6 overflow-x-auto py-4">
        {products.map((product) => (
          <Link key={product.id} to={`/product/${product.id}`} className="group min-w-72 w-72">
            <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 group-hover:-translate-y-1">
              <div className="relative h-48 bg-gray-100">
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  className="object-contain w-full h-full"
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
