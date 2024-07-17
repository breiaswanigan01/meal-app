// src/Components/SavedMeals.js

import React from "react";

const SavedMeals = ({ favorites, handleRecipeClick, toggleFavorite }) => {
  // Check if a recipe is in favorites
  const isFavorite = (recipe) => {
    return favorites.some((fav) => fav.uri === recipe.uri);
  };

  return (
    <div className="bg-gray-100 min-h-screen p-4">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold text-emerald-700 mb-8">Saved Meals</h1>
        {favorites.length === 0 ? (
          <p className="text-gray-700">No saved meals yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {favorites.map((recipe, index) => (
              <div
                key={index}
                className="border p-4 bg-emerald-300 rounded shadow cursor-pointer relative"
                onClick={() => handleRecipeClick(recipe)}
              >
                <h2 className="text-xl font-bold mb-2">{recipe.label}</h2>
                <img
                  src={recipe.image}
                  alt={recipe.label}
                  className="w-full h-40 object-cover mb-2"
                />
                <p className="mb-2 text-emer">
                  Calories: {Math.round(recipe.calories)}
                </p>
                <button
                  className={`absolute top-2 right-2 p-1 rounded-full ${
                    isFavorite(recipe)
                      ? "text-red-500 "
                      : "text-red-500"
                  }`}
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite(recipe);
                  }}
                >
                  {isFavorite(recipe) ? "♥" : "♡"}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SavedMeals;
