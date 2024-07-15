import React from "react";

const RecipeModal = ({ recipe, onClose }) => {
  if (!recipe) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-4 shadow-lg max-w-md w-full relative">
        <button className="absolute top-2 right-2 text-emerald-500" onClick={onClose}>
          &times;
        </button>
        <h2 className="text-xl font-bold mb-2">{recipe.label}</h2>
        <img
          src={recipe.image}
          alt={recipe.label}
          className="w-full h-64 object-cover mb-2"
        />
        <p className="mb-2">Calories: {Math.round(recipe.calories)}</p>
        <a
          href={recipe.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-emerald-500"
        >
          View Recipe
        </a>
      </div>
    </div>
  );
};

export default RecipeModal;
