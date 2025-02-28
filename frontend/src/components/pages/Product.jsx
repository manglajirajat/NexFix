import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Star, ShoppingCart, CreditCard } from "lucide-react";

export default function Product() {
  const [productDetail, setProductDetail] = useState(null);
  const { productId } = useParams();
  const [reviewData, setReviewData] = useState({
    rating: 0,
    comment: "",
  });

  const getProductDetail = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/v1/product/getProductDetail/${productId}`,
        {
          method: "GET",
        }
      );

      if (!response.ok) {
        throw new Error("Product not found");
      }

      const result = await response.json();
      setProductDetail(result.data);
    } catch (error) {
      console.log("Product not found:", error);
    }
  };

  const handleChange = (e) => {
    setReviewData({
      ...reviewData,
      [e.target.name]: e.target.value,
    });
  };

  const handelSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:3000/api/v1/review/addReview`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body: JSON.stringify({ productId: productId, ...reviewData }),
      });

      if (!response.ok) {
        throw new Error("something went wrong");
      }

      toast.success("added successfully");
      setReviewData({
        rating: 0,
        comment: "",
      });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getProductDetail();
  }, []);

  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <Star
        key={index}
        className={`w-5 h-5 ${
          index < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
        }`}
      />
    ));
  };

  return (
    <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 py-8">
        {productDetail && (
          <div className="space-y-12">
            <div className="grid md:grid-cols-2 gap-12 bg-white rounded-2xl shadow-lg p-8">
                <div className="relative group">
                <div className="overflow-hidden rounded-xl">
                    <img
                    src={productDetail.displayPicture}
                    alt={productDetail.name}
                    className="w-full h-[500px] object-contain transform transition-transform duration-300 group-hover:scale-105"
                    />
                </div>
                </div>
                <div className="space-y-6">
                <div className="space-y-2">
                    <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">
                    {productDetail.brand}
                    </p>
                    <h1 className="text-3xl font-bold text-gray-900">{productDetail.name}</h1>
                    <div className="flex items-center space-x-2">
                    <div className="flex">{renderStars(productDetail.rating)}</div>
                    <span className="text-gray-600">({productDetail.rating.toFixed(1)})</span>
                    </div>
                </div>

                <p className="text-gray-600 leading-relaxed">{productDetail.description}</p>

                <div className="space-y-2">
                    <p className="text-sm text-gray-500">Category: {productDetail.category}</p>
                    <div className="flex items-baseline space-x-4">
                    <p className="text-3xl font-bold text-gray-900">₹{productDetail.netPrice}</p>
                    <p className="text-lg text-gray-500 line-through">₹{productDetail.price}</p>
                    <p className="text-green-600 font-medium">
                        {productDetail.discount}% OFF
                    </p>
                    </div>
                </div>

                <div className="flex space-x-4 pt-6">
                    <button className="flex-1 bg-yellow-400 text-black py-3 px-6 rounded-lg font-bold hover:bg-yellow-500 transition-colors flex items-center justify-center space-x-2">
                    <ShoppingCart className="w-5 h-5" />
                    <span>Add to Cart</span>
                    </button>
                    <button className="flex-1 bg-gray-900 text-white py-3 px-6 rounded-lg font-bold hover:bg-gray-800 transition-colors flex items-center justify-center space-x-2">
                    <CreditCard className="w-5 h-5" />
                    <span>Buy Now</span>
                    </button>
                </div>
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-white rounded-xl shadow-md p-6">
                <h2 className="text-xl font-bold mb-4">Related Products</h2>
                <div className="text-gray-500">Products here</div>
                </div>
                <div className="bg-white rounded-xl shadow-md p-6">
                <h2 className="text-xl font-bold mb-4">More You Might Like</h2>
                <div className="text-gray-500">Liked products here</div>
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-md p-8">
                <div className="flex items-center space-x-4 mb-8">
                <h2 className="text-2xl font-bold">Reviews</h2>
                <div className="flex items-center space-x-2">
                    <div className="flex">{renderStars(productDetail.rating)}</div>
                    <span className="text-gray-600">({productDetail.rating.toFixed(2)})</span>
                </div>
                </div>

                <form onSubmit={handelSubmit} className="mb-8">
                <div className="grid md:grid-cols-2 gap-4">
                    <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Your Rating
                    </label>
                    <input
                        type="number"
                        max={5}
                        name="rating"
                        value={reviewData.rating}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                        required
                    />
                    </div>
                    <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Your Review
                    </label>
                    <input
                        type="text"
                        name="comment"
                        value={reviewData.comment}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                        required
                    />
                    </div>
                </div>
                <button className="mt-4 bg-blue-500 text-white py-2 px-6 rounded-lg font-medium hover:bg-blue-600 transition-colors">
                    Submit Review
                </button>
                </form>

                <div className="space-y-6">
                {productDetail.reviews.map((review, index) => (
                    <div
                    key={index}
                    className="border-b border-gray-200 last:border-0 pb-6 last:pb-0"
                    >
                    <div className="flex items-center space-x-2 mb-2">
                        <div className="flex">{renderStars(review.rating)}</div>
                        <span className="text-gray-600">({review.rating})</span>
                    </div>
                    <p className="text-gray-700 mb-2">{review.comment}</p>
                    <p className="text-sm text-gray-500">By {review.userId.name}</p>
                    </div>
                ))}
              </div>
            </div>
          </div>
        )}
        </div>
    </div>
  );
}