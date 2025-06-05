import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { FiClock, FiSave, FiPlus, FiUser, FiChevronDown } from "react-icons/fi";
import axios from "axios";
import ImageResize from 'quill-image-resize-module-react';
import { useParams } from "react-router-dom";

const RecipeEditor = () => {

  const { rid, id } = useParams();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [process, setProcess] = useState("")
  const [prepTime, setPrepTime] = useState(30);
  const [image, setImage] = useState(null);


  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedCategoryId, setSelectedCategoryId] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  ReactQuill.Quill.register('modules/imageResize', ImageResize);

  const fetchRecipe = async () => {

    const response = await axios.get(`https://motherrecipe.runasp.net/api/Recipe/GetRecipesbyRecipeId/${rid}`);
    const data = await response.data;
    setTitle(data.title);
    setDescription(data.description)
    setProcess(data.instruction)
    setPrepTime(data.time)
    setSelectedCategoryId(data.catagoryID)
    setSelectedCategory(data.catagoryName)

  };


  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('https://motherrecipe.runasp.net/api/Categories/AllCategories');
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };


    if (rid && id) {
      // debugger;
      fetchRecipe();
    }
    fetchCategories();
  }, []);



  //handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {}
    data.UserId = localStorage.getItem('ID')
    data.title = title;
    data.Description = description;
    data.instruction = process;
    data.time = prepTime;
    data.CategoryId = selectedCategoryId;
    data.RecipeImage="adsfasdf";

    console.log(data)

    try{
  
        if (rid && id) {
          (async () => {
            try {
  
              const res = await axios.put('https://motherrecipe.runasp.net/api/Recipe/UpdateRecipe/' + rid, data)
              alert(res.data.msg)
            }
            catch (err) {
              alert(err)
            }
          })()
  
          console.log(data)
  
        }
        else {
          (async () => {
            try {
              // const res = await axios.post('https://motherrecipe.runasp.net/api/Recipe/AddRecipe', data)
              const res = await axios.post('http://localhost:5236/api/Recipe/AddRecipe', data)
              if(res.status)
                {
                  if (setRecipeImage(res.data.rid))
                  {
                    alert(res.data.msg)
                 }
              }
            }
            catch (err) {
              alert(err)
            }
          })()
        }

    }
    catch(e)
    {
      alert(e)
    }
  };

  async function setRecipeImage(trid) {
    const fd = new FormData();
    fd.append('File', image);
    fd.append('fileName', title);
    const imageres = await axios.post('https://motherrecipe.runasp.net/api/Recipe/AddImageToRecipe/'+trid, fd, {
    // const imageres = await axios.post('http://localhost:5236/api/Recipe/AddImageToRecipe/'+trid, fd, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    })
    if (imageres.status == 200) {
      return true;
    }

    return false;

  }

  // React-Quill modules configuration
  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['link', 'image'],
      ['clean'],
    ],
    imageResize: {
      parchment: ReactQuill.Quill.import('parchment'),
      modules: ['Resize', 'DisplaySize']
    }
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "list",
    "bullet",
    "link",
    "image",
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8 dark:bg-gray-800">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
            Add New <span className="text-orange-600">Food</span> Recipe
          </h1>
          <button
            onClick={handleSubmit}
            className="flex items-center bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition"
          >
            <FiSave className="mr-2" />
            Post Recipe
          </button>
        </div>

        {/* Recipe Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-xl shadow-md p-6"
        >
          {/* Title Input */}
          <div className="mb-6">
            <label
              htmlFor="title"
              className="block text-gray-700 font-medium mb-2"
            >
              Recipe Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Cake, Rice, Sambar..etc"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              required
            />
          </div>

          {/* Description Input */}
          <div className="mb-6">
            <label
              htmlFor="title"
              className="block text-gray-700 font-medium mb-2"
            >
              Recipe Description
            </label>
            <input
              type="text"
              id="title"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="White chikkni Rice"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div>
              <label
                htmlFor="prepTime"
                className="flex items-center text-gray-700 font-medium mb-2"
              >
                <FiClock className="mr-2" /> Prep Time(in mins)
              </label>
              <input
                type="number"
                id="prepTime"
                value={prepTime}
                onChange={(e) => setPrepTime(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>

            {/* Time and Servings */}
          </div>


          {/* Category Dropdown */}
          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2">
              Category
            </label>
            <div className="relative">
              <button
                type="button"
                className="w-full flex justify-between items-center px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                {selectedCategory || "Select a category"}
                <FiChevronDown className={`transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {isDropdownOpen && (
                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-auto">
                  {categories.map((category) => (
                    <div
                      key={category.categoryId}
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => {
                        setSelectedCategory(category.name);
                        setSelectedCategoryId(category.categoryId)
                        setIsDropdownOpen(false);
                      }}
                    >
                      {category.name}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Recipe Editor */}
          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2">
              Tell a Effective process
            </label>
            <ReactQuill
              value={process}
              onChange={setProcess}
              modules={modules}
              formats={formats}
              placeholder="Write your recipe details here..."
              className="border border-gray-300 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-orange-500"
              theme="snow"
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2">
              Upload Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              required={!rid} // Require only during new recipe
            />
          </div>


          {/* Form Actions */}
          <div className="flex justify-end space-x-4 pt-4 border-t border-gray-200">
            <button
              type="button"
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex items-center bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition"
            >
              <FiSave className="mr-2" />
              Save Recipe
            </button>
          </div>
        </form>

        <div id="recipe">

        </div>
      </div>
    </div>
  );
};

export default RecipeEditor;
