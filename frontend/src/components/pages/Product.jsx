// import { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import { Star, ShoppingCart, CreditCard, Heart, Share2, Truck, Shield, RotateCcw, ChevronRight, ChevronLeft } from 'lucide-react';
// import { backendUrl } from '../../constant';

// function Product() {
//   const { productId } = useParams();
//   const [productDetail, setProductDetail] = useState(null);
//   const [currentImage, setCurrentImage] = useState('');
//   const [currentImageIndex, setCurrentImageIndex] = useState(0);
//   const [reviewData, setReviewData] = useState({
//     rating: 0,
//     comment: "",
//   });
//   const [wishlist, setWishlist] = useState(false);
//   const [quantity, setQuantity] = useState(1);
//   const [activeTab, setActiveTab] = useState('description');
//   const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
//   const [isZoomed, setIsZoomed] = useState(false);

//   // Mock product data for demonstration
//   useEffect(() => {
//     const mockProduct = {
//       id: '1',
//       name: 'Premium Wireless Headphones',
//       brand: 'SoundMaster',
//       description: 'High-quality wireless headphones with noise cancellation and 30-hour battery life. Perfect for music lovers and professionals alike.',
//       longDescription: `
//         <p>Experience audio like never before with our Premium Wireless Headphones. These headphones combine cutting-edge technology with superior comfort to deliver an unmatched listening experience.</p>
//         <br>

//         <p>Key Features:</p>
//         <ul>
//           <li>Active Noise Cancellation blocks out external sounds</li>
//           <li>30-hour battery life on a single charge</li>
//           <li>Premium memory foam ear cushions for extended comfort</li>
//           <li>Bluetooth 5.2 for stable, high-quality wireless connection</li>
//           <li>Built-in microphone with voice assistant support</li>
//           <li>Foldable design for easy storage and travel</li>
//         </ul>

//         <br>
        
//         <p>What's in the box:</p>
//         <ul>
//           <li>Premium Wireless Headphones</li>
//           <li>Carrying case</li>
//           <li>USB-C charging cable</li>
//           <li>3.5mm audio cable</li>
//           <li>User manual</li>
//         </ul>
//       `,
//       specifications: [
//         { name: 'Driver Size', value: '40mm' },
//         { name: 'Frequency Response', value: '20Hz - 20kHz' },
//         { name: 'Impedance', value: '32 Ohms' },
//         { name: 'Battery Life', value: '30 hours' },
//         { name: 'Charging Time', value: '2 hours' },
//         { name: 'Bluetooth Version', value: '5.2' },
//         { name: 'Weight', value: '250g' },
//         { name: 'Colors Available', value: 'Black, White, Blue' }
//       ],
//       category: 'Electronics',
//       price: 12999,
//       netPrice: 9999,
//       discount: 23,
//       rating: 4.5,
//       stock: 15,
//       displayPicture: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
//       images: [
//         'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
//         'https://images.unsplash.com/photo-1583394838336-acd977736f90?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
//         'https://images.unsplash.com/photo-1546435770-a3e426bf472b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
//         'https://images.unsplash.com/photo-1487215078519-e21cc028cb29?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
//       ],
//       reviews: [
//         {
//           rating: 5,
//           comment: 'Excellent sound quality and comfortable to wear for long periods. The noise cancellation is top-notch!',
//           userId: { name: 'John Doe' },
//           date: '2023-05-15'
//         },
//         {
//           rating: 4,
//           comment: 'Great battery life, but could use more padding on the ear cups for extended wear.',
//           userId: { name: 'Jane Smith' },
//           date: '2023-04-22'
//         },
//         {
//           rating: 5,
//           comment: 'These headphones changed my life! Perfect for my daily commute and working from home.',
//           userId: { name: 'Alex Johnson' },
//           date: '2023-03-10'
//         }
//       ],
//       relatedProducts: [
//         {
//           id: '2',
//           name: 'Portable Bluetooth Speaker',
//           price: 4999,
//           netPrice: 3999,
//           discount: 20,
//           image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
//           rating: 4.2
//         },
//         {
//           id: '3',
//           name: 'Wireless Earbuds',
//           price: 7999,
//           netPrice: 6499,
//           discount: 19,
//           image: 'https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
//           rating: 4.7
//         },
//         {
//           id: '4',
//           name: 'Audio Amplifier',
//           price: 15999,
//           netPrice: 13999,
//           discount: 12,
//           image: 'https://images.unsplash.com/photo-1558089687-f282ffcbc0d4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
//           rating: 4.4
//         }
//       ]
//     };
    
