import React, { useState, useEffect } from "react";

export default function AnnouncementBar() {
  const announcements = [
    "🎉 Mega Sale! Up to 50% off on Power Tools 🛠️",
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
  }, [announcements.length]);

  return (
    <div className="bg-[#1e3a8a] text-white py-2 overflow-hidden">
      <div className="relative h-6 flex justify-center items-center">
        {announcements.map((text, index) => (
          <div
            key={index}
            className="absolute w-full text-center transition-transform duration-500 ease-in-out"
            style={{
              transform: `translateY(${(index - currentIndex) * 100}%)`,
              opacity: index === currentIndex ? 1 : 0,
            }}
          >
            <span className="text-sm font-medium">{text}</span>
          </div>
        ))}
      </div>
    </div>
  );
}