import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
  {
    title: "Premium Sanitaryware Collection",
    description: "Transform your bathroom with luxury sanitaryware from top brands",
    price: "₹29,999",
    discount: "30% OFF",
    image: "/placeholder.png",
    bgColor: "from-blue-50 to-white",
    buttonColor: "bg-blue-600 hover:bg-blue-700",
  },
  {
    title: "Professional Power Tools",
    description: "Complete your toolkit with professional-grade power tools",
    price: "₹12,999",
    discount: "25% OFF",
    image: "/placeholder.png",
    bgColor: "from-orange-50 to-white",
    buttonColor: "bg-orange-600 hover:bg-orange-700",
  },
  {
    title: "Asian Paints Premium Collection",
    description: "Give your walls a perfect finish with premium quality paints",
    price: "₹6,999",
    discount: "20% OFF",
    image: "/placeholder.png",
    bgColor: "from-green-50 to-white",
    buttonColor: "bg-green-600 hover:bg-green-700",
  },
];

const HeroCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  return (
    <div className="relative h-[300px] sm:h-[400px] lg:h-[500px] w-full overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-transform duration-500 ease-in-out ${
            index === currentSlide ? "translate-x-0" : index < currentSlide ? "-translate-x-full" : "translate-x-full"
          }`}
        >
          <div className={`relative h-full bg-gradient-to-r ${slide.bgColor}`}>
            <div className="container mx-auto px-4 h-full flex items-center">
              <div className="w-full lg:w-1/2 z-10">
                <div className="inline-block px-4 py-1 bg-white/90 text-gray-800 rounded-full text-sm mb-4">
                  EXCLUSIVE OFFER {slide.discount}
                </div>
                <h1 className="text-2xl lg:text-4xl font-bold mb-4 text-gray-800">{slide.title}</h1>
                <p className="text-gray-600 mb-6 lg:mb-8">{slide.description}</p>
                <div className="mb-6 lg:mb-8">
                  <span className="text-gray-500">Starting from </span>
                  <span className="text-2xl lg:text-3xl font-bold text-gray-800">{slide.price}</span>
                </div>
                <button
                  className={`text-white px-6 lg:px-8 py-2 lg:py-3 rounded-lg transition-colors ${slide.buttonColor}`}
                >
                  Shop Now
                </button>
              </div>
              <div className="absolute right-0 top-0 w-full lg:w-1/2 h-full">
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="object-cover object-center opacity-90 w-full h-full"
                />
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Buttons */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 flex items-center justify-center shadow-lg hover:bg-white transition-colors"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6 text-gray-800" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 flex items-center justify-center shadow-lg hover:bg-white transition-colors"
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6 text-gray-800" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-2 h-2 rounded-full transition-colors ${
              index === currentSlide ? "bg-blue-600" : "bg-gray-400"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroCarousel;