//     setProductDetail(mockProduct);
//     setCurrentImage(mockProduct.displayPicture);
//   }, []);

//   useEffect(() => {
//     const fetchProductDetails = async () => {
//       try {
//         const response = await fetch(`${backendUrl}/api/v1/product/getProductDetail/${productId}`);
//         if (!response.ok) throw new Error('Network response was not ok');
//         const data = await response.json();
//         console.log('Product details fetched:', data.data);
//       } catch (error) {
//         console.error('Error fetching product details:', error);
//       }
//     }
//     fetchProductDetails();
//   }, [productId]);

//   const handleChange = (e) => {
//     setReviewData({
//       ...reviewData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log('Review submitted:', reviewData);
    
//     // Add the review to the existing reviews
//     if (productDetail) {
//       const newReview = {
//         rating: reviewData.rating,
//         comment: reviewData.comment,
//         userId: { name: 'You' },
//         date: new Date().toISOString().split('T')[0]
//       };
      
//       setProductDetail({
//         ...productDetail,
//         reviews: [newReview, ...productDetail.reviews]
//       });
//     }
    
//     // Reset form after submission
//     setReviewData({
//       rating: 0,
//       comment: "",
//     });
//   };

//   const handleImageClick = (image, index) => {
//     setCurrentImage(image);
//     setCurrentImageIndex(index);
//   };

//   const nextImage = () => {
//     if (productDetail) {
//       const newIndex = (currentImageIndex + 1) % productDetail.images.length;
//       setCurrentImageIndex(newIndex);
//       setCurrentImage(productDetail.images[newIndex]);
//     }
//   };

//   const prevImage = () => {
//     if (productDetail) {
//       const newIndex = (currentImageIndex - 1 + productDetail.images.length) % productDetail.images.length;
//       setCurrentImageIndex(newIndex);
//       setCurrentImage(productDetail.images[newIndex]);
//     }
//   };

//   const handleMouseMove = (e) => {
//     if (!isZoomed) return;
    
//     const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
//     const x = ((e.clientX - left) / width) * 100;
//     const y = ((e.clientY - top) / height) * 100;
    
//     setZoomPosition({ x, y });
//   };

//   const renderStars = (rating) => {
//     return [...Array(5)].map((_, index) => (
//       <Star
//         key={index}
//         className={`w-5 h-5 ${
//           index < Math.floor(rating) 
//             ? "text-yellow-400 fill-yellow-400" 
//             : index < rating 
//               ? "text-yellow-400 fill-yellow-400 opacity-50" 
//               : "text-gray-300"
//         }`}
//       />
//     ));
//   };

//   const formatDate = (dateString) => {
//     const options = { year: 'numeric', month: 'long', day: 'numeric' };
//     return new Date(dateString).toLocaleDateString(undefined, options);
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
//       <h1>productId = {productId}</h1>
//       <div className="max-w-7xl mx-auto px-4 py-8">
//         {productDetail && (
//           <div className="space-y-12">
//             {/* Breadcrumb
//             <nav className="flex text-sm text-gray-500">
//               <a href="#" className="hover:text-blue-600 transition-colors">Home</a>
//               <span className="mx-2">/</span>
//               <a href="#" className="hover:text-blue-600 transition-colors">Electronics</a>
//               <span className="mx-2">/</span>
//               <a href="#" className="hover:text-blue-600 transition-colors">Headphones</a>
//               <span className="mx-2">/</span>
//               <span className="text-gray-900 font-medium">{productDetail.name}</span>
//             </nav> */}

