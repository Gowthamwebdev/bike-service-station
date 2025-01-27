"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";

// Define the types for the context state
interface User {
  userId: string | null;
  name: string | null;
}

interface GlobalContextType {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
  services: any[];
  setServices: React.Dispatch<React.SetStateAction<any[]>>;
  bookings: any[];
  setBookings: React.Dispatch<React.SetStateAction<any[]>>;
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
}

export const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

// Define the type for the GlobalProvider component props
interface GlobalProviderProps {
  children: ReactNode;
}

// Create the provider component
const GlobalProvider: React.FC<GlobalProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User>({
    userId: null,
    name: null,
  });

  const [services, setServices] = useState<any[]>([]);
  const [bookings, setBookings] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");

  return (
    <GlobalContext.Provider
      value={{
        user,
        setUser,
        services,
        setServices,
        bookings,
        setBookings,
        searchTerm,
        setSearchTerm,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;

// Custom hook to use the global context
export const useGlobalContext = (): GlobalContextType => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error("useGlobalContext must be used within a GlobalProvider");
  }
  return context;
};
