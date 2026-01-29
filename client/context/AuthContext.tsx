import {
  createContext,
  useEffect,
  useState,
  ReactNode,
  useContext,
} from "react";
import api from "../api/axios";

/* ------------------ Types ------------------ */

export interface UserAvatar {
  url: string;
  public_id: string;
}

export interface User {
  _id: string;
  name: string;
  email: string;

  avatar?: {
    url?: string;
    public_id?: string;
  } | null;

  role?: "USER" | "ADMIN";
  isEmailVerified?: boolean;
}


interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  loading: boolean;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

interface AuthProviderProps {
  children: ReactNode;
}

/* ------------------ Context ------------------ */

// ✅ use undefined, NOT null
const AuthContext = createContext<AuthContextType | undefined>(undefined);

/* ------------------ Provider ------------------ */

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setLoading(false);
      return;
    }

    api
      .get("/auth/me")
      .then((res) => {
        setUser(res.data.user as User);
      })
      .catch(() => {
        localStorage.removeItem("token");
        setUser(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: Boolean(user),
        isAdmin: user?.role === "ADMIN",
        loading,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

/* ------------------ useAuth HOOK ------------------ */

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }

  return context;
}

export { AuthContext };
