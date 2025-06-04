import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";

const SignUp = () => {
  //Extracting the navigate function from useNavigate
  const nav = useNavigate();

  async function submitHandler(d) {
    console.log(d)
    axios
      .post("https://motherrecipe.runasp.net/api/User/AddUser", d)

      .then((res) => {
        alert(res.data);
        nav("/login")
      })
      .catch((err) => {
        alert(err.response.data);
      });
  }

  const { register, handleSubmit } = useForm();

  return (
    <div className="h-screen w-full bg-[url(stock.jpeg)] bg-no-repeat bg-cover flex items-center justify-center">
      <div
        className="h-[90%] w-[90%] md:w-[40%] relative md:right-[20%] z-10 rounded-lg p-8 md:p-10 backdrop-blur-md flex justify-center"
        style={{ background: "rgba(255, 255, 255, 0.3)" }} // White with 30% opacity
      >
        {/* Text Section */}
        <div className=" md:w-[80%] text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
            Join Us Today!
          </h1>
          <p className="text-gray-950 mt-2 text-lg">
            Create an account to access thousands of delicious recipes.
          </p>

          <form
            onSubmit={handleSubmit(submitHandler)}
            className="mt-3 space-y-4"
          >
            <input
              type="text"
              placeholder="Full Name"
              required
              {...register("userName")}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none"
            />
            <input
              type="email"
              placeholder="Email"
              required
              {...register("email")}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none"
            />
            <input
              type="password"
              placeholder="Password"
              required
              {...register("password")}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none"
            />

            <button
              type="submit"
              className="w-full bg-orange-500 text-white py-3 rounded-lg shadow-md hover:bg-orange-600 transition duration-300"
            >
              Register
            </button>
          </form>

          <p className="mt-4 text-gray-950">
            Already have an account?{" "}
            <Link to="/login" className="text-orange-500 font-bold">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
