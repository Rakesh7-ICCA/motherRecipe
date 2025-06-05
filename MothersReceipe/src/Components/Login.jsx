import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";

const Login = ({aa}) => {
  const nav = useNavigate();
  async function submitHandler(d) {
    try{
      // const res = await axios.post("http://localhost:5236/api/User/getuser", d);
      const res = await axios.post("https://motherrecipe.runasp.net/api/User/getuser", d);
      if(res.status == 200 && res.data)
      {
        localStorage.setItem('ID', res.data.userId)
        localStorage.setItem('Login', true)
        localStorage.setItem('username', res.data.username)
        localStorage.setItem('profilePic', res.data.profilePic)

        aa(res.data.userId)
        alert(res.data.message);
        nav("/")
      }
      else
      {
        alert("Enter valid Credentials");
      }

    }
    catch(err)
    {
      alert("Check Console log")
      console.log(err)
    }
  }

  useEffect(()=>{
    const login = localStorage.getItem('Login')
    if(login == "true")
      nav("/home")
    
  },[])

  const { register, handleSubmit } = useForm();

  return (
    <div className="h-screen w-full bg-[#0a0a0a] flex md:flex-row-reverse md:justify-between items-center p-4">
      <div
        className="h-full lg:h-[70%] md:h-[80%] w-[100%] md:w-[50%] relative  md:my-7 z-10 rounded-lg p-7 md:p-10 backdrop-blur-md flex justify-center"
        style={{ background: "rgba(255, 255, 255, 0.3)" }} // White with 30% opacity
      >
        {/* Text Section */}
        <div className="md:w-[80%] text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
            Welcome Back!
          </h1>
          <p className="text-gray-950 mt-2 text-lg">
            Login to continue exploring amazing recipes.
          </p>

          <form onSubmit={handleSubmit(submitHandler)} className="mt-6 space-y-4">
            <input
              type="email"
              placeholder="Email"
              {...register("email")}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none"
            />
            <input
              type="password"
              placeholder="Password"
              {...register("password")}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none"
            />

            <button
              type="submit"
              className="w-full bg-orange-500 text-white py-3 rounded-lg shadow-md hover:bg-orange-600 transition duration-300"
            >
              Login
            </button>
          </form>

          <p className="mt-4 text-gray-950">
            Don't have an account?{" "}
            <Link to="/signup" className="text-orange-500 font-bold">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
      <div className="hidden md:inline ">
        <img src="login1.jpeg" alt="" className="w-[80%] h-[50%]" />
      </div>
    </div>
  );
};

export default Login;
