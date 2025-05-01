
import React, { createContext, useContext, useState, useEffect } from "react";
import { users } from "../data/petData";

interface User {
  id: number;
  email: string;
  name: string;
  role: "admin" | "user";
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in from localStorage
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simulate server request delay
    await new Promise(resolve => setTimeout(resolve, 800));

    if (email === users.admin.email && password === users.admin.password) {
      const userData = {
        id: users.admin.id,
        email: users.admin.email,
        name: users.admin.name,
        role: users.admin.role as "admin" | "user"
      };
      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));
      return true;
    } else if (email === users.user.email && password === users.user.password) {
      const userData = {
        id: users.user.id,
        email: users.user.email,
        name: users.user.name,
        role: users.user.role as "admin" | "user"
      };
      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));
      return true;
    }
    
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("cart");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
