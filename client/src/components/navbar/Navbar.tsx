"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { authStatus } from "@/src/api/authStatus";
import { logout } from "@/src/app/auth/logout/logOut";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const data = await authStatus();
        setIsLoggedIn(data?.loggedIn || false);
      } catch (error) {
        console.error("Failed to check auth status:", error);
        setIsLoggedIn(false);
      }
    };

    checkAuthStatus();
  }, []);

  const handleLogout = async () => {
    try {
      await logout(router);
      setIsLoggedIn(false);
      setIsSidebarOpen(false);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div>
      <div className="fixed w-full z-50 text-sm backdrop-blur-md">
        <div className="py-2 lg:px-20 md:px-10 px-5 flex justify-between border-b-[0.5px]">
          <div className="flex items-center">
            <Image
              src="/logo.png"
              width="500"
              height="500"
              alt="logo"
              className="w-10 h-10"
            />
            <Link href={"/"} className="text-lg font-bold pr-2">
              Bike<span className="text-orange-600">Service</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-7 font-semibold">
            <Link href={"/dashboard"} className="hover:text-black duration-100">Dashboard</Link>
            <Link href={"/view-services"} className="hover:text-black duration-100">Services</Link>
            <Link href={"/bookings"} className="hover:text-black duration-100">Bookings</Link>
            <Link href={"/contact"} onClick={() => setIsSidebarOpen(false)}>Contact</Link>
          </div>

          <div className="hidden lg:flex items-center gap-5">
            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                className="px-4 py-0.5 pb-1 bg-gradient-to-br from-primary to-red-600 font-semibold rounded-lg text-white"
              >
                Logout
              </button>
            ) : (
              <Link
                href={"/auth/login"}
                className="px-4 py-0.5 pb-1 bg-gradient-to-br from-orange-500 via-orange-700 to-orange-800 font-semibold rounded-lg text-white"
              >
                Login
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-2xl"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            ☰
          </button>
        </div>
      </div>

      {/* Mobile Sidebar */}
      {isSidebarOpen && (
        <div className="fixed top-0 left-0 w-64 h-full bg-white p-5 shadow-lg z-50">
          <button
            className="text-xl mb-5"
            onClick={() => setIsSidebarOpen(false)}
          >
            ✕
          </button>

          <nav className="flex flex-col gap-5 text-sm font-medium">
            <Link href={"/dashboard"} onClick={() => setIsSidebarOpen(false)}>Dashboard</Link>
            <Link href={"/view-services"} onClick={() => setIsSidebarOpen(false)}>Services</Link>
            <Link href={"/bookings"} onClick={() => setIsSidebarOpen(false)}>Bookings</Link>
            <Link href={"/contact"} onClick={() => setIsSidebarOpen(false)}>Contact</Link>
            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                className="px-4 py-0.5 pb-1 bg-gradient-to-br from-primary to-red-600 w-2/3 font-semibold rounded-lg text-white"
              >
                Logout
              </button>
            ) : (
              <Link
                href={"/auth/login"}
                className="px-4 py-0.5 pb-1 bg-gradient-to-br from-orange-500 via-orange-700 to-orange-800 w-2/3 font-semibold rounded-lg text-white"
              >
                Login
              </Link>
            )}
          </nav>
        </div>
      )}

      <div className="pt-20"></div>
    </div>
  );
};

export default Navbar;
