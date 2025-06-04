import { FiBookmark, FiClock, FiUser, FiHeart } from "react-icons/fi";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const SavedPostsPage = () => {
  const [savedPosts, setSavedPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch saved posts from API
    const fetchSavedPosts = async () => {
      try {
        const response = await fetch('https://motherrecipe.runasp.net/api/Recipe/SavedPosts/'+localStorage.getItem('ID')); 
        const data = await response.json();
        setSavedPosts(data);
      } catch (error) {
        console.error("Error fetching saved posts:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchSavedPosts();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 flex items-center">
            <FiBookmark className="text-orange-500 mr-3" />
            Saved Recipes
            <span className="ml-3 bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm">
              {savedPosts.length} saved
            </span>
          </h1>
          <p className="text-gray-600 mt-2">Your collection of favorite recipes</p>
        </div>

        {/* Saved Posts Grid */}
        {savedPosts.length === 0 ? (
          <div className="text-center py-12">
            <div className="mx-auto w-24 h-24 bg-orange-100 rounded-full flex items-center justify-center mb-4">
              <FiBookmark className="text-orange-500 text-3xl" />
            </div>
            <h3 className="text-xl font-medium text-gray-700 mb-2">
              No saved recipes yet
            </h3>
            <p className="text-gray-500 mb-6">
              Save recipes to see them appear here
            </p>
            <Link
              to="/explore"
              className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg transition"
            >
              Explore Recipes
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {savedPosts.map((post) => (
              <div 
                key={post.recipeId} 
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 border
                   border-orange-500"
              >
                <div className="h-48 overflow-hidden">
                  {post.imageurl ? <img
                    src={post.imageUrl || '/placeholder-recipe.jpg'}
                    alt={post.title}
                    className="w-full h-full object-cover"
                  />:
                  <div className="h-48 bg-orange-100 text-2xl uppercase font-semibold tracking-wider flex items-center justify-center overflow-hidden">
                    {post.title}
                  </div>
                  }
                </div>
                
                <div className="p-5">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-semibold text-gray-800 line-clamp-1">
                      {post.title}
                    </h3>
                    <button className="text-orange-500">
                      <FiBookmark className="text-xl fill-current" />
                    </button>
                  </div>
                  
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                    {post.description}
                  </p>
                  
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center space-x-2">
                      <FiClock />
                      <span>{post.time} mins</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <FiUser />
                      <span>{post.author || 'Anonymous'}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
                    <div className="flex items-center space-x-1">
                      <FiHeart className="text-red-400" />
                      <span>{post.likes || 0}</span>
                    </div>
                    <Link
                      to={`/detail/${post.recipeId}`}
                      className="text-orange-500 hover:text-orange-600 text-sm font-medium"
                    >
                      View Recipe →
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SavedPostsPage;