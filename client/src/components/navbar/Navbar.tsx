import Link from "next/link";
import React from "react";
// import ThemeToggle from "./ThemeToggle";
import Image from "next/image";
const Navbar = () => {
  return (
    <div className="">
      <div className="fixed w-full z-50 text-sm backdrop-blur-md">
      <div className="py-2 lg:px-20 md:px-10 px-5 flex justify-between dark:border-zinc-800 border-b-[0.5px]">
        <div className="flex  items-center">
          <Image
            src="/logo.png"
            width="500"
            height="500"
            alt="logo"
            className="w-10 h-10 logo dark:logodark"
          />
          <Link href={"/"} className="text-lg font-bold pr-2">Bike<span className="text-orange-600">Service</span></Link>
        </div>
        <div className="lg:flex hidden items-center gap-7  text-sm font-semibold">
          <Link href={"/"} className="dark:hover:text-white hover:text-black duration-100">Dashboard</Link>
          <Link href={"/"} className="dark:hover:text-white hover:text-black duration-100">Services</Link>
          <Link href={"/"} className="dark:hover:text-white hover:text-black duration-100">Bookings</Link>
          <Link href={"/"} className="dark:hover:text-white hover:text-black duration-100">Contact</Link>
        </div>zz  
        <div className="lg:flex hidden items-center gap-5">
          <Link
            href={"/auth/login"}
            className="px-4 py-0.5 pb-1 bg-gradient-to-br from-orange-500 via-orange-700 to-orange-800 font-semibold rounded-lg border-red-400 text-white"
          >
            Login
          </Link>
        </div>
      </div>
    </div>
    <div className="pt-20"></div>
    </div>
  );
};

export default Navbar;