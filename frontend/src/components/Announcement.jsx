import { useState, useEffect } from "react";

const Announcement = () => {
  const announcements = [
    "🎉 Mega Sale! Up to 50% off on Power Tools 🛠",
    "🎁 Free Delivery on orders above ₹999 📦",
    "⚡ Flash Sale! Extra 10% off on Asian Paints 🎨",
    "🔥 New Arrivals: Premium Hardware Collection 🏠",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % announcements.length);
    }, 4000); // Change message every 4 seconds

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-blue-800 text-white overflow-hidden">
      <div className="relative h-6">
        {announcements.map((text, index) => (
          <div
            key={index}
            className={`absolute w-full text-center transition-transform duration-500 ease-in-out ${
              index === currentIndex ? "opacity-100" : "opacity-0"
            }`}
            style={{
              transform: `translateY(${(index - currentIndex) * 100}%)`,
            }}
          >
            <span className="text-sm font-medium">{text}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Announcement;