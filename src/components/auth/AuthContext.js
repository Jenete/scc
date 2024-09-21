import React, { createContext, useState, useEffect } from 'react';
import UserController from '../../controllers/UserController.js';

// Create the Auth Context
export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  // State to hold the authenticated user
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  // Function to log in
  const login = async (email, password) => {
    // Simulate login (replace this with an actual API call)
    try {
        const authenticateUser = await UserController.login(email, password);
        if (authenticateUser) {
            sessionStorage.setItem('sccuser', JSON.stringify(authenticateUser)); // Save user to sessionStorage
            setUser(authenticateUser);
            setIsAuthenticated(true);
            return true;
          }
    } catch (error) {
        return false;
    }
   
    
    
  };

  // Function to log out
  const logout = () => {
    sessionStorage.removeItem('sccuser');
    setUser(null);
    setIsAuthenticated(false);
    window.location.href = '/login'
  };

  // Check if user is logged in on component mount
  useEffect(() => {
    const storedUser = JSON.parse(sessionStorage.getItem('sccuser'));
    if (storedUser) {
      setUser(storedUser);
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
