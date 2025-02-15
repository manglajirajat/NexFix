import { Link } from "react-router-dom";

export function CategoriesGrid() {
  const categories = [
    {
      name: "Power Tools",
      image: "https://t3.ftcdn.net/jpg/11/13/08/34/240_F_1113083479_OpV92r66cOecalnoXQam9ZvYAFfY8jrC.jpg",
      count: "250+ Products",
    },
    {
      name: "Hand Tools",
      image: "https://as2.ftcdn.net/v2/jpg/08/97/30/39/1000_F_897303991_fIybrCasrMRLsrRhuQO5ZJbp8Sa9jWKl.jpg",
      count: "180+ Products",
    },
    {
      name: "Plumbing",
      image: "https://as2.ftcdn.net/v2/jpg/01/99/81/09/1000_F_199810981_ASJTsuwwKNLwArWdzLbHUe4YDUCJRKFS.jpg",
      count: "320+ Products",
    },
    {
      name: "Electrical",
      image: "https://as2.ftcdn.net/v2/jpg/04/96/15/85/1000_F_496158556_WyPKfcCbfbbhk5tjuFyQttrkkEB3LU1z.jpg",
      count: "400+ Products",
    },
    {
      name: "Paint & Supplies",
      image: "https://as1.ftcdn.net/v2/jpg/03/06/27/74/1000_F_306277429_PSsuYNxKtAeJbcnlCQ3PF0dgWSk0h0Bx.jpg",
      count: "150+ Products",
    },
    {
      name: "Bathroom & Sanitaryware",
      image: "https://as2.ftcdn.net/v2/jpg/11/97/56/31/1000_F_1197563112_imVC2ZvCghSTrSyEZBeXkVn6cdv5HGqG.jpg",
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
