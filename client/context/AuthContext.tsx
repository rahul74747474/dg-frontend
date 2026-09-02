import {
  createContext,
  useEffect,
  useState,
  ReactNode,
  useContext,
  useCallback,
} from "react";
import api, { setSessionExpiredHandler } from "../api/axios";
import SessionExpiredModal from "../components/SessionExpiredModal";

/* ------------------ Types ------------------ */

export interface UserAvatar {
  url: string;
  public_id: string;
}

export interface User {
  _id: string;
  name: string;
  email: string;
  mobile?: string;
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
  logout: () => Promise<void>;
  isSessionExpired: boolean;
  dismissSessionExpired: () => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

/* ------------------ Context ------------------ */

const AuthContext = createContext<AuthContextType | undefined>(undefined);

/* ------------------ Provider ------------------ */

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSessionExpired, setIsSessionExpired] = useState(false);

  // Logout handler
  const logout = useCallback(async () => {
    try {
      await api.post("/auth/logout");
    } catch {
      // Ignore network errors on logout
    } finally {
      localStorage.removeItem("token");
      setUser(null);
    }
  }, []);

  // Session expired handler triggered by global axios interceptor
  const handleSessionExpired = useCallback(() => {
    localStorage.removeItem("token");
    setUser(null);
    setIsSessionExpired(true);
  }, []);

  const handleLoginAgain = useCallback(() => {
    setIsSessionExpired(false);
    const currentPath = window.location.pathname + window.location.search;
    if (
      currentPath &&
      !currentPath.includes("/login") &&
      !currentPath.includes("/signup")
    ) {
      sessionStorage.setItem("redirectAfterLogin", currentPath);
    }
    window.location.href = "/login";
  }, []);

  useEffect(() => {
    // Register global axios session-expired callback
    setSessionExpiredHandler(handleSessionExpired);

    const token = localStorage.getItem("token");

    if (!token) {
      setLoading(false);
      return;
    }

    // Check current session
    api
      .get("/auth/me")
      .then((res) => {
        setUser(res.data.user as User);
      })
      .catch(() => {
        // If /auth/me fails (even after automatic refresh attempt in interceptor)
        localStorage.removeItem("token");
        setUser(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [handleSessionExpired]);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: Boolean(user),
        isAdmin: user?.role === "ADMIN",
        loading,
        setUser,
        logout,
        isSessionExpired,
        dismissSessionExpired: () => setIsSessionExpired(false),
      }}
    >
      {children}
      <SessionExpiredModal
        isOpen={isSessionExpired}
        onLoginAgain={handleLoginAgain}
      />
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
