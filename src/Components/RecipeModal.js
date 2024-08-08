import React from "react";

const RecipeModal = ({ recipe, onClose }) => {
  if (!recipe) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
      <div
        className={`bg-emerald-300 p-8 rounded shadow-lg transform transition-transform`}
      >
        <button
          className="absolute top-2 right-2 text-gray-600"
          onClick={onClose}
        >
          &times;
        </button>
        <h2 className="text-2xl font-bold mb-4  ">{recipe.label}</h2>
        <img
          src={recipe.image}
          alt={recipe.label}
          className="w-full h-40 object-contain mb-4"
        />
        <p className="mb-4">Calories: {Math.round(recipe.calories)}</p>
        <a
          href={recipe.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-emerald-800"
        >
          View Recipe
        </a>
      </div>
    </div>
  );
};

export default RecipeModal;
