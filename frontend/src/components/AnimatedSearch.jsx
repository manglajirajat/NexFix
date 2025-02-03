import { useState, useEffect } from "react";
import { Search } from "lucide-react";

const searchSuggestions = [
  "Asian Paints Premium Emulsion",
  "Bosch Power Drill",
  "Cera Basin Mixer",
  "Hindware Water Closet",
  "Jaguar Shower Head",
  "Phillips Screwdriver Set",
  "Dulux Weather Shield",
  "Stanley Measuring Tape",
  "Grohe Bath Fittings",
  "Berger Easy Clean Paint",
];

const AnimatedSearch = () => {
  const [placeholderText, setPlaceholderText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(100);

  useEffect(() => {
    const suggestion = searchSuggestions[currentIndex];

    const type = () => {
      if (!isDeleting) {
        if (placeholderText.length < suggestion.length) {
          setPlaceholderText(suggestion.slice(0, placeholderText.length + 1));
          setTypingSpeed(100);
        } else {
          setTimeout(() => setIsDeleting(true), 2000);
          setTypingSpeed(50);
        }
      } else {
        if (placeholderText.length > 0) {
          setPlaceholderText(suggestion.slice(0, placeholderText.length - 1));
        } else {
          setIsDeleting(false);
          setCurrentIndex((prev) => (prev + 1) % searchSuggestions.length);
        }
      }
    };

    const timer = setTimeout(type, typingSpeed);
    return () => clearTimeout(timer);
  }, [placeholderText, currentIndex, isDeleting, typingSpeed]);

  return (
    <div className="relative w-full">
      <input
        type="text"
        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder={placeholderText || "Search for products..."}
      />
      <Search className="absolute right-3 top-2.5 text-gray-400" />
    </div>
  );
};

export default AnimatedSearch;
