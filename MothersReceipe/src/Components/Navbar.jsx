import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
    return (
        <nav className="bg-orange-400 shadow-md p-4 flex flex-row-reverse justify-between rounded-lg md:px-12">
          <Link to='/add/receipe'>
          <button className="px-3 md:px-4 py-2 bg-white text-black rounded-lg hover:bg-black hover:text-white">
            + Add Recipe
          </button>
          </Link>
          <span className="text-[#1D1D1D] font-bold text-xl md:text-2xl ">Contact Us</span>
      </nav>
    )
  }

export default Navbar