//             {/* Product Details */}
//             <div className="grid md:grid-cols-2 gap-8 bg-white rounded-2xl shadow-xl overflow-hidden">
//               {/* Product Images */}
//               <div className="p-8 space-y-4">
//                 <div 
//                   className="relative group overflow-hidden rounded-xl bg-gray-50 h-[400px] flex items-center justify-center"
//                   onMouseMove={handleMouseMove}
//                   onMouseEnter={() => setIsZoomed(true)}
//                   onMouseLeave={() => setIsZoomed(false)}
//                   style={{
//                     cursor: isZoomed ? 'zoom-out' : 'zoom-in'
//                   }}
//                 >
//                   <img
//                     src={currentImage}
//                     alt={productDetail.name}
//                     className={`max-h-full max-w-full object-contain transition-all duration-300 ${
//                       isZoomed ? 'scale-150' : 'scale-100'
//                     }`}
//                     style={
//                       isZoomed 
//                         ? { 
//                             transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`,
//                           }
//                         : {}
//                     }
//                   />
                  
//                   {/* Navigation arrows */}
//                   <button 
//                     onClick={(e) => { e.stopPropagation(); prevImage(); }} 
//                     className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
//                   >
//                     <ChevronLeft className="w-5 h-5" />
//                   </button>
//                   <button 
//                     onClick={(e) => { e.stopPropagation(); nextImage(); }} 
//                     className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
//                   >
//                     <ChevronRight className="w-5 h-5" />
//                   </button>
//                 </div>
                
//                 <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
//                   {productDetail.images && productDetail.images.map((image, index) => (
//                     <div 
//                       key={index}
//                       onClick={() => handleImageClick(image, index)}
//                       className={`cursor-pointer transition-all duration-200 flex-shrink-0 ${
//                         currentImage === image 
//                           ? 'border-2 border-blue-500 shadow-md scale-105' 
//                           : 'border border-gray-200 hover:border-blue-300'
//                       } rounded-md overflow-hidden`}
//                     >
//                       <img
//                         src={image}
//                         alt={`${productDetail.name} - view ${index + 1}`}
//                         className="w-[80px] h-[80px] object-contain"
//                       />
//                     </div>
//                   ))}
//                 </div>
//               </div>

//               {/* Product Info */}
//               <div className="p-8 space-y-6 flex flex-col">
//                 <div className="space-y-2">
//                   <div className="flex justify-between items-start">
//                     <p className="text-sm font-medium text-blue-600 uppercase tracking-wider">
//                       {productDetail.brand}
//                     </p>
//                     <div className="flex space-x-2">
//                       <button 
//                         onClick={() => setWishlist(!wishlist)} 
//                         className={`p-2 rounded-full transition-colors ${
//                           wishlist ? 'bg-red-50 text-red-500' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
//                         }`}
//                       >
//                         <Heart className={`w-5 h-5 ${wishlist ? 'fill-red-500' : ''}`} />
//                       </button>
//                       <button className="p-2 rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200 transition-colors">
//                         <Share2 className="w-5 h-5" />
//                       </button>
//                     </div>
//                   </div>
//                   <h1 className="text-3xl font-bold text-gray-900">{productDetail.name}</h1>
//                   <div className="flex items-center space-x-2">
//                     <div className="flex">{renderStars(productDetail.rating)}</div>
//                     <span className="text-gray-600">({productDetail.rating.toFixed(1)})</span>
//                     <span className="text-blue-600 hover:underline cursor-pointer">
//                       {productDetail.reviews.length} reviews
//                     </span>
//                   </div>
//                 </div>

//                 <p className="text-gray-600 leading-relaxed">{productDetail.description}</p>

//                 <div className="space-y-4 mt-auto">
//                   <div className="flex items-center space-x-2 text-sm text-gray-600">
//                     <div className={`w-3 h-3 rounded-full ${productDetail.stock > 0 ? 'bg-green-500' : 'bg-red-500'}`}></div>
//                     <span>{productDetail.stock > 0 ? `In Stock (${productDetail.stock} available)` : 'Out of Stock'}</span>
//                   </div>
                  
//                   <div className="flex items-baseline space-x-4">
//                     <p className="text-3xl font-bold text-gray-900">₹{productDetail.netPrice.toLocaleString()}</p>
//                     <p className="text-lg text-gray-500 line-through">₹{productDetail.price.toLocaleString()}</p>
//                     <p className="text-green-600 font-medium px-2 py-1 bg-green-50 rounded-md">
//                       {productDetail.discount}% OFF
//                     </p>
//                   </div>
                  
