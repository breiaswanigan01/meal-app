import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import RecipeSearch from "./Components/RecipeSearch";
import SignUp from "./Auth/SignUp";
import Login from "./Auth/Login";
import SavedMeals from "./Auth/SavedMeals";
import { AuthProvider } from "./Auth/AuthContext";
import PrivateRoute from "./Auth/PrivateRoute";

function App() {
  return (
      <Router>
    <AuthProvider>
        <Routes>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<RecipeSearch />} />
          <Route
            path="/saved-meals"
            element={
              <PrivateRoute>
                <SavedMeals />
              </PrivateRoute>
            }
          />
        </Routes>
        </AuthProvider>
      </Router>
  
  );
}

export default App;
