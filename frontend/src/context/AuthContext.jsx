import { createContext, useEffect, useState } from "react";
import { loginUser, signupUser } from "../services/authService";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); 

  // Load user from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    setLoading(false); 
  }, []);

  // Login
  const login = async (formData) => {
    const data = await loginUser(formData);
    setUser(data);
    localStorage.setItem("user", JSON.stringify(data));
  };

  // Signup
  const signup = async (formData) => {
    const data = await signupUser(formData);
    setUser(data);
    localStorage.setItem("user", JSON.stringify(data));
  };

  // Logout
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider
      value={{ user, login, signup, logout, loading }} 
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;