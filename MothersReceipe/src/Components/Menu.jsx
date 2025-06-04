import React from "react"
import Navbar from "./Navbar"
import RecipeCard from "./ReceipeBriefCard"

// Main Component
const Menu = () => {
  // Dummy Data
  const recipes = [
    { id: 1, name: "Paneer Butter Masala", category: "Vegetarian", image: "paneer.png" },
    { id: 2, name: "Chicken Curry", category: "Non-Vegetarian", image: "chicken.png" },
    { id: 3, name: "Chocolate Cake", category: "Dessert", image: "cake.png" },
    { id: 4, name: "Veg Biryani", category: "Vegetarian", image: "vegbiriyani.png" },
  ];

  return (
    <div className="min-h-screen bg-gray-600 p-4">

      <Navbar />

      {/* Search and Category Filter Component */}
      <div className="mt-6 flex flex-col sm:flex-row gap-4">
        <input
          type="text"
          placeholder="Search for recipes..."
          className="border border-[#D1D5DB] p-2 rounded-lg w-full sm:w-1/2 focus:ring-[#FF6700] text-white"
        />
        <select className="border border-[#D1D5DB] p-2 rounded-lg w-full sm:w-1/3 bg-white text-[#1D1D1D]">
          <option value="all">All Categories</option>
          <option value="vegetarian">Vegetarian</option>
          <option value="non-vegetarian">Non-Vegetarian</option>
          <option value="dessert">Dessert</option>
        </select>
     </div>

      {/* Recipe Cards Grid */}
      <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
        {recipes.map((recipe) => (
          <RecipeCard key={recipe.id} {...recipe} />
        ))}
      </div>
    </div>
  )
}

export default Menu;
