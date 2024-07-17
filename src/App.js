import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignUp from "./Auth/SignUp";
import Login from "./Auth/Login";
import RecipeSearch from "./Components/RecipeSearch";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RecipeSearch />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
};

export default App;
