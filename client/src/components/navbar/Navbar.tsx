'use client';

import Link from "next/link";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { authStatus } from "@/src/api/authStatus";
import { logout } from "@/src/app/auth/logout/logOut";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
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
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <div>
      <div className="fixed w-full z-50 text-sm backdrop-blur-md">
        <div className="py-2 lg:px-20 md:px-10 px-5 flex justify-between dark:border-zinc-800 border-b-[0.5px]">
          <div className="flex items-center">
            <Image
              src="/logo.png"
              width="500"
              height="500"
              alt="logo"
              className="w-10 h-10 logo dark:logodark"
            />
            <Link href={"/"} className="text-lg font-bold pr-2">
              Bike<span className="text-orange-600">Service</span>
            </Link>
          </div>

          <div className="lg:flex hidden items-end gap-7 text-sm font-semibold">
            <Link href={"/dashboard"} className="dark:hover:text-white hover:text-black duration-100">Dashboard</Link>
            <Link href={"/view-services"} className="dark:hover:text-white hover:text-black duration-100">Services</Link>
            <Link href={"/bookings"} className="dark:hover:text-white hover:text-black duration-100">Bookings</Link>
            <Link href={"/contact"} className="dark:hover:text-white hover:text-black duration-100">Contact</Link>
          </div>

          <div className="lg:flex hidden items-center gap-5">
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
        </div>
      </div>
      <div className="pt-20"></div>
    </div>
  );
};

export default Navbar;
