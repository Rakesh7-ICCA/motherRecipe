import React, { useState } from "react";
import {
  FiClock,
  FiRefreshCw,
  FiMenu,
  FiX,
  FiSearch,
  FiHome,
  FiCompass,
  FiHeart,
  FiUser,
  FiMessageCircle,
} from "react-icons/fi";

const ReceipeBriefCard = ({
  id = 1,
  name = "Traditional Thali",
  description = "Authentic regional platter",
  time = "30 mins",
  category = "meal",
  image = null,
  commentsCount = 0,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("home");


  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");



  return (
    <div className="h-full">
      <div
        key={id}
        className="bg-white rounded-xl h-full flex flex-col shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
      >
        <div className="h-48 bg-orange-100 text-2xl uppercase font-semibold tracking-wider flex items-center justify-center overflow-hidden">
          {image ? <img src={image} alt="" /> : name}

        </div>
        <div className="p-4 relative flex-1 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-semibold text-lg text-gray-800">{name}</h3>
              <div className="flex items-center text-orange-600">
                <FiClock className="mr-1" />
                <span className="text-sm">{time}</span>
              </div>
            </div>
            <p className="text-gray-500 text-sm mb-4 line-clamp-3">{description}</p>
          </div>
          <div className="flex justify-between items-center relative ">

            <span className="text-xs bg-orange-100 text-orange-800 px-2 py-1 rounded">
              {category}
            </span>
            <div>
              <button className="text-orange-600 hover:text-orange-700 mx-5">
                <FiHeart /> {0}
              </button>
              <button className="text-orange-600 hover:text-orange-700">
                <p><FiMessageCircle />{commentsCount}</p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReceipeBriefCard;
