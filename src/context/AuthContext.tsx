import React, { createContext, useState, useEffect, useContext } from 'react';
import { UserType } from '../types';

interface AuthContextType {
  user: UserType | null;
  isAuthenticated: boolean;
  userType: 'restaurant' | 'volunteer' | null;
  login: (userData: UserType) => void;
  logout: () => void;
  register: (userData: UserType) => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  userType: null,
  login: () => {},
  logout: () => {},
  register: () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserType | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userType, setUserType] = useState<'restaurant' | 'volunteer' | null>(null);

  useEffect(() => {
    // Check for saved user data in localStorage
    const savedUser = localStorage.getItem('foodShareUser');
    
    if (savedUser) {
      const parsedUser = JSON.parse(savedUser);
      setUser(parsedUser);
      setIsAuthenticated(true);
      setUserType(parsedUser.type);
    }
  }, []);

  const login = (userData: UserType) => {
    setUser(userData);
    setIsAuthenticated(true);
    setUserType(userData.type);
    localStorage.setItem('foodShareUser', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    setUserType(null);
    localStorage.removeItem('foodShareUser');
  };

  const register = (userData: UserType) => {
    // In a real app, this would send the data to an API
    // For this MVP, we'll simulate registration by just logging in
    setUser(userData);
    setIsAuthenticated(true);
    setUserType(userData.type);
    localStorage.setItem('foodShareUser', JSON.stringify(userData));
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, userType, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};