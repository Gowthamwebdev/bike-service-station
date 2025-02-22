"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";
import { userType } from "../types/userType";
import { serviceType } from "../types/serviceType";
// Adjust the path based on your project structure

// Define context type
interface GlobalContextType {
  user: userType;
  setUser: React.Dispatch<React.SetStateAction<userType>>;
  services: serviceType[];
  setServices: React.Dispatch<React.SetStateAction<serviceType[]>>;
  bookings: any[];
  setBookings: React.Dispatch<React.SetStateAction<any[]>>;
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
}

export const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

// Define the provider props
interface GlobalProviderProps {
  children: ReactNode;
}

// Create the provider component
const GlobalProvider: React.FC<GlobalProviderProps> = ({ children }) => {
  const [user, setUser] = useState<userType>({
    userId: 'null',
    name: 'null',
  });

  const [services, setServices] = useState<serviceType[]>([]);
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
