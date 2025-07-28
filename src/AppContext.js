import React, { createContext, useState, useContext } from 'react';

// Create the context object
export const AppContext = createContext();

// Create a provider component
export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null); // example state for logged-in user
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = (userData) => {
    setUser(userData);
    setIsLoggedIn(true);
  };

  const logout = () => {
    setUser(null);
    setIsLoggedIn(false);
  };

  return (
    <AppContext.Provider value={{ user, isLoggedIn, login, logout }}>
      {children}
    </AppContext.Provider>
  );
};

// Create and export a custom hook for easier context consumption
export const useAuth = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAuth must be used within an AppProvider');
  }
  return context;
};
