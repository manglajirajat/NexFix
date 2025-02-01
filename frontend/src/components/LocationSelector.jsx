import { useState } from "react";
import { MapPin, Search } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Input } from "./ui/input";

const popularCities = ["Mumbai", "Delhi", "Bangalore", "Hyderabad", "Chennai", "Kolkata", "Pune", "Ahmedabad"];

export function LocationSelector() {
  const [location, setLocation] = useState("Select Location");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCities = popularCities.filter((city) =>
    city.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleLocationSelect = (city) => {
    setLocation(city);
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
    <Dialog>
      <DialogTrigger className="flex items-center gap-2 text-sm hover:text-blue-600">
        <MapPin className="w-4 h-4" />
        <span className="max-w-[150px] truncate">{location}</span>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Choose your location</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="flex items-center gap-2">
            <button
              onClick={handleGetCurrentLocation}
              className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800"
            >
              <MapPin className="w-4 h-4" />
              Use current location
            </button>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search for your location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="space-y-4">
            <h4 className="text-sm font-medium">Popular Cities</h4>
            <div className="grid grid-cols-2 gap-2">
              {filteredCities.map((city) => (
                <button
                  key={city}
                  onClick={() => handleLocationSelect(city)}
                  className="flex items-center gap-2 rounded-md border p-2 text-sm hover:bg-muted"
                >
                  <MapPin className="h-4 w-4" />
                  {city}
                </button>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}