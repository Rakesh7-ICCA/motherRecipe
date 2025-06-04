import React, { useEffect, useState } from "react";
import axios from "axios";
import ReceipeBriefCard from "../ReceipeBriefCard.jsx"
import { Link } from "react-router-dom";

const Explorer = () => {

  const [recipes, setRecipes] = useState([])
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    (async () => {
      const res = await axios.get("https://motherrecipe.runasp.net/api/Recipe/ExplorePage?userId="+localStorage.getItem('ID'))
      if (res.status == 200) {
        setRecipes(res.data)
      }
      setLoading(false);
    })()
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-xl font-medium animate-pulse">Loading recipes...</div>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold my-3">Explore Receipes</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recipes.map((recipe) => (
          <Link to={"detail/"+recipe.recipeId}>
            <ReceipeBriefCard commentsCount={recipe.commentCount} image={recipe.recipeImage} id={recipe.recipeId} category={recipe.catagoryName} name={recipe.title} description={recipe.description} time={recipe.time} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Explorer;
