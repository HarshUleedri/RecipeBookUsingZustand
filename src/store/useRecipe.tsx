import { create } from "zustand";

export interface RecipesType {
  id: number;
  name: string;
  ingridients: string[];
  instructions: string;
}

interface useRecipeType {
  recipes: RecipesType[];
  addRecipe: (recipe: RecipesType) => void;
  removeRecipe: (id: number) => void;
}

// export const useRecipe = create<useRecipeType>((set) => ({
//   recipes: [],
//   addRecipe: (recipe) =>
//     set((state) => ({ recipes: [...state.recipes, recipe] })),

//   removeRecipe: (id) =>
//     set((state) => ({
//       recipes: state.recipes.filter((recipe) => recipe.id !== id),
//     })),
// }));

export const useRecipe = create<useRecipeType>((set) => {
  const storedRecipe = localStorage.getItem("recipe");
  const intialRecipe = storedRecipe ? JSON.parse(storedRecipe) : [];

  return {
    recipes: intialRecipe,
    addRecipe: (recipe) =>
      set((state) => {
        const updatedRecipe = [...state.recipes, recipe];
        localStorage.setItem("recipe", JSON.stringify(updatedRecipe));
        return { recipes: updatedRecipe };
      }),
    removeRecipe: (id) =>
      set((state) => {
        const updatedrecipe = state.recipes.filter(
          (recipe) => recipe.id !== id
        );
        localStorage.setItem("recipe", JSON.stringify(updatedrecipe));
        return { recipes: updatedrecipe };
      }),
  };
});
