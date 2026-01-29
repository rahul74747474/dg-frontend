import { createContext, useContext, useState } from "react";

type ScrollContextType = {
  isOnHero: boolean;
  setIsOnHero: (v: boolean) => void;
};

const ScrollContext = createContext<ScrollContextType | null>(null);

export const ScrollProvider = ({ children }: { children: React.ReactNode }) => {
  const [isOnHero, setIsOnHero] = useState(true);

  return (
    <ScrollContext.Provider value={{ isOnHero, setIsOnHero }}>
      {children}
    </ScrollContext.Provider>
  );
};

export const useScrollContext = () => {
  const ctx = useContext(ScrollContext);
  if (!ctx) throw new Error("useScrollContext must be inside ScrollProvider");
  return ctx;
};