//                   <div className="flex items-center space-x-4">
//                     <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
//                       <button 
//                         onClick={() => setQuantity(Math.max(1, quantity - 1))}
//                         className="px-3 py-2 bg-gray-100 hover:bg-gray-200 transition-colors"
//                       >
//                         -
//                       </button>
//                       <input 
//                         type="number" 
//                         min="1" 
//                         max={productDetail.stock}
//                         value={quantity}
//                         onChange={(e) => setQuantity(Math.min(productDetail.stock, Math.max(1, parseInt(e.target.value) || 1)))}
//                         className="w-12 text-center border-0 focus:ring-0"
//                       />
//                       <button 
//                         onClick={() => setQuantity(Math.min(productDetail.stock, quantity + 1))}
//                         className="px-3 py-2 bg-gray-100 hover:bg-gray-200 transition-colors"
//                       >
//                         +
//                       </button>
//                     </div>
//                     <p className="text-sm text-gray-500">
//                       Total: <span className="font-semibold text-gray-900">₹{(productDetail.netPrice * quantity).toLocaleString()}</span>
//                     </p>
//                   </div>

//                   <div className="flex space-x-4 pt-4">
//                     <button className="flex-1 bg-gradient-to-r from-yellow-400 to-yellow-500 text-black py-3 px-6 rounded-lg font-bold hover:from-yellow-500 hover:to-yellow-600 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5 flex items-center justify-center space-x-2">
//                       <ShoppingCart className="w-5 h-5" />
//                       <span>Add to Cart</span>
//                     </button>
//                     {/* <button className="flex-1 bg-gradient-to-r from-gray-800 to-gray-900 text-white py-3 px-6 rounded-lg font-bold hover:from-gray-900 hover:to-black transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5 flex items-center justify-center space-x-2">
//                       <CreditCard className="w-5 h-5" />
//                       <span>Buy Now</span>
//                     </button> */}
//                   </div>
//                 </div>

//                 <div className="grid grid-cols-3 gap-4 pt-6 border-t border-gray-100">
//                   <div className="flex items-center space-x-3 text-sm">
//                     <Truck className="w-5 h-5 text-blue-500" />
//                     <span>Free Shipping</span>
//                   </div>
//                   <div className="flex items-center space-x-3 text-sm">
//                     <Shield className="w-5 h-5 text-blue-500" />
//                     <span>2 Year Warranty</span>
//                   </div>
//                   <div className="flex items-center space-x-3 text-sm">
//                     <RotateCcw className="w-5 h-5 text-blue-500" />
//                     <span>30-Day Returns</span>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Product Details Tabs */}
//             <div className="bg-white rounded-xl shadow-md overflow-hidden">
//               <div className="border-b border-gray-200">
//                 <div className="flex space-x-8 px-8">
//                   {['description', 'specifications', 'reviews'].map((tab) => (
//                     <button
//                       key={tab}
//                       onClick={() => setActiveTab(tab)}
//                       className={`py-4 px-2 font-medium text-sm transition-colors relative ${
//                         activeTab === tab 
//                           ? 'text-blue-600' 
//                           : 'text-gray-500 hover:text-gray-900'
//                       }`}
//                     >
//                       {tab.charAt(0).toUpperCase() + tab.slice(1)}
//                       {activeTab === tab && (
//                         <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600"></span>
//                       )}
//                     </button>
//                   ))}
//                 </div>
//               </div>
              
//               <div className="p-8">
//                 {activeTab === 'description' && (
//                   <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: productDetail.longDescription }}></div>
//                 )}
                
//                 {activeTab === 'specifications' && (
//                   <div className="grid md:grid-cols-2 gap-6">
//                     {productDetail.specifications.map((spec, index) => (
//                       <div key={index} className="flex justify-between border-b border-gray-100 pb-2">
//                         <span className="font-medium text-gray-700">{spec.name}</span>
//                         <span className="text-gray-600">{spec.value}</span>
//                       </div>
//                     ))}
//                   </div>
//                 )}
                
