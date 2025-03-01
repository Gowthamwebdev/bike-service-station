'use client'
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { userType } from "../types/userType";
import { serviceType } from "../types/serviceType";
import { bikeType } from "../types/bikeType";
import { bookingType } from "../types/bookingType";

interface GlobalContextType {
  user: userType;
  setUser: React.Dispatch<React.SetStateAction<userType>>;
  services: serviceType[];
  setServices: React.Dispatch<React.SetStateAction<serviceType[]>>;
  bookings: bookingType[];
  setBookings: React.Dispatch<React.SetStateAction<bookingType[]>>;
  bikes: bikeType[];
  setBikes: React.Dispatch<React.SetStateAction<bikeType[]>>;
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
}

export const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

interface GlobalProviderProps {
  children: ReactNode;
}

const GlobalProvider: React.FC<GlobalProviderProps> = ({ children }) => {
  const [user, setUser] = useState<userType>({ userId: "null", name: "null" });
  const [services, setServices] = useState<serviceType[]>([]);
  const [bookings, setBookings] = useState<bookingType[]>([]);
  const [bikes, setBikes] = useState<bikeType[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    const storedUserName = localStorage.getItem("user");
    if (storedUserId && storedUserName) {
      setUser({ userId: storedUserId, name: storedUserName });
    }
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        user,
        setUser,
        services,
        setServices,
        bookings,
        setBookings,
        bikes,
        setBikes,
        searchTerm,
        setSearchTerm,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;

export const useGlobalContext = (): GlobalContextType => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error("useGlobalContext must be used within a GlobalProvider");
  }
  return context;
};
