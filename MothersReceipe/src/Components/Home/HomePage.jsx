import React from "react";
import Navigation from "../Navigation";
import { Outlet, useNavigate } from "react-router-dom";
import HomeContent from "./HomeContent";

const HomePage = ({children}) => {

  

  return (
    <>
      <Navigation />
        {children ? <Outlet/>:<HomeContent/>}
      <Outlet />
    </>
  );
};

export default HomePage;
