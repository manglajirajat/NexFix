import { Heart, ShoppingCart } from "lucide-react";

export function ProductCard({ product }) {
  return (
    <div className="group relative bg-white rounded-lg border shadow-sm overflow-hidden transition-all hover:shadow-md">
      {/* Product Image */}
      <div className="relative aspect-square bg-gray-100 overflow-hidden">
        <img
          src={product.image || "/placeholder.svg"}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
        {!product.inStock && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span className="text-white font-semibold px-4 py-2 bg-black/70 rounded-md text-sm sm:text-base">
              Out of Stock
            </span>
          </div>
        )}
        {product.isNew && (
          <span className="absolute top-2 right-2 bg-black text-white text-xs px-2 py-1 rounded">
            New Arrival
          </span>
        )}
        {product.recommended && (
          <span className="absolute top-2 left-2 bg-black text-white text-xs px-2 py-1 rounded">
            Recommended
          </span>
        )}
      </div>

      {/* Product Info */}
      <div className="p-3 sm:p-4">
        <h3 className="font-medium text-gray-800 mb-1 line-clamp-2 min-h-[40px] sm:min-h-[48px] text-sm sm:text-base">
          {product.name}
        </h3>
        <div className="flex items-baseline gap-2 mb-1 flex-wrap">
          <span className="text-lg sm:text-xl font-bold">₹{product.price.toLocaleString()}</span>
          <span className="text-xs sm:text-sm text-gray-500 line-through">₹{product.mrp.toLocaleString()}</span>
          <span className="text-xs sm:text-sm font-medium text-green-600">{product.discount}% off</span>
        </div>
        {product.extraDeals && (
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs sm:text-sm text-blue-600 border border-blue-600 px-2 py-1 rounded">
              Extra Deals Available
            </span>
          </div>
        )}
        <div className="text-xs sm:text-sm text-gray-600 mb-4">Free delivery by {product.deliveryDate}</div>
        <div className="flex gap-2">
          <button
            className={`flex-1 h-8 sm:h-10 text-xs sm:text-sm px-3 py-1 rounded ${
              product.inStock ? "bg-blue-600 hover:bg-blue-700 text-white" : "bg-gray-400 text-gray-600 cursor-not-allowed"
            }`}
            disabled={!product.inStock}
          >
            <ShoppingCart className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2 inline-block" />
            {product.inStock ? "Add to Cart" : "Out of Stock"}
          </button>
          <button className="h-8 w-8 sm:h-10 sm:w-10 border rounded flex items-center justify-center">
            <Heart className="w-3 h-3 sm:w-4 sm:h-4 text-gray-700" />
          </button>
        </div>
      </div>
    </div>
  );
}
