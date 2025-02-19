import React from "react";
import RecipeForm from "./Component/RecipeForm";

const App = () => {
  return (
    <div className="flex h-screen items-start justify-center bg-green-100">
      <div className="flex flex-col px-20 py-20 w-full   ">
        <h1 className="text-3xl text-center mb-12 font-semibold text-green-600">
          Recipe Book
        </h1>
        <RecipeForm />
      </div>
    </div>
  );
};

export default App;
