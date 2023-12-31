import React, { createContext, useContext, useState, useEffect } from 'react';

export interface AuthContextProps {
    isAuthenticated: boolean;
    login: (email: string, password: string) => Promise<void>; // Updated signature
 
    logout: () => void;
    authError: string;
}

const AuthContext = createContext<AuthContextProps | null>(null);


export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [authError, setAuthError] = useState('')
    useEffect(() => {
        const auth = localStorage.getItem("isAuthenticated");
        setIsAuthenticated(auth === "true");
    }, []);

    const login = async (email: string, password: string) => {
        try {
          const response = await fetch('http://localhost:3000/auth/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
          });
    
          if (!response.ok) {
            throw new Error('Failed to authenticate');
          }
    
          const userData = await response.json();
          localStorage.setItem("isAuthenticated", "true");
          localStorage.setItem("user-data", JSON.stringify(userData));
          setIsAuthenticated(true);
          setAuthError('');
        } catch (error) {
          setAuthError('Incorrect email or password');
          setIsAuthenticated(false);
        }
      };

    const logout = () => {
        localStorage.setItem("isAuthenticated", "false");
        setIsAuthenticated(false);
    };

    return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout,authError }}>
      {children}
    </AuthContext.Provider>
  );
};
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
      throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
  };