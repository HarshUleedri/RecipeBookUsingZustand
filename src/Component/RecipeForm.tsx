import React, { useState } from "react";
import { useRecipe } from "../store/useRecipe";
import { RecipesType } from "../store/useRecipe";

const RecipeForm = () => {
  const { addRecipe, removeRecipe, recipes } = useRecipe();

  const [recipe, setRecipe] = useState({
    name: "",
    ingridient: "",
    instruction: "",
  });

  const [isEditing, setIsEditing] = useState<RecipesType | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRecipe({
      ...recipe,
      [name]: value,
    });
  };
  const handleAddRecipe = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      recipe.name.trim() === "" ||
      recipe.ingridient.trim() === "" ||
      recipe.instruction.trim() === ""
    )
      return;
    addRecipe({
      id: Date.now(),
      name: recipe.name,
      ingridients: recipe.ingridient
        .trim()
        .split(", ")
        .map((ingridient) => ingridient.trim()),
      instructions: recipe.instruction,
    });
    setRecipe({
      name: "",
      ingridient: "",
      instruction: "",
    });
  };

  const handleEdit = (recipe: RecipesType) => {
    setRecipe({
      name: recipe.name,
      ingridient: recipe.ingridients.join(","),
      instruction: recipe.instructions,
    });
    console.log(recipe);
    setIsEditing(recipe);
  };

  const handleUpdate = () => {
    if (isEditing) {
      console.log(isEditing);
      const { id } = isEditing;
      const { name, ingridient, instruction } = recipe;
      removeRecipe(id);
      addRecipe({
        id,
        name,
        ingridients: ingridient
          .trim()
          .split(", ")
          .map((ingridient) => ingridient.trim()),
        instructions: instruction,
      });
      setRecipe({
        name: "",
        ingridient: "",
        instruction: "",
      });

      setIsEditing(null);
    }
  };

  const handleCancel = () => {
    setIsEditing(null);
    setRecipe({
      name: "",
      ingridient: "",
      instruction: "",
    });
  };

  return (
    <div className="flex items-start gap-4 ">
      <form
        className="bg-white w-1/2 px-8 py-4 rounded mb-6"
        onSubmit={handleAddRecipe}
      >
        <div className="flex  flex-col gap-4 mb-6">
          <label className="flex flex-col gap-2" htmlFor="name">
            Name of Recipe
            <input
              className="outline-none ring-1 rounded ring-gray-300 focus:ring-1 focus:ring-green-500 px-4 py-1"
              type="text"
              value={recipe.name}
              onChange={handleChange}
              name="name"
            />
          </label>
          <label className="flex flex-col gap-2" htmlFor="ingridient">
            Ingridient:
            <input
              className="outline-none rounded ring-1 ring-gray-300 focus:ring-1 focus:ring-green-500 px-4 py-1"
              type="text"
              name="ingridient"
              onChange={handleChange}
              value={recipe.ingridient}
            />
          </label>
          <label className="flex flex-col gap-2" htmlFor="instruction">
            Instruction
            <input
              onChange={handleChange}
              className="outline-none ring-1 rounded ring-gray-300 focus:ring-1 focus:ring-green-500 px-4 py-1"
              type="text"
              name="instruction"
              value={recipe.instruction}
            />
          </label>
        </div>
        {isEditing ? (
          <div className="flex items-center justify-between">
            <button
              onClick={handleUpdate}
              className="bg-yellow-600 px-4 py-1 rounded text-white cursor-pointer"
            >
              Update
            </button>
            <button
              onClick={handleCancel}
              className="bg-gray-500 text-white rounded px-4 py-1 "
            >
              Cancel
            </button>
          </div>
        ) : (
          <>
            <button
              type="submit"
              className="px-2 text-green-50 py-1 rounded bg-green-500 cursor-pointer"
            >
              Add
            </button>
          </>
        )}
      </form>

      <div className=" w-1/2 overflow-y-auto space-y-4 px-4 h-[65vh]  ">
        {recipes.length === 0 && (
          <div className="text-3xl text-gray-500 bg-gray-50 px-6 text-center py-8">
            Please have some Recipes
          </div>
        )}
        {recipes.map((recipe, index) => (
          <div className="bg-white p-4 rounded" key={index}>
            <div className="space-y-2 border-b border-gray-300 p-4 mb-6">
              <div className="text-lg font-semibold break-words">
                {recipe.name}
              </div>
              <div className=" break-words">{recipe.ingridients}</div>
              <div className=" break-words">{recipe.instructions}</div>
            </div>
            <div className="flex items-center justify-between">
              <button
                onClick={() => handleEdit(recipe)}
                className="px-4 py-1 rounded bg-yellow-600 text-white cursor-pointer "
              >
                Edit
              </button>
              <button
                onClick={() => removeRecipe(recipe.id)}
                className="px-4 py-1 rounded bg-red-600 text-white cursor-pointer "
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecipeForm;
