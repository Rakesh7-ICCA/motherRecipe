import axios from 'axios';
import React,{ useState, useEffect } from 'react';
import { FiMenu, FiX, FiSearch, FiUser, FiShoppingCart, FiSave } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [savedPostsCount, setSavedPostsCount] = useState(0);
  // Handle scroll effect for header
  useEffect(() => {

    (async ()=>{
      const res = await axios.get('https://motherrecipe.runasp.net/api/Recipe/SavedPostsCount/'+localStorage.getItem('ID')); 
      if(res.data && res.status == 200)
      {
        setSavedPostsCount(res.data);
      }
    })()
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Navigation items
  const navItems = [
    { name: 'Home', href: '/home' },
    { name: 'Menu', href: 'menu' },
    { name: 'About', href: 'about' },
    { name: 'Contact', href: 'contact' },
  ];

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white dark:bg-gray-900 shadow-md py-2' : 'bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm py-4'}`}>
    <div className="container mx-auto px-4">
      {/* Main header content */}
      <div className="flex items-center justify-between">
        {/* Logo and mobile menu button */}
        <div className="flex items-center space-x-4">
          <button 
            className="lg:hidden text-gray-700 dark:text-gray-300 focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
          
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-bold text-orange-600 dark:text-orange-500">Mother's Recipe</span>
            <span className="ml-1 text-xs text-orange-400 dark:text-orange-300">™</span>
          </Link>
        </div>
  
        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-8">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className="text-gray-700 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-500 transition-colors font-medium"
            >
              {item.name}
            </Link>
          ))}
        </nav>
  
        {/* Search and user actions */}
        <div className="flex items-center space-x-4">
          {/* Search bar - hidden on mobile */}
          <div className="hidden md:flex relative">
            <input
              type="text"
              placeholder="Search..."
              className="w-48 px-4 py-2 rounded-full border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <FiSearch className="absolute right-3 top-2.5 text-gray-400 dark:text-gray-500" />
          </div>
          
          <div className="flex items-center space-x-3">
            <Link to={"savedPost"} className="p-2 text-gray-600 dark:text-gray-400 hover:text-orange-600 dark:hover:text-orange-500 relative">
              <FiSave size={20} />
              <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {savedPostsCount}
              </span>
            </Link> 
          
            <Link to="user-dashboard" className="p-2 text-gray-600 dark:text-gray-400 hover:text-orange-600 dark:hover:text-orange-500">
              <FiUser size={20} />
            </Link>
          </div>
        </div>
      </div>
  
      {/* Mobile Search - appears below on mobile */}
      <div className="mt-3 md:hidden">
        <div className="relative">
          <input
            type="text"
            placeholder="Search..."
            className="w-full px-4 py-2 rounded-full border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <FiSearch className="absolute right-3 top-2.5 text-gray-400 dark:text-gray-500" />
        </div>
      </div>
    </div>
  
    {/* Mobile Menu */}
    {isMenuOpen && (
      <div className="lg:hidden bg-white dark:bg-gray-800 shadow-lg">
        <div className="container mx-auto px-4 py-3">
          <nav className="flex flex-col space-y-3">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="py-2 px-3 text-gray-700 dark:text-gray-300 hover:bg-orange-50 dark:hover:bg-gray-700 hover:text-orange-600 dark:hover:text-orange-500 rounded-md transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </a>
            ))}
          </nav>
        </div>
      </div>
    )}
  </header>
  );
};

export default Navigation;