//                 {activeTab === 'reviews' && (
//                   <div className="space-y-8">
//                     <div className="flex items-center space-x-4 mb-8">
//                       <div className="flex flex-col items-center p-4 bg-gray-50 rounded-lg">
//                         <span className="text-5xl font-bold text-gray-900">{productDetail.rating.toFixed(1)}</span>
//                         <div className="flex my-2">{renderStars(productDetail.rating)}</div>
//                         <span className="text-sm text-gray-500">{productDetail.reviews.length} reviews</span>
//                       </div>
                      
//                       <div className="flex-1">
//                         {[5, 4, 3, 2, 1].map((star) => {
//                           const count = productDetail.reviews.filter(r => Math.floor(r.rating) === star).length;
//                           const percentage = (count / productDetail.reviews.length) * 100;
                          
//                           return (
//                             <div key={star} className="flex items-center space-x-2 mb-1">
//                               <span className="text-sm text-gray-600 w-4">{star}</span>
//                               <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
//                               <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
//                                 <div 
//                                   className="h-full bg-yellow-400 rounded-full"
//                                   style={{ width: `${percentage}%` }}
//                                 ></div>
//                               </div>
//                               <span className="text-sm text-gray-600 w-8">{percentage.toFixed(0)}%</span>
//                             </div>
//                           );
//                         })}
//                       </div>
//                     </div>

//                     <form onSubmit={handleSubmit} className="bg-gray-50 rounded-lg p-6 mb-8">
//                       <h3 className="text-lg font-bold mb-4">Write a Review</h3>
//                       <div className="grid md:grid-cols-2 gap-4">
//                         <div>
//                           <label className="block text-sm font-medium text-gray-700 mb-2">
//                             Your Rating
//                           </label>
//                           <div className="flex space-x-1 mb-2">
//                             {[1, 2, 3, 4, 5].map((star) => (
//                               <Star
//                                 key={star}
//                                 className={`w-6 h-6 cursor-pointer ${
//                                   star <= reviewData.rating 
//                                     ? "text-yellow-400 fill-yellow-400" 
//                                     : "text-gray-300"
//                                 }`}
//                                 onClick={() => setReviewData({ ...reviewData, rating: star })}
//                               />
//                             ))}
//                           </div>
//                           <input
//                             type="number"
//                             max={5}
//                             min={1}
//                             name="rating"
//                             value={reviewData.rating}
//                             onChange={handleChange}
//                             className="sr-only"
//                             required
//                           />
//                         </div>
//                         <div>
//                           <label className="block text-sm font-medium text-gray-700 mb-2">
//                             Your Review
//                           </label>
//                           <textarea
//                             name="comment"
//                             value={reviewData.comment}
//                             onChange={handleChange}
//                             rows={3}
//                             className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
//                             required
//                           ></textarea>
//                         </div>
//                       </div>
//                       <button className="mt-4 bg-blue-600 text-white py-2 px-6 rounded-lg font-medium hover:bg-blue-700 transition-colors">
//                         Submit Review
//                       </button>
//                     </form>

//                     <div className="space-y-6 overflow-y-auto max-h-[500px]"> 
//                       {productDetail.reviews.map((review, index) => (
//                         <div
//                           key={index}
//                           className="border-b border-gray-200 last:border-0 pb-6 last:pb-0"
//                         >
//                           <div className="flex justify-between mb-2">
//                             <div className="flex items-center space-x-2">
//                               <div className="flex">{renderStars(review.rating)}</div>
//                               <span className="text-gray-600">({review.rating})</span>
//                             </div>
//                             {review.date && (
//                               <span className="text-sm text-gray-500">{formatDate(review.date)}</span>
//                             )}
//                           </div>
//                           <p className="text-gray-700 mb-2">{review.comment}</p>
//                           <p className="text-sm font-medium text-gray-900">By {review.userId.name}</p>
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 )}
//               </div>
//             </div>

