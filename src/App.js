// src/App.js

import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignUp from "./Auth/SignUp";
import Login from "./Auth/Login";
import RecipeSearch from "./Components/RecipeSearch";
import SavedMeals from "./Auth/SavedMeals";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Authentication state
  const [favorites, setFavorites] = useState([]); // Favorite recipes state

  // Handle login function
  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  // Handle logout function
  const handleLogout = () => {
    setIsAuthenticated(false);
    setFavorites([]);
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <RecipeSearch
              isAuthenticated={isAuthenticated}
              favorites={favorites}
              setFavorites={setFavorites}
            />
          }
        />
        <Route path="/signup" element={<SignUp />} />
        <Route
          path="/login"
          element={<Login onLogin={handleLogin} />}
        />
        <Route
          path="/saved-meals"
          element={
            <SavedMeals
              favorites={favorites}
              handleRecipeClick={(recipe) => {}}
              toggleFavorite={(recipe) => {
                setFavorites((prevFavorites) => {
                  if (prevFavorites.find((fav) => fav.uri === recipe.uri)) {
                    return prevFavorites.filter((fav) => fav.uri !== recipe.uri);
                  } else {
                    return [...prevFavorites, recipe];
                  }
                });
              }}
            />
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
