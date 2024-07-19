import React, { useState, useEffect } from "react";
import { useAuth } from "../Auth/AuthContext";
import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";

const SavedMeals = () => {
  const { currentUser } = useAuth();
  const [savedMeals, setSavedMeals] = useState([]);

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setSavedMeals(favorites);
  }, []);

  const deleteMeal = (uri) => {
    const updatedFavorites = savedMeals.filter((meal) => meal.uri !== uri);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    setSavedMeals(updatedFavorites);
  };

  if (!currentUser) {
    return (
      <div className="text-center">
        <p className="text-center text-emerald-700">
          Please log in to view saved meals.
        </p>
        <Link to="/login" className="text-emerald-600">
          Login
        </Link>
      </div>
    );
  }

  if (!savedMeals || savedMeals.length === 0) {
    return <p className="text-center text-emerald-700">No saved meals yet.</p>;
  }

  return (
    <div className="mt-8">
      <div className="text-left">
        <Link to="/" className="text-emerald-600 md:text-xl flex items-center">
          <FaHome className="mr-2" />
          Home
        </Link>
      </div>
      <h2 className="text-2xl md:text-3xl text-center font-bold mb-4 text-emerald-700">
        Favorite Recipes
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {savedMeals.map((recipe, index) => (
          <div
            key={index}
            className="border p-4 bg-emerald-300 rounded shadow cursor-pointer relative"
          >
            <h2 className="text-xl font-bold mb-2">{recipe.label}</h2>
            <img
              src={recipe.image}
              alt={recipe.label}
              className="w-full h-40 object-cover mb-2"
            />
            <p className="mb-2">Calories: {Math.round(recipe.calories)}</p>
            <a
              href={recipe.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500"
            >
              View Recipe
            </a>
            <button
              className="absolute top-2 right-2 p-1 text-2xl rounded-full text-pink-800"
              onClick={(e) => {
                e.stopPropagation();
                deleteMeal(recipe.uri);
              }}
            >
              &times;
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SavedMeals;
