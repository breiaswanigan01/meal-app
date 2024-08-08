import React, { createContext, useContext, useState, useEffect } from "react";
import { getAuth, onAuthStateChanged, signOut, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      if (user) {
        // Load favorites from local storage or database for the new user
        const userFavorites = JSON.parse(localStorage.getItem(user.uid + "-favorites")) || [];
        setFavorites(userFavorites);
      } else {
        // Clear favorites when no user is logged in
        setFavorites([]);
      }
    });
    return unsubscribe;
  }, []);

const login = async (email, password) => {
  try {
await signInWithEmailAndPassword(auth, email, password);
navigate("/"); //Navigate to home upon successful login
  } catch (error) {
    console.error("Failed to log in", error);
    throw error;
  }
};
const signup = async (email, password) => {
  try {
    await createUserWithEmailAndPassword(auth, email, password);
    navigate("/"); // navigate to home pg upon successful signup
  } catch (error){
    console.error("Failed to sign up", error.message);
    throw error; // rethrow error so it can be handled in the Signup component
  }
}

  const logout = () => {
    signOut(auth);
navigate("/login"); // Navigate to login upon logout
  }

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem(currentUser.uid + "-favorites", JSON.stringify(favorites));
    }
  }, [favorites, currentUser]);

  const value = {
    currentUser,
    favorites,
    setFavorites,
    login,
    signup,
    logout,
    isAuthenticated: !!currentUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
