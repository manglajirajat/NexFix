import { Link } from "react-router-dom";

const brands = [
  {
    name: "Asian Paints",
    logo: "/placeholder.svg?text=Asian+Paints&height=60&width=120",
    actualPath: "/images/brands/asian-paints-logo.png",
    link: "/brands/asian-paints",
  },
  {
    name: "Bosch",
    logo: "/placeholder.svg?text=Bosch&height=60&width=120",
    actualPath: "/images/brands/bosch-logo.png",
    link: "/brands/bosch",
  },
  {
    name: "Hindware",
    logo: "/placeholder.svg?text=Hindware&height=60&width=120",
    actualPath: "/images/brands/hindware-logo.png",
    link: "/brands/hindware",
  },
  {
    name: "Havells",
    logo: "/placeholder.svg?text=Havells&height=60&width=120",
    actualPath: "/images/brands/havells-logo.png",
    link: "/brands/havells",
  },
  {
    name: "Kajaria",
    logo: "/placeholder.svg?text=Kajaria&height=60&width=120",
    actualPath: "/images/brands/kajaria-logo.png",
    link: "/brands/kajaria",
  },
  {
    name: "Pidilite",
    logo: "/placeholder.svg?text=Pidilite&height=60&width=120",
    actualPath: "/images/brands/pidilite-logo.png",
    link: "/brands/pidilite",
  },
  {
    name: "Astral",
    logo: "/placeholder.svg?text=Astral&height=60&width=120",
    actualPath: "/images/brands/astral-logo.png",
    link: "/brands/astral",
  },
  {
    name: "Supreme",
    logo: "/placeholder.svg?text=Supreme&height=60&width=120",
    actualPath: "/images/brands/supreme-logo.png",
    link: "/brands/supreme",
  },
  {
    name: "Philips",
    logo: "/placeholder.svg?text=Philips&height=60&width=120",
    actualPath: "/images/brands/philips-logo.png",
    link: "/brands/philips",
  },
  {
    name: "Cera",
    logo: "/placeholder.svg?text=Cera&height=60&width=120",
    actualPath: "/images/brands/cera-logo.png",
    link: "/brands/cera",
  },
  {
    name: "Jaguar",
    logo: "/placeholder.svg?text=Jaguar&height=60&width=120",
    actualPath: "/images/brands/jaguar-logo.png",
    link: "/brands/jaguar",
  },
  {
    name: "Stanley",
    logo: "/placeholder.svg?text=Stanley&height=60&width=120",
    actualPath: "/images/brands/stanley-logo.png",
    link: "/brands/stanley",
  },
];

export function BrandShowcase() {
  return (
    <section className="container mx-auto px-4 py-12">
      <div className="text-center mb-10">
        <h2 className="text-2xl lg:text-3xl font-bold mb-4">Our Trusted Brands</h2>
        <p className="text-gray-600">Shop from India's most trusted hardware and home improvement brands</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
        {brands.map((brand) => (
          <Link
            key={brand.name}
            to={brand.link}
            className="group relative bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 p-4 flex items-center justify-center"
          >
            <div className="relative w-full h-12">
              <img
                src={brand.logo || "/placeholder.svg"} // Replace with brand.actualPath in production
                alt={`${brand.name} logo`}
                className="object-contain filter group-hover:brightness-110 transition-all duration-300"
              />
            </div>
            <div className="absolute inset-0 bg-blue-600/0 group-hover:bg-blue-600/5 transition-colors duration-300 rounded-lg" />
          </Link>
        ))}
      </div>

      <div className="text-center mt-8">
        <Link
          to="/brands"
          className="inline-flex items-center text-blue-600 hover:text-blue-700 font-semibold"
        >
          View All Brands
          <svg
            className="w-4 h-4 ml-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </section>
  );
}
