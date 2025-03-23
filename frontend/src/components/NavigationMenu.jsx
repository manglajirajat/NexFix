import { useEffect, useState } from "react";
import { ChevronDown, ChevronRight, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import { backendUrl } from "../constant.js";

const navigationItems = {
  Hardware: {
    categories: [
      { name: "Door Hardware", items: ["Handels", "Door Stoper"] },
      { name: "Hand Tools", items: ["Karni", "Retti", "Showel", "Hammer"] },
      { name: "Safety & Security", items: ["Door Lock", "Electronic Lock", "Locks"] },
      { name: "Electrical Supplies", items: ["Wires", "Pipes", "Switch"] },
      { name: "Fasteners", items: ["Screws", "Nails", "Nut & Bolts"] },
    ],
  },
  Paint: {
    categories: [
      { name: "Interior Paints", items: ["Royale", "Pixa"] },
      { name: "Exterior Paints", items: ["Ace", "Apex Ultima"] },
      { name: "Distemper", items: ["Tractor UNO", "Berger"] },
      { name: "Paint Tools", items: ["Brush", "Rolller", "Santensils"] },
      { name: "Enamels", items: ["Asian", "Nerolac", "JSW"] },
      { name: "Primer", items: ["Wood Primer", "Metal Primer"] },
    ],
  },
  Sanitary: {
    categories: [
      { name: "Bathroom Fixtures", items: [" "] },
      { name: "Toilets & Bidets", items: [" "] },
      { name: "Bathroom Accessories", items: [" "] },
      { name: "Plumbing", items: [" "] },
      { name: "Solvent", items: [" "] },
    ],
  },
  "Power tools": {
    categories: [
      { name: "Drilling Tools", items: [" "] },
      { name: "Cutting Tools", items: [" "] },
      { name: "Grinding Tools", items: [" "] },
      { name: "Cordless Tools", items: [" "] },
    ],
  },
  "BUYING GUIDE": {
    categories: [
      { name: "Tool Selection Guides", items: [" "] },
      { name: "Paint Selection", items: [" "] },
      { name: "Installation Guides", items: [" "] },
      { name: "Maintenance Tips", items: [" "] },
    ],
  },
  CONTACT: {
    categories: [
      {
        name: "Customer Support",
        items: [" "],
      },
      {
        name: "Business Enquiries",
        items: [" "],
      },
      {
        name: "Technical Support",
        items: [" "],
      },
      {
        name: "Locations",
        items: [" "],
      },
    ],
  },
};

export default function NavigationMenu() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [expandedCategories, setExpandedCategories] = useState([]);
  const [expandedSubcategories, setExpandedSubcategories] = useState([]);
  const [userType, setUserType] = useState(null);

  const checkAuthStatus = async () => {
    const token = localStorage.getItem("accessToken");
    if (!token) return;

    try {
      const response = await fetch(`${backendUrl}/api/v1/user/me`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error("Invalid token");

      const result = await response.json();
      setUserType(result.data.userType);
    } catch (error) {
      console.log("User not logged in:", error);
    }
  };

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const toggleCategory = (category) => {
    setExpandedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]
    );
  };

  const toggleSubcategory = (subcategory) => {
    setExpandedSubcategories((prev) =>
      prev.includes(subcategory) ? prev.filter((s) => s !== subcategory) : [...prev, subcategory]
    );
  };

  return (
    <nav className="bg-blue-600 text-white">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-14">
          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-white hover:text-blue-200 p-2"
            onClick={() => setMobileMenuOpen(true)}
          >
            <Menu className="h-6 w-6" />
          </button>

          {/* Mobile Menu Drawer */}
          {mobileMenuOpen && (
            <div className="fixed inset-0 z-50">
              {/* Background Overlay */}
              <div className="fixed inset-0 bg-black/60 
              onClick={() => setMobileMenuOpen(false)}"></div>



              {/* Drawer */}
              <div className="fixed left-0 top-0 h-full w-[300px] bg-white shadow-lg transform transition-transform duration-300 ease-in-out">
                <div className="p-4 border-b flex justify-between items-center">
                  <span className="text-lg font-bold text-blue-600">Menu</span>
                  <button
                    className="text-gray-600"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
                <div className="h-[calc(100vh-4rem)] overflow-y-auto p-4">
                  <a
                    href="/"
                    className="block text-lg font-bold text-blue-600 mb-4"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    HOME
                  </a>
                  {Object.entries(navigationItems).map(([category, { categories }]) => (
                    <div key={category} className="border-b pb-2">
                      <button
                        onClick={() => toggleCategory(category)}
                        className="flex items-center justify-between w-full text-left py-2 font-medium text-gray-800"
                      >
                        <span>{category}</span>
                        <ChevronRight className="w-4 h-4" />
                      </button>
                      {expandedCategories.includes(category) && (
                        <div className="pl-4 space-y-2">
                          {categories.map((section) => (
                            <div key={section.name}>
                              <button
                                onClick={() => toggleSubcategory(section.name)}
                                className="flex items-center justify-between w-full text-left py-2 text-blue-600"
                              >
                                <span className="text-sm">{section.name}</span>
                                <ChevronDown
                                  className={`w-4 h-4 transition-transform ${
                                    expandedSubcategories.includes(section.name) ? "rotate-180" : ""
                                  }`}
                                />
                              </button>
                              {expandedSubcategories.includes(section.name) && (
                                <ul className="pl-4 space-y-1">
                                  {section.items.map((item) => (
                                    <li key={item}>
                                      <a
                                        href={`/${category.toLowerCase()}/${section.name.toLowerCase().replace(/ /g, "-")}`}
                                        className="block py-1 text-sm text-gray-600 hover:text-blue-600"
                                        onClick={() => setMobileMenuOpen(false)}
                                      >
                                        {item}
                                      </a>
                                    </li>
                                  ))}
                                </ul>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            <a href="/" className="hover:text-blue-200">
              HOME
            </a>
            {Object.entries(navigationItems).map(([category, { categories }]) => {
              const categoryPath = `/${category.replace(/ /g, "-")}`;
              return (
                <div key={category} className="relative group">
                  <a href={categoryPath} className="flex items-center gap-1 hover:text-blue-200 py-3">
                    {category.toUpperCase()}
                    <ChevronDown className="w-4 h-4" />
                  </a>
                  <div className="absolute left-0 top-full z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 bg-white shadow-lg rounded-lg min-w-[280px] transform translate-y-2 group-hover:translate-y-0">
                    <div className="p-6">
                      {categories.map((section) => (
                        <div key={section.name} className="mb-6 last:mb-0">
                          <h3 className="text-blue-600 font-semibold mb-3">{section.name}</h3>
                          <ul className="space-y-2">
                            {section.items.map((item) => (
                              <li key={item}>
                                <a href={`${categoryPath}/${section.name.toLowerCase().replace(/ /g, "-")}`} className="text-gray-600 hover:text-blue-600 text-sm block py-1">
                                  {item}
                                </a>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Admin Link */}
          {userType === "admin" && (
            <div>
              <Link to="/addProduct" className="hover:text-blue-200">
                ADD PRODUCT
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}