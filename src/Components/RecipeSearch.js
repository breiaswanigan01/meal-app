import React, { useState, useEffect } from "react";
import axios from "axios";
import RecipeModal from "./RecipeModal";

const RecipeSearch = () => {
  const [query, setQuery] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [error, setError] = useState("");
  const [selectedRecipe, setSelectedRecipe] = useState(null); // State to handle selected recipe

  // Adding filters state to manage the dietary options checkboxes
  const [filters, setFilters] = useState({
    balanced: false,
    "high-protein": false,
    "low-fat": false,
    "low-carb": false,
  });

  // An array of dietary options to map over when rendering checkboxes
  const dietaryOptions = [
    { id: "balanced", label: "Balanced" },
    { id: "high-protein", label: "High Protein" },
    { id: "low-fat", label: "Low Fat" },
    { id: "low-carb", label: "Low Carb" },
  ];

  // List of common search terms
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

  const fetchRecipes = async (query) => {
    const app_id = "c5534273";
    const app_key = "0d66aba887d5d377d80f2d523e56e5b2";
    try {
      // Modifying API call to include the selected dietary options in the call
      const dietLabels = Object.keys(filters)
        .filter((key) => filters[key])
        .join(",");
      const dietQuery = dietLabels ? `&diet=${dietLabels}` : "";
      // Use a random common search term if no query is provided
      const randomQuery =
        commonSearchTerms[Math.floor(Math.random() * commonSearchTerms.length)];
      // If a query is provided, it uses that query; otherwise, defaults to random generated query
      const searchQuery = query
        ? `q=${encodeURIComponent(query)}`
        : `q=${randomQuery}`;

      // Log the query to ensure it's being generated correctly
      console.log(`Fetching recipes with query: ${searchQuery}`);

      const response = await axios.get(
        `https://api.edamam.com/search?${searchQuery}&app_id=${app_id}&app_key=${app_key}${dietQuery}`
      );

      // Log the response to see what is returned
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
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchRecipes(query);
  };

  // Function to update filters state when checkboxes are changed
  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.id]: e.target.checked,
    });
  };

  // Function to handle clicking on a recipe card
  const handleRecipeClick = (recipe) => {
    setSelectedRecipe(recipe); //set the selected recipe when a recipe card is clicked
  };

  // Use useEffect to fetch random recipes when the component mounts
  useEffect(() => {
    fetchRecipes(); // Fetch with a random query to get random recipes
  }, []);

  return (
    <div className="bg-gray-100">
      <div className="container mx-auto p-4">
        <div className="whitespace-nowrap">
          <h1 className=" text-2xl font-semibold md:text-4xl lg:text-5xl text-emerald-700 mb-8">
            Welcome! What do you have a taste for today?
          </h1>
        </div>
        <form onSubmit={handleSearch} className="mb-4">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="border p-2 mr-2 w-[75%] lg:w-[50%] xl:w-[2]"
            placeholder="Search for a recipe..."
          />
          <button
            type="submit"
            className="bg-emerald-600 text-white p-2 rounded"
          >
            Search
          </button>
        </form>
        {/* Rendering checkboxes below the search bar */}
        <div className="mb-4">
          <h2 className="text-2xl md:text-3xl font-bold mb-2 text-emerald-700">
            Dietary Options
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {dietaryOptions.map((option) => (
              <label key={option.id} className="flex items-center ">
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
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-gray-200">
          {recipes.map((recipe, index) => (
            <div
              key={index}
              className="border p-4 bg-emerald-300 rounded shadow cursor-pointer"
              onClick={() => handleRecipeClick(recipe.recipe)}
            >
              <h2 className="text-xl font-bold mb-2">{recipe.recipe.label}</h2>
              <img
                src={recipe.recipe.image}
                alt={recipe.recipe.label}
                className="w-full h-40 object-cover mb-2"
              />
              <p className="mb-2 text-emer">
                Calories: {Math.round(recipe.recipe.calories)}
              </p>
              <a
                href={recipe.recipe.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500"
              >
                View Recipe
              </a>
            </div>
          ))}
        </div>
        {/* displaying modal */}
        {/* Modal Component */}
        {selectedRecipe && (
          <RecipeModal
            recipe={selectedRecipe}
            onClose={() => setSelectedRecipe(null)} //close the modal by setting selectedRecipe to null
          />
        )}
      </div>
    </div>
  );
};

export default RecipeSearch;
