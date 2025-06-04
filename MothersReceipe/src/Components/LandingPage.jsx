import React from "react";
import { RiBookmarkFill, RiSearchLine } from "@remixicon/react";
import { Link } from "react-router-dom";
import bgVideo from "../assets/LandingBgVideo.mp4";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-orange-100 flex flex-col font-sans">
      {/* Navbar */}
      <nav className="w-full bg-transparent p-4 flex justify-between items-center shadow-md fixed top-0 left-0 right-0 z-10">
        <div className="flex items-center space-x-2">
          <span className="text-2xl font-bold text-white">Mother Recipe</span>
        </div>
        
      </nav>

      {/* Hero Section */}
      <header className="w-full h-screen bg-cover bg-center flex flex-col justify-center items-center text-white text-center px-6 overflow-hidden">
        <div className="h-screen w-screen absolute overflow-hidden">
          <video src={bgVideo} autoPlay loop className=" h-full w-screen overflow-hidden object-cover top-0 left-0" />
        </div>

        <div className="relative z-10">
          <h1 className="text-5xl font-bold bg-opacity-75 rounded-lg">
            Discover and Share Tasty Recipes
          </h1>
          <p className="text-lg  bg-opacity-75 p-2 rounded">
            Explore a world of flavors and create your own culinary
            masterpieces.
          </p>
          <Link to="/signup" className="mt-8 bg-orange-400 inline-block p-3 px-6 rounded-full text-lg font-semibold hover:bg-orange-500">
            Get Started
          </Link>
        </div>
      </header>

      {/* Features Section */}
      <section className="w-full max-w-6xl mx-auto py-12 px-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        {["Easy Recipes", "Healthy Options", "Quick Meals"].map(
          (feature, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-md text-center"
            >
              <h2 className="text-2xl font-semibold mb-2 text-orange-600">
                {feature}
              </h2>
              <p className="text-gray-600">
                Find a variety of {feature.toLowerCase()} for every taste.
              </p>
            </div>
          )
        )}
      </section>

      {/* Call to Action */}
      <section className="w-full bg-orange-300 text-center py-8 px-4">
        <h2 className="text-2xl font-semibold text-orange-900">
          Join Our Community
        </h2>
        <p className="text-orange-800">
          Subscribe to get the latest recipes delivered to your inbox.
        </p>
        <input
          type="email"
          placeholder="Enter your email"
          className="mt-4 p-2 rounded border border-orange-500 w-1/2"
        />
        <button className="ml-2 bg-orange-500 p-2 rounded text-white hover:bg-orange-600">
          Subscribe
        </button>
      </section>

      {/* Footer */}
      <footer className="w-full bg-orange-700 text-white text-center p-4 mt-8">
        <p>&copy; 2025 Mother Recipe. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage;