//             {/* Related Products */}
//             <div className="bg-white rounded-xl shadow-md p-8">
//               <h2 className="text-2xl font-bold mb-6">You Might Also Like</h2>
//               <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//                 {productDetail.relatedProducts.map((product) => (
//                   <div key={product.id} className="group border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
//                     <div className="aspect-square bg-gray-50 overflow-hidden">
//                       <img 
//                         src={product.image} 
//                         alt={product.name}
//                         className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
//                       />
//                     </div>
//                     <div className="p-4">
//                       <h3 className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors">{product.name}</h3>
//                       <div className="flex items-center space-x-1 my-1">
//                         {renderStars(product.rating)}
//                         <span className="text-sm text-gray-500">({product.rating})</span>
//                       </div>
//                       <div className="flex items-baseline space-x-2 mt-2">
//                         <p className="text-lg font-bold text-gray-900">₹{product.netPrice.toLocaleString()}</p>
//                         <p className="text-sm text-gray-500 line-through">₹{product.price.toLocaleString()}</p>
//                         <p className="text-xs text-green-600 font-medium">
//                           {product.discount}% OFF
//                         </p>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default Product;

import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Star, ShoppingCart, CreditCard, Heart, Share2, Truck, Shield, RotateCcw, ChevronRight, ChevronLeft } from 'lucide-react';
import { backendUrl } from '../../constant';

