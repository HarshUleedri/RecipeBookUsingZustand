import React from "react";
import RecipeForm from "./Component/RecipeForm";

const App = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-green-100">
      <div className="flex flex-col lg:w-1/2 w-full  ">
        <h1 className="text-3xl text-center mb-6 w-full font-semibold text-green-600">
          Recipe Book
        </h1>
        <RecipeForm />
      </div>
    </div>
  );
};

export default App;
