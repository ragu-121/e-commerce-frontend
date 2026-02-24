import { createContext, useContext, useEffect, useState } from "react";
import api from "../api/axios";

interface User {
  id: number;
  role: "USER" | "ADMIN";
  exp: number;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(()=>{
    const savedUser = localStorage.getItem('token');
    return savedUser ? JSON.parse(atob(savedUser.split('.')[1])) : null;
  });

  // Load user from token on refresh
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded: User = JSON.parse(atob(token.split(".")[1]));

      console.log("decodedd",decoded)
      setUser(decoded);
    }
  }, []);

  const login = async (email: string, password: string) => {
    const res = await api.post("/auth/login", { email, password });
    localStorage.setItem("token", res.data.token);

    const decoded: User = JSON.parse(atob(res.data.token.split(".")[1]));
    setUser(decoded);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isAuthenticated: !!user
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  // console.log("dssdfsd",context)
  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return context;
};
