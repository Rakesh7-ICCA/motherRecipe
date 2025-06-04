import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "../Home/HomePage";
import SignUp from "../SignUp";
import Login from "../Login";
import Menu from "../Menu";
import Dashboard from "../User/Dashboard";
import ProtectedRoute from "./ProtectedRoute";
import LandingPage from "../LandingPage";
import Editor from "../Editor";
import Explorer from "../Home/Explorer";
import RecipeDetailCard from "../Home/RecipeDetailCard";
import SavedPostsPage from "../Home/SavedPostsPage";

const Routing = () => {
  const [role, setrole] = useState('')
    useEffect(() => {
        const role1 = localStorage.getItem('ID')
        setrole(role1)
    }, [])
  return (
    <Router>
      <Routes>

        <Route path="/landing" element={<LandingPage />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="login" element={<Login aa = {setrole} />} />

        <Route path="/" element={<ProtectedRoute />}>
          
          {role &&
            <Route path="/" element={<HomePage />} >
              <Route index element={<Explorer />} />
              <Route path="user-dashboard" element={<Dashboard />} />
              <Route path="editor" element={<Editor />} />
              <Route path="detail/:recipeId" element={<RecipeDetailCard />} />
              <Route path="/savedPost" element={<SavedPostsPage/>}/>
            </Route>}

              <Route path="editor/:id/:rid" element={<Editor />} />

          <Route path="/menu" element={<Menu />} />
        </Route>
      </Routes>
    </Router >
  );
};

export default Routing;
