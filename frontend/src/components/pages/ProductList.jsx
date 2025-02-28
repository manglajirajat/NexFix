import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Grid, Search, SlidersHorizontal } from "lucide-react";

export default function ProductList() {
  const [data, setData] = useState([]);
  const [viewMode, setViewMode] = useState('grid');
  const { category, subCategory } = useParams();

  const fetchCategoryData = async (category) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/v1/product/getCategory/${category}`,
        { method: "GET" }
      );

      if (!response.ok) {
        throw new Error("failed to fetch products");
      }

      const result = await response.json();
      setData(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchSubcatData = async (subCategory) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/v1/product/getSubcategory/${subCategory}`,
        { method: "GET" }
      );

      if (!response.ok) {
        throw new Error("failed to fetch");
      }

      const result = await response.json();
      setData(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (subCategory) {
      fetchSubcatData(subCategory);
      return;
    }

    if (category) {
      fetchCategoryData(category);
      return;
    }
  }, [category, subCategory]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              {category ? category.charAt(0).toUpperCase() + category.slice(1) : "All"} Products
              {subCategory && <span className="text-gray-500 text-xl ml-2">/ {subCategory}</span>}
            </h1>
            <div className="flex items-center gap-4">
              <button className="p-2 hover:bg-gray-100 rounded-lg">
                <SlidersHorizontal className="h-5 w-5 text-gray-600" />
              </button>
              <button 
                className="p-2 hover:bg-gray-100 rounded-lg"
                onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
              >
                <Grid className="h-5 w-5 text-gray-600" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Product Grid */}
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {data.length > 0 ? (
          <div className={`grid ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' : 'grid-cols-1'} gap-6`}>
            {data.map((product) => (
              <div
                key={product._id}
                className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden"
              >
                <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden bg-gray-200">
                  <img
                    src={product.displayPicture}
                    alt={product.name}
                    className="h-64 w-full object-contain object-center group-hover:opacity-75"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-medium text-gray-900">{product.name}</h3>
                  <div className="mt-2 flex items-center gap-2">
                    <span className="text-2xl font-bold text-gray-900">
                      ${product.netPrice}
                    </span>
                    <span className="text-sm text-gray-500 line-through">
                      ${product.price}
                    </span>
                    <span className="text-sm font-medium text-green-600">
                      {product.discount}% OFF
                    </span>
                  </div>
                  <div className="mt-3 flex items-center gap-2">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {product.category}
                    </span>
                    {product.subCategory && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                        {product.subCategory}
                      </span>
                    )}
                  </div>
                  <button className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-200">
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <h3 className="mt-2 text-lg font-medium text-gray-900">No products found</h3>
            <p className="mt-1 text-sm text-gray-500">Try adjusting your search or filter to find what you're looking for.</p>
          </div>
        )}
      </div>
    </div>
  );
}