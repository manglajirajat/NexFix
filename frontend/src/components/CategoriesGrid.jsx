import { Link } from "react-router-dom";

export function CategoriesGrid() {
  const categories = [
    {
      name: "Power Tools",
      image: "/placeholder.svg?text=Power+Tools&height=200&width=400",
      count: "250+ Products",
    },
    {
      name: "Hand Tools",
      image: "/placeholder.svg?text=Hand+Tools&height=200&width=400",
      count: "180+ Products",
    },
    {
      name: "Plumbing",
      image: "/placeholder.svg?text=Plumbing&height=200&width=400",
      count: "320+ Products",
    },
    {
      name: "Electrical",
      image: "/placeholder.svg?text=Electrical&height=200&width=400",
      count: "400+ Products",
    },
    {
      name: "Paint & Supplies",
      image: "/placeholder.svg?text=Paint&height=200&width=400",
      count: "150+ Products",
    },
    {
      name: "Bathroom & Sanitaryware",
      image: "/placeholder.svg?text=Bathroom&height=200&width=400",
      count: "280+ Products",
    },
  ];

  return (
    <section className="container mx-auto px-4 py-12">
      <h2 className="text-2xl lg:text-3xl font-bold mb-8">Shop by Category</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => (
          <Link key={category.name} to={`/category/${category.name.toLowerCase()}`}>
            <div className="relative h-48 group">
              <img
                src={category.image || "/placeholder.svg"}
                alt={category.name}
                className="object-cover rounded-lg brightness-75 group-hover:brightness-90 transition-all w-full h-full"
              />
              <div className="absolute inset-0 p-6 text-white flex flex-col justify-end">
                <h3 className="text-xl font-bold mb-1">{category.name}</h3>
                <p className="text-sm opacity-90">{category.count}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
