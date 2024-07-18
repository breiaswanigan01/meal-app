// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './Auth/AuthContext';
import SignUp from './Auth/SignUp';
import Login from './Auth/Login';
import RecipeSearch from './Components/RecipeSearch';
import SavedMeals from './Auth/SavedMeals';
import PrivateRoute from './Auth/PrivateRoute';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<RecipeSearch />} />
          <Route path="/saved-meals" element={<PrivateRoute><SavedMeals /></PrivateRoute>} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
