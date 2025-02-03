import { useState } from "react";
import { MapPin, Search } from "lucide-react";

const popularCities = ["Mumbai", "Delhi", "Bangalore", "Hyderabad", "Chennai", "Kolkata", "Pune", "Ahmedabad"];

const LocationSelector = () => {
  const [location, setLocation] = useState("Select Location");
  const [searchQuery, setSearchQuery] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const filteredCities = popularCities.filter((city) =>
    city.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleLocationSelect = (city) => {
    setLocation(city);
    setIsDialogOpen(false);
  };

  const handleGetCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const response = await fetch(
              `https://api.opencagedata.com/geocode/v1/json?q=${position.coords.latitude}+${position.coords.longitude}&key=YOUR_API_KEY`
            );
            const data = await response.json();
            if (data.results?.[0]?.components?.city) {
              setLocation(data.results[0].components.city);
              setIsDialogOpen(false);
            }
          } catch (error) {
            console.error("Error fetching location:", error);
          }
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    }
  };

  return (
    <div>
      {/* Location Trigger */}
      <button
        className="flex items-center gap-2 text-sm hover:text-blue-600"
        onClick={() => setIsDialogOpen(true)}
      >
        <MapPin className="w-4 h-4" />
        <span className="max-w-[150px] truncate">{location}</span>
      </button>

      {/* Custom Dialog */}
      {isDialogOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg w-96 shadow-lg">
            <h2 className="text-lg font-semibold mb-4">Choose your location</h2>

            <button
              onClick={handleGetCurrentLocation}
              className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800 mb-4"
            >
              <MapPin className="w-4 h-4" />
              Use current location
            </button>

            {/* Search Input */}
            <div className="relative mb-4">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search for your location..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 p-2 w-full border rounded-md focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Popular Cities */}
            <div>
              <h4 className="text-sm font-medium mb-2">Popular Cities</h4>
              <div className="grid grid-cols-2 gap-2">
                {filteredCities.map((city) => (
                  <button
                    key={city}
                    onClick={() => handleLocationSelect(city)}
                    className="flex items-center gap-2 rounded-md border p-2 text-sm hover:bg-gray-100 w-full"
                  >
                    <MapPin className="h-4 w-4" />
                    {city}
                  </button>
                ))}
              </div>
            </div>

            {/* Close Button */}
            <button
              onClick={() => setIsDialogOpen(false)}
              className="mt-4 w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 rounded-md"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LocationSelector;
