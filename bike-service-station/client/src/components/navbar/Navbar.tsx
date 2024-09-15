"use client";
import React, { useState } from "react";
import { Menu, MenuItem, ProductItem, HoveredLink } from "../ui/navbar-menu"; // Assuming your components are imported from here
import Link from "next/link";

const Navbar = () => {
  const [active, setActive] = useState<string | null>(null); // To track the active menu item
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false); // For mobile drawer

  const toggleNavbar = () => {
    setMobileDrawerOpen(!mobileDrawerOpen);
  };

  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-black border-b dark:border-white/10 shadow-sm">
      <div className="container mx-auto px-4">
        <nav className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex items-center flex-shrink-0">
            <span className="text-xl tracking-tight font-mono font-semibold bg-gradient-to-t from-yellow-500 via-orange-400 to-yellow-600 text-transparent bg-clip-text">
             Service Hub
            </span>
          </div>

          {/* Main Menu for Large Screens */}
          <Menu setActive={setActive}>
            <ul className="hidden lg:flex space-x-12 font-mono text-xl">
              <MenuItem setActive={setActive} active={active} item="Home">
                <HoveredLink href="/">Go to Home</HoveredLink>
              </MenuItem>
              <MenuItem setActive={setActive} active={active} item="About US">
              </MenuItem>
              <MenuItem setActive={setActive} active={active} item="Services">
              </MenuItem>
              <MenuItem setActive={setActive} active={active} item="Contact">
              </MenuItem>
            </ul>
          </Menu>

          {/* Create an Account Button for Large Screens */}
          <div className="hidden lg:flex justify-center space-x-12 items-center">
            <a
              href="#"
              className="bg-gradient-to-r from-yellow-500 via-orange-400 to-yellow-600 py-2 px-3 rounded-md text-white hover:bg-orange-500"
            >
              Create an account
            </a>
          </div>

          {/* Hamburger Menu for Mobile */}
          <div className="lg:hidden flex items-center">
            <button onClick={toggleNavbar}>
              {mobileDrawerOpen ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="h-6 w-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="h-6 w-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                </svg>
              )}
            </button>
          </div>
        </nav>

        {/* Mobile Drawer */}
        {mobileDrawerOpen && (
          <div
            className="fixed inset-0 z-20 backdrop-blur-lg w-full p-12 flex flex-col justify-center items-center lg:hidden transition-all"
            onClick={toggleNavbar}
          >
            <ul className="space-y-6">
              <li className="text-xl font-semibold">
                <a href="/">Home</a>
              </li>
              <li className="text-xl font-semibold">
                <a href="/products">Products</a>
              </li>
              <li className="text-xl font-semibold">
                <a href="/about">About Us</a>
              </li>
              <li className="text-xl font-semibold">
                <a href="/contact">Contact</a>
              </li>
            </ul>
            <div className="mt-8">
              <a
                href="#"
                className="py-2 px-4 rounded-md bg-gradient-to-r from-yellow-500 via-orange-400 to-yellow-600 text-white"
              >
                Create an account
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
