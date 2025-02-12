import { useEffect, useState } from "react";
import { Filter } from "lucide-react";
import { ProductCard } from "../ProductCard";

const products = [
  {
    id: 1,
    name: "Yale Digital Door Lock with Fingerprint Scanner",
    price: 15999,
    mrp: 18999,
    discount: 16,
    image: "https://images.unsplash.com/photo-1623509462625-be8602aee50c?w=800&q=80",
    brand: "Yale",
    category: "Door Hardware",
    recommended: true,
    extraDeals: true,
    deliveryDate: "Tomorrow, 2 PM",
    inStock: true,
  },
  {
    id: 2,
    name: "Hafele Premium Cabinet Handle Set - 10 Pieces",
    price: 2499,
    mrp: 2999,
    discount: 17,
    image: "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=800&q=80",
    brand: "Hafele",
    category: "Cabinet Hardware",
    isNew: true,
    deliveryDate: "Tomorrow, 2 PM",
    inStock: true,
  },
  {
    id: 3,
    name: "Godrej Ultra Secure Door Lock System",
    price: 4999,
    mrp: 5999,
    discount: 17,
    image: "https://images.unsplash.com/photo-1587134160474-cd3c89b3949e?w=800&q=80",
    brand: "Godrej",
    category: "Door Hardware",
    extraDeals: true,
    deliveryDate: "29 January, 2025",
    inStock: true,
  },
  {
    id: 4,
    name: "Premium Stainless Steel Drawer Slides - Pack of 5",
    price: 1799,
    mrp: 2299,
    discount: 22,
    image: "https://images.unsplash.com/photo-1581622558663-b2ce1f8d1f10?w=800&q=80",
    brand: "Hettich",
    category: "Cabinet Hardware",
    recommended: true,
    deliveryDate: "Tomorrow, 2 PM",
    inStock: true,
  },
  {
    id: 5,
    name: "Heavy Duty Door Hinges - Brass Finish",
    price: 899,
    mrp: 1199,
    discount: 25,
    image: "https://images.unsplash.com/photo-1597114134033-cb05ea0ce4ea?w=800&q=80",
    brand: "FPL",
    category: "Door Hardware",
    extraDeals: true,
    deliveryDate: "Tomorrow, 2 PM",
    inStock: false,
  },
  {
    id: 6,
    name: "Security Chain Lock with Door Viewer",
    price: 1299,
    mrp: 1599,
    discount: 19,
    image: "https://images.unsplash.com/photo-1617796110702-9a4e47de6b6b?w=800&q=80",
    brand: "Yale",
    category: "Door Hardware",
    isNew: true,
    deliveryDate: "29 January, 2025",
    inStock: true,
  },
];

const brands = ["Yale", "Hafele", "Godrej", "Hettich", "FPL"]
const categories = ["Door Hardware", "Cabinet Hardware", "Window Hardware", "Safety & Security"]

export function HardwarePage() {
  const [isLoading, setIsLoading] = useState(true);
  const [excludeOutOfStock, setExcludeOutOfStock] = useState(false);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [sortBy, setSortBy] = useState("featured");

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 1000);
  }, []);

  const handleBrandChange = (brand) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
  };

  const handleCategoryChange = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]
    );
  };

  const clearAllFilters = () => {
    setExcludeOutOfStock(false);
    setSelectedBrands([]);
    setSelectedCategories([]);
    setSortBy("featured");
  };

  const filteredProducts = products.filter((product) => {
    if (excludeOutOfStock && !product.inStock) return false;
    if (selectedBrands.length && !selectedBrands.includes(product.brand)) return false;
    if (selectedCategories.length && !selectedCategories.includes(product.category)) return false;
    return true;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      case "newest":
        return b.id - a.id;
      default:
        return 0;
    }
  });

  if (isLoading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Hardware & Accessories</h1>

      <div className="flex gap-8">
        {/* Sidebar for Filters */}
        <div className="w-1/4">
          <div className="mb-6">
            <button
              onClick={clearAllFilters}
              className="text-blue-600 hover:underline"
            >
              Clear All
            </button>
          </div>

          <div className="mb-6">
            <h2 className="font-semibold mb-2">Filters</h2>
            <label className="flex items-center mb-2">
              <input
                type="checkbox"
                checked={excludeOutOfStock}
                onChange={(e) => setExcludeOutOfStock(e.target.checked)}
                className="mr-2"
              />
              Exclude Out of Stock
            </label>
          </div>

          <div className="mb-6">
            <h2 className="font-semibold mb-2">Category</h2>
            {categories.map((category) => (
              <label key={category} className="flex items-center mb-2">
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(category)}
                  onChange={() => handleCategoryChange(category)}
                  className="mr-2"
                />
                {category}
              </label>
            ))}
          </div>

          <div className="mb-6">
            <h2 className="font-semibold mb-2">Brand</h2>
            {brands.map((brand) => (
              <label key={brand} className="flex items-center mb-2">
                <input
                  type="checkbox"
                  checked={selectedBrands.includes(brand)}
                  onChange={() => handleBrandChange(brand)}
                  className="mr-2"
                />
                {brand}
              </label>
            ))}
          </div>
        </div>

        {/* Product Grid */}
        <div className="w-3/4">
          <div className="mb-6">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="border px-2 py-1"
            >
              <option value="featured">Featured</option>
              <option value="newest">Newest</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}