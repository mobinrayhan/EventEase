"use client";

import { createContext, useContext, useState } from "react";

type User = {
  _id: string;
  name: string;
};

type LoginResponse = {
  message: string;
  token: string;
  user: User;
};

type AuthResponse = LoginResponse & {
  user: User;
};

interface AuthContextType {
  user: AuthResponse | null;
  login: (user: AuthResponse) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthResponse | null>(() => {
    if (typeof window !== "undefined") {
      const savedUser = localStorage.getItem("user");
      return savedUser ? JSON.parse(savedUser) : null;
    }
    return null;
  });

  const login = (user: AuthResponse) => {
    setUser(user);
    if (typeof window !== "undefined") {
      localStorage.setItem("user", JSON.stringify(user));
    }
  };

  const logout = () => {
    setUser(null);
    if (typeof window !== "undefined") {
      localStorage.removeItem("user");
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
