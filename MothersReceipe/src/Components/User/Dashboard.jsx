  import React, { useEffect, useState } from "react";
  import { FiBookmark, FiClock, FiUser, FiHeart, FiPlus } from "react-icons/fi";
  import { Link } from "react-router-dom";
  import ReceipeBriefcard from '../ReceipeBriefCard'
  import axios from "axios";


  const Dashboard = () => {


    const [recipes, setRecipes] = useState([])
    const [menuOpen, setMenuOpen] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [settingModal, setSettingModal] = useState(false);

    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState(null);


    const [user, setUser] = useState({})


    async function loadUserDetails() {
      const res = await axios.get("https://motherrecipe.runasp.net/api/User/GetUser/" + localStorage.getItem('ID'))

      if (res.status == 200) {
        setUser(res.data)
      }
    }

    useEffect(() => {
      (async () => {
        const res = await axios.get("https://motherrecipe.runasp.net/api/Recipe/GetRecipesbyUserId/" + localStorage.getItem('ID'))
        if (res.status == 200) {
          setRecipes(res.data)
        }
      })();

      loadUserDetails()
    }, [])


    function logout() {
      localStorage.clear();
      window.location.href = "/login";
    }

    function closeModal() {
      setShowModal(false)
    }

    const handleOptionClick = (option) => {
      setMenuOpen(false);
      if (option === "Show Profile") {
        setShowModal(true);
      }
      else if (option === "Change Profile") {
        document.getElementById("profile-pic-input").click();
      }
      else {
        alert(`${option} clicked`);
      }
    };

    const handleProfilePicChange = (event) => {
      const file = event.target.files[0];
      const fd = new FormData();
      fd.append("File", file);
      fd.append("fileName", localStorage.getItem('ID'));
      (async () => {

        try {
          const res = await axios.post("https://motherrecipe.runasp.net/api/User/profilePicture?UserId=" + localStorage.getItem('ID') + "&remove=false", fd, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          })
          if (res.status == 200) {
            alert("Profile Picture Changed")
            loadUserDetails()
          }

        }
        catch (err) {
          console.log(err)
        }

      })()

    };

    const handleSave = () => {
      // TODO: call API to update password

      if (newPassword !== confirmPassword) {
        setError("Passwords do not match");

      }
      else {

        const fd = new FormData();
        fd.append("newPassword", newPassword);
        fd.append("Password", currentPassword);
        (async () => {

          try {
            const res = await axios.post("https://motherrecipe.runasp.net/api/User/updatePassword?UserId=" + localStorage.getItem('ID'), fd, {
              headers: {
                'Content-Type': 'multipart/form-data'
              }
            })
            if (res.status == 200) {
              alert("Profile Picture Changed")
              setSettingModal(false);
            }
          }
          catch (err) {
            console.log(err)
            setError("Error updating password");
          }
        })()
      }

    };

    const toggleSave = (id) => {
      setRecipes(
        recipes.map((recipe) =>
          recipe.id === id ? { ...recipe, saved: !recipe.saved } : recipe
        )
      );
    };

    return (
      <>
        <div className="min-h-screen bg-gray-50 p-4 md:p-8 dark:bg-gray-800">

          <input
            type="file"
            id="profile-pic-input"
            className="hidden"
            accept="image/*"
            onChange={handleProfilePicChange}
          />

          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-1">Welcome to Your Dashboard</h1>
              <p className="text-gray-600 text-sm md:text-base">
                Manage your recipes and saved favorites seamlessly
              </p>
            </div>
            <Link
              to="/editor"
              className="inline-flex items-center gap-2 px-4 py-2 bg-orange-500 text-white text-sm font-medium rounded-xl hover:bg-orange-600 transition-colors"
            >
              <FiPlus className="text-lg" />
              Add Recipe
            </Link>

          </div>

          {/* Profile section */}
          <div className="max-w-md mx-auto p-4 sm:p-6 bg-white shadow-xl rounded-2xl my-6">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
              {/* Profile Picture */}

              <div
                className="relative flex-shrink-0 cursor-pointer"
                onClick={() => setMenuOpen(!menuOpen)}
              >

                <img
                  src={user.imageUrl}
                  alt="Profile"
                  className="w-24 h-24 rounded-full object-cover shadow-md"
                />


                {menuOpen && (
                  <div className="absolute top-28 left-1/2 sm:left-0 transform -translate-x-1/2 sm:translate-x-0 bg-white border border-gray-200 shadow-lg rounded-xl w-48 z-10">
                    <button
                      onClick={() => handleOptionClick("Show Profile")}
                      className="w-full text-left px-4 py-2 hover:bg-orange-100 text-gray-700"
                    >
                      Show Profile
                    </button>
                    <button
                      onClick={() => handleOptionClick("Change Profile")}
                      className="w-full text-left px-4 py-2 hover:bg-orange-100 text-gray-700"
                    >
                      Change Profile
                    </button>
                    <button
                      onClick={() => handleOptionClick("Remove Profile")}
                      className="w-full text-left px-4 py-2 hover:bg-orange-100 text-red-500"
                    >
                      Remove Profile
                    </button>
                  </div>
                )}
              </div>
              {/* User Details */}
              <div className="flex-1 text-center sm:text-left">
                <h2 className="text-xl font-semibold text-gray-800">{user.userName}</h2>
                <p className="text-gray-500 text-sm mt-1">{user.email}</p>

                <div className="mt-4 flex flex-col sm:flex-row gap-3 justify-center sm:justify-start">
                  <button onClick={() => setSettingModal(true)} className="px-4 py-2 bg-orange-500 text-white rounded-xl hover:bg-orange-600 transition">
                    Edit Settings
                  </button>
                  <button
                    onClick={logout}
                    className="px-4 py-2 bg-orange-100 text-orange-600 border border-orange-400 rounded-xl hover:bg-orange-200 transition">
                    Logout
                  </button>
                </div>
              </div>
            </div>
          </div>

          {showModal && (
            <div className="fixed inset-0 bg-[#00000054] backdrop-opacity-5 bg-opacity-60 flex items-center justify-center z-50">
              <div className="bg-white rounded-xl p-4 relative max-w-sm w-full">
                {/* Close Button */}
                <div className="flex justify-between items-center">
                  <p className="text-3xl lg:text-2xl my-4">Profile Pic</p>
                  <button
                    onClick={closeModal}
                    className=" text-gray-600 hover:text-red-500 text-5xl lg:text-3xl font-bold"
                  >
                    &times;
                  </button>

                </div>

                {/* Image */}
                <img
                  src={user.imageUrl}
                  alt="Full Profile"
                  className="w-full rounded-lg object-cover h-[80vh]"
                />
              </div>
            </div>
          )}

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-orange-500">
              <h3 className="text-gray-500 text-sm font-medium">My Recipes</h3>
              <p className="text-3xl font-bold text-gray-800">{recipes.length}</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-orange-500">
              <h3 className="text-gray-500 text-sm font-medium">Saved Recipes</h3>
              <p className="text-3xl font-bold text-gray-800">{recipes.length}</p>
            </div>

          </div>


          {/* Header Section */}
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
              My cooks <span className="text-orange-600">({recipes.length})</span>
            </h1>


          </div>

          {/* Recipe Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recipes.map((recipe) => (
              <Link to={"../editor/" + localStorage.getItem('ID') + "/" + recipe.recipeId}>
                <ReceipeBriefcard id={recipe.recipeId} category={recipe.catagoryName} name={recipe.title} description={recipe.description} time={recipe.time} image={recipe.recipeImage} />
              </Link>
            ))}
          </div>

          {/* Empty State */}
          {recipes.length === 0 && (
            <div className="text-center py-12">
              <div className="mx-auto w-24 h-24 bg-orange-100 rounded-full flex items-center justify-center mb-4">
                <FiPlus className="text-orange-600 text-3xl" />
              </div>
              <h3 className="text-xl font-medium text-gray-700 mb-2">
                No recipes yet
              </h3>
              <p className="text-gray-500 mb-6">
                Add your first recipe to get started
              </p>
              <Link to={"../editor"}
                className="bg-orange-600 text-white px-6 py-2 rounded-lg hover:bg-orange-700 transition">
                Add New Recipe
              </Link>
            </div>
          )}

          {settingModal && (<div className="fixed inset-0 bg-[#00000025] bg-opacity-40 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-sm relative">
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-2 right-2 text-gray-600 hover:text-black"
              >
                ✕
              </button>
              <h2 className="text-xl font-semibold mb-4 text-orange-600">Change Password</h2>
              {error && <p className="text-red-500 mb-4 bg-red-400 py-2 px-2 text-white text-xl rounded-md">{error}</p>}
              <input
                type="password"
                placeholder="Current Password"
                className="w-full mb-3 p-2 border rounded"
                onChange={(e) => setCurrentPassword(e.target.value)}
              />
              <input
                type="password"
                placeholder="New Password"
                className="w-full mb-3 p-2 border rounded"
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <input
                type="password"
                placeholder="Confirm New Password"
                className="w-full mb-4 p-2 border rounded"
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <button
                onClick={handleSave}
                className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded w-full"
              >
                Save Changes
              </button>
            </div>
          </div>
          )}
        </div>
      </>

    );
  };

  export default Dashboard;
