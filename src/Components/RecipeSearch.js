import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import RecipeModal from "./RecipeModal";
import { useAuth } from "../Auth/AuthContext";

const RecipeSearch = () => {
  const [query, setQuery] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [error, setError] = useState("");
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const { currentUser, favorites, setFavorites, logout } = useAuth();
  const navigate = useNavigate();

  const [filters, setFilters] = useState({
    balanced: false,
    "high-protein": false,
    "low-fat": false,
    "low-carb": false,
  });

  const dietaryOptions = [
    { id: "balanced", label: "Balanced" },
    { id: "high-protein", label: "High Protein" },
    { id: "low-fat", label: "Low Fat" },
    { id: "low-carb", label: "Low Carb" },
  ];

  const commonSearchTerms = [
    "chicken",
    "beef",
    "pasta",
    "salad",
    "soup",
    "fish",
    "vegetarian",
    "dessert",
  ];

  const fetchRecipes = useCallback(async (query, filters) => {
    const app_id = "c5534273";
    const app_key = "0d66aba887d5d377d80f2d523e56e5b2";
    try {
      const dietLabels = Object.keys(filters)
        .filter((key) => filters[key])
        .join(",");
      const dietQuery = dietLabels ? `&diet=${dietLabels}` : "";
      const randomQuery =
        commonSearchTerms[Math.floor(Math.random() * commonSearchTerms.length)];
      const searchQuery = query
        ? `q=${encodeURIComponent(query)}`
        : `q=${randomQuery}`;

      console.log(`Fetching recipes with query: ${searchQuery}`);

      const response = await axios.get(
        `https://api.edamam.com/search?${searchQuery}&app_id=${app_id}&app_key=${app_key}${dietQuery}`
      );

      console.log("API response:", response.data);

      if (response.data.hits.length === 0) {
        setError("No recipes found for the selected dietary options.");
        setRecipes([]);
      } else {
        setError("");
        setRecipes(response.data.hits);
      }
    } catch (error) {
      setError("Error fetching the recipes. Please try again.");
      console.log("Error fetching the recipes", error);
    }
  }, []);
  // automatically display recipes when page loaded
  useEffect(() => {
    fetchRecipes(query, filters);
  }, [fetchRecipes]);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchRecipes(query, filters);
  };

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.id]: e.target.checked,
    });
  };

  const handleRecipeClick = (recipe) => {
    setIsSpinning(true);
    setSelectedRecipe(recipe);
  };

  const toggleFavorite = (recipe) => {
    if (!currentUser) {
      alert("Please log in to save meal");
      return;
    }
    setFavorites((prevFavorites) => {
      if (prevFavorites.find((fav) => fav.uri === recipe.uri)) {
        const updatedFavorites = prevFavorites.filter(
          (fav) => fav.uri !== recipe.uri
        );
        localStorage.setItem(
          currentUser.uid + "-favorites",
          JSON.stringify(updatedFavorites)
        );
        return updatedFavorites;
      } else {
        const updatedFavorites = [...prevFavorites, recipe];
        localStorage.setItem(
          currentUser.uid + "-favorites",
          JSON.stringify(updatedFavorites)
        );
        return updatedFavorites;
      }
    });
  };

  const isFavorite = (recipe) => {
    return favorites.some((fav) => fav.uri === recipe.uri);
  };

  useEffect(() => {
    if (currentUser) {
      const savedFavorites =
        JSON.parse(localStorage.getItem(currentUser.uid + "-favorites")) || [];
      setFavorites(savedFavorites);
    }
  }, [currentUser, setFavorites]);

  return (
    <div className="bg-gray-100">
      <div className="container mx-auto p-4">
        <nav className="flex justify-between text-indigo-800 md:text-lg">
          <div>
            {currentUser && (
              <button
                onClick={async () => {
                  await logout();
                  navigate("/login");
                }}
              >
                Logout
              </button>
            )}
          </div>
          <div className="flex space-x-4">
            {!currentUser && (
              <>
                <Link to="/signup" >
                  Sign Up
                </Link>
                <Link to="/login">
                  Login
                </Link>
              </>
            )}
            <Link to="/saved-meals">
              Saved Meals
            </Link>
          </div>
        </nav>
        <div className="text-center">
          <h1 className="text-2xl font-semibold md:text-4xl lg:text-5xl text-indigo-800 mb-8">
            Welcome! What do you have a taste for today?
          </h1>
        </div>
        <form onSubmit={handleSearch} className="mb-4 text-center">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="border p-2 mr-2 w-[75%] lg:w-[50%] xl:w-[35%]"
            placeholder="Search for a recipe..."
          />
          <button
            type="submit"
            className="bg-indigo-800 hover:bg-indigo-600 text-white p-2 rounded"
          >
            Search
          </button>
        </form>
        <h2 className="text-center text-2xl md:text-3xl font-bold mb-2 text-indigo-800">
          Dietary Options
        </h2>
        <div className="text-center bg-gray-100 border shadow-lg mb-2 p-1">
          <div className="mb-3"></div>
          <div className="inline-block">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {dietaryOptions.map((option) => (
                <label key={option.id} className="flex items-center">
                  <input
                    type="checkbox"
                    id={option.id}
                    checked={filters[option.id]}
                    onChange={handleFilterChange}
                    className="mr-2"
                  />
                  {option.label}
                </label>
              ))}
            </div>
          </div>
        </div>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-gray-800 text-center">
          {recipes.map((recipe, index) => (
            <div
              key={index}
              className="border p-4 bg-white rounded shadow cursor-pointer relative"
              onClick={() => handleRecipeClick(recipe.recipe)}
            >
              <h2 className=" capitalize text-xl text-indigo-800 font-bold mt-2 mb-2">
                {recipe.recipe.label}
              </h2>
              <img
                src={recipe.recipe.image}
                alt={recipe.recipe.label}
                className=" h-40 object-contain mb-2 m-auto hover:shadow-md"
              />
              <p className="mb-2 ">
                Calories: {Math.round(recipe.recipe.calories)}
              </p>
              <a
                href={recipe.recipe.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sky-800"
              >
                View Recipe
              </a>
              <button
                className={`absolute top-0.5 right-2 p-1  rounded-full text-lg ${
                  isFavorite(recipe.recipe) ? " text-indigo-500" : " text-indigo-500"
                }`}
                onClick={(e) => {
                  e.stopPropagation();
                  toggleFavorite(recipe.recipe);
                }}
              >
                {isFavorite(recipe.recipe) ? "♥" : "♡"}
              </button>
            </div>
          ))}
        </div>
        {selectedRecipe && (
          <RecipeModal
            recipe={selectedRecipe}
            onClose={() => {
             
              setSelectedRecipe(null);
            }}
          />
        )}
      </div>
    </div>
  );
};

export default RecipeSearch;