function Product() {
  const { productId } = useParams();
  const [productDetail, setProductDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [currentImage, setCurrentImage] = useState('');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [reviewData, setReviewData] = useState({ rating: 0, comment: "" });
  const [wishlist, setWishlist] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
  const [isZoomed, setIsZoomed] = useState(false);

  useEffect(() => {
    const fetchProductDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`${backendUrl}/api/v1/product/getProductDetail/${productId}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
        const apiProductData = result.data;
        
        // Transform API data to match the component's expected structure
        const transformedProduct = {
          id: apiProductData._id,
          name: apiProductData.name,
          brand: apiProductData.brand,
          description: apiProductData.description,
          // Use the short description and wrap it in a paragraph for the 'longDescription' field
          longDescription: `<p>${apiProductData.description}</p>`,
          // Create the specifications array from individual fields
          specifications: [
            { name: 'Brand', value: apiProductData.brand },
            { name: 'Category', value: apiProductData.category },
            { name: 'Sub-Category', value: apiProductData.subCategory },
            { name: 'Size', value: apiProductData.size || 'N/A' },
            { name: 'Badge', value: apiProductData.badge || 'N/A' },
          ],
          category: apiProductData.category,
          price: apiProductData.price,
          netPrice: apiProductData.netPrice,
          discount: apiProductData.discount,
          rating: apiProductData.rating,
          stock: apiProductData.stock,
          displayPicture: apiProductData.displayPicture,
          // Combine display picture and other images for the gallery
          images: [apiProductData.displayPicture, ...(apiProductData.images || [])],
          reviews: apiProductData.reviews.map(review => ({
            ...review,
            userId: review.userId || { name: 'Anonymous' }, // Ensure userId exists
            date: review.createdAt || review.date // Use createdAt if available
          })),
          // Default relatedProducts to an empty array as it's not in the API response
          relatedProducts: [],
        };

        setProductDetail(transformedProduct);
        setCurrentImage(transformedProduct.displayPicture);
        
      } catch (err) {
        console.error('Error fetching product details:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    
    if (productId) {
      fetchProductDetails();
    }
  }, [productId]);


  const handleChange = (e) => {
    setReviewData({ ...reviewData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Review submitted:', reviewData);
    if (productDetail) {
      const newReview = {
        rating: reviewData.rating,
        comment: reviewData.comment,
        userId: { name: 'You' }, // Placeholder for logged-in user
        date: new Date().toISOString()
      };
      setProductDetail({ ...productDetail, reviews: [newReview, ...productDetail.reviews] });
    }
    setReviewData({ rating: 0, comment: "" });
  };

  const handleImageClick = (image, index) => {
    setCurrentImage(image);
    setCurrentImageIndex(index);
  };

  const nextImage = () => {
    if (productDetail) {
      const newIndex = (currentImageIndex + 1) % productDetail.images.length;
      setCurrentImageIndex(newIndex);
      setCurrentImage(productDetail.images[newIndex]);
    }
  };

  const prevImage = () => {
    if (productDetail) {
      const newIndex = (currentImageIndex - 1 + productDetail.images.length) % productDetail.images.length;
      setCurrentImageIndex(newIndex);
      setCurrentImage(productDetail.images[newIndex]);
    }
  };

  const handleMouseMove = (e) => {
    if (!isZoomed) return;
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomPosition({ x, y });
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <Star
        key={index}
        className={`w-5 h-5 ${
          index < Math.floor(rating) ? "text-yellow-400 fill-yellow-400" 
          : index < rating ? "text-yellow-400 fill-yellow-400 opacity-50" 
          : "text-gray-300"
        }`}
      />
    ));
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Loading and Error States
  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (error) {
    return <div className="min-h-screen flex items-center justify-center text-red-500">Error: {error}</div>;
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {productDetail && (
          <div className="space-y-12">
            {/* Product Details */}
            <div className="grid md:grid-cols-2 gap-8 bg-white rounded-2xl shadow-xl overflow-hidden">
              {/* Product Images */}
              <div className="p-8 space-y-4">
                <div 
                  className="relative group overflow-hidden rounded-xl bg-gray-50 h-[400px] flex items-center justify-center"
                  onMouseMove={handleMouseMove}
                  onMouseEnter={() => setIsZoomed(true)}
                  onMouseLeave={() => setIsZoomed(false)}
                  style={{ cursor: isZoomed ? 'zoom-out' : 'zoom-in' }}
                >
                  <img
                    src={currentImage}
                    alt={productDetail.name}
                    className={`max-h-full max-w-full object-contain transition-all duration-300 ${isZoomed ? 'scale-150' : 'scale-100'}`}
                    style={isZoomed ? { transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%` } : {}}
                  />
                  <button 
                    onClick={(e) => { e.stopPropagation(); prevImage(); }} 
                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button 
                    onClick={(e) => { e.stopPropagation(); nextImage(); }} 
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
                
                <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide p-2">
                  {productDetail.images && productDetail.images.map((image, index) => (
                    <div 
                      key={index}
                      onClick={() => handleImageClick(image, index)}
                      className={`cursor-pointer transition-all duration-200 flex-shrink-0 ${
                        currentImage === image 
                          ? 'border-2 border-blue-500 shadow-md scale-105' 
                          : 'border border-gray-200 hover:border-blue-300'
                      } rounded-md overflow-hidden`}
                    >
                      <img
                        src={image}
                        alt={`${productDetail.name} - view ${index + 1}`}
                        className="w-[80px] h-[80px] object-contain"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Product Info */}
              <div className="p-8 space-y-6 flex flex-col">
                <div className="space-y-2">
                  <div className="flex justify-between items-start">
                    <p className="text-sm font-medium text-blue-600 uppercase tracking-wider">{productDetail.brand}</p>
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => setWishlist(!wishlist)} 
                        className={`p-2 rounded-full transition-colors ${
                          wishlist ? 'bg-red-50 text-red-500' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                        }`}
                      >
                        <Heart className={`w-5 h-5 ${wishlist ? 'fill-red-500' : ''}`} />
                      </button>
                      <button className="p-2 rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200 transition-colors">
                        <Share2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                  <h1 className="text-3xl font-bold text-gray-900">{productDetail.name}</h1>
                  <div className="flex items-center space-x-2">
                    <div className="flex">{renderStars(productDetail.rating)}</div>
                    <span className="text-gray-600">({productDetail.rating.toFixed(1)})</span>
                    <span className="text-blue-600 hover:underline cursor-pointer">
                      {productDetail.reviews.length} reviews
                    </span>
                  </div>
                </div>

                <p className="text-gray-600 leading-relaxed">{productDetail.description}</p>

                <div className="space-y-4 mt-auto">
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <div className={`w-3 h-3 rounded-full ${productDetail.stock > 0 ? 'bg-green-500' : 'bg-red-500'}`}></div>
                    <span>{productDetail.stock > 0 ? `In Stock (${productDetail.stock} available)` : 'Out of Stock'}</span>
                  </div>
                  
                  <div className="flex items-baseline space-x-4">
                    <p className="text-3xl font-bold text-gray-900">₹{productDetail.netPrice.toLocaleString()}</p>
                    <p className="text-lg text-gray-500 line-through">₹{productDetail.price.toLocaleString()}</p>
                    <p className="text-green-600 font-medium px-2 py-1 bg-green-50 rounded-md">
                      {productDetail.discount}% OFF
                    </p>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                      <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-3 py-2 bg-gray-100 hover:bg-gray-200 transition-colors">-</button>
                      <input 
                        type="number" min="1" max={productDetail.stock} value={quantity}
                        onChange={(e) => setQuantity(Math.min(productDetail.stock, Math.max(1, parseInt(e.target.value) || 1)))}
                        className="w-12 text-center border-0 focus:ring-0"
                        disabled={productDetail.stock === 0}
                      />
                      <button onClick={() => setQuantity(Math.min(productDetail.stock, quantity + 1))} className="px-3 py-2 bg-gray-100 hover:bg-gray-200 transition-colors" disabled={productDetail.stock === 0}>+</button>
                    </div>
                    <p className="text-sm text-gray-500">
                      Total: <span className="font-semibold text-gray-900">₹{(productDetail.netPrice * quantity).toLocaleString()}</span>
                    </p>
                  </div>

                  <div className="flex space-x-4 pt-4">
                    <button className="flex-1 bg-gradient-to-r from-yellow-400 to-yellow-500 text-black py-3 px-6 rounded-lg font-bold hover:from-yellow-500 hover:to-yellow-600 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5 flex items-center justify-center space-x-2" disabled={productDetail.stock === 0}>
                      <ShoppingCart className="w-5 h-5" />
                      <span>Add to Cart</span>
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 pt-6 border-t border-gray-100">
                  <div className="flex items-center space-x-3 text-sm"><Truck className="w-5 h-5 text-blue-500" /><span>Free Shipping</span></div>
                  <div className="flex items-center space-x-3 text-sm"><Shield className="w-5 h-5 text-blue-500" /><span>2 Year Warranty</span></div>
                  <div className="flex items-center space-x-3 text-sm"><RotateCcw className="w-5 h-5 text-blue-500" /><span>30-Day Returns</span></div>
                </div>
              </div>
            </div>

            {/* Product Details Tabs */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="border-b border-gray-200">
                <div className="flex space-x-8 px-8">
                  {['description', 'specifications', 'reviews'].map((tab) => (
                    <button
                      key={tab} onClick={() => setActiveTab(tab)}
                      className={`py-4 px-2 font-medium text-sm transition-colors relative ${activeTab === tab ? 'text-blue-600' : 'text-gray-500 hover:text-gray-900'}`}
                    >
                      {tab.charAt(0).toUpperCase() + tab.slice(1)}
                      {activeTab === tab && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600"></span>}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="p-8">
                {activeTab === 'description' && <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: productDetail.longDescription }}></div>}
                
                {activeTab === 'specifications' && (
                  <div className="grid md:grid-cols-2 gap-6">
                    {productDetail.specifications.map((spec, index) => (
                      <div key={index} className="flex justify-between border-b border-gray-100 pb-2">
                        <span className="font-medium text-gray-700">{spec.name}</span>
                        <span className="text-gray-600">{spec.value}</span>
                      </div>
                    ))}
                  </div>
                )}
                
                {activeTab === 'reviews' && (
                  <div className="space-y-8">
                    {/* Review summary and form can remain the same */}
                    <div className="space-y-6 overflow-y-auto max-h-[500px]"> 
                      {productDetail.reviews.map((review, index) => (
                        <div key={index} className="border-b border-gray-200 last:border-0 pb-6 last:pb-0">
                          <div className="flex justify-between mb-2">
                            <div className="flex items-center space-x-2">
                              <div className="flex">{renderStars(review.rating)}</div>
                              <span className="text-gray-600">({review.rating})</span>
                            </div>
                            {review.date && <span className="text-sm text-gray-500">{formatDate(review.date)}</span>}
                          </div>
                          <p className="text-gray-700 mb-2">{review.comment}</p>
                          <p className="text-sm font-medium text-gray-900">By {review.userId.name}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            {/* Related Products: Only show if there are any */}
            {productDetail.relatedProducts && productDetail.relatedProducts.length > 0 && (
              <div className="bg-white rounded-xl shadow-md p-8">
                <h2 className="text-2xl font-bold mb-6">You Might Also Like</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                  {productDetail.relatedProducts.map((product) => (
                    <div key={product.id} className="group border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                      {/* Related products rendering remains the same */}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Product;