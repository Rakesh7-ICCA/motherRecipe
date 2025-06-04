import React from "react";

export default function RecipeCard({receipe}) {
  return (
    <div className="bg-yellow-200 rounded-3xl p-6 flex flex-col sm:flex-row justify-between items-center shadow-md max-w-4xl mx-auto">
      <div className="flex items-center gap-4 w-full sm:w-auto">
        <div className="w-32 h-32 sm:w-40 sm:h-40 bg-blue-300 rounded-full border border-black"></div>
        <div className="flex flex-col justify-center">
          <h2 className="text-3xl font-semibold text-center sm:text-left">Palao</h2>
          <hr className="border-t-3 border-black my-2 w-full" />
          <p className="text-lg leading-tight">
            Description Description Description<br />
            Description Description
          </p>
        </div>
      </div>

      <div className="border-l border-black h-28 mx-4 hidden sm:block"></div>

      <div className="flex flex-col items-center mt-4 sm:mt-0">
        <div className="w-24 h-24 bg-red-200 rounded-full border-4 border-orange-500 flex items-center justify-center relative">
          <div className="absolute w-1 h-8 bg-orange-600 top-4"></div>
          <div className="absolute w-1 h-6 bg-orange-600 transform rotate-45 top-6 right-6"></div>
        </div>
        <p className="mt-2 text-lg">13 mins</p>
      </div>
    </div>
  );
}
