'use client';

import { useState } from "react";
import { navItems } from "../../lib/data.js";
import NavLink from "./NavLink";
import { Toggle } from "../ui/Toggle";

const Navbar = () => {
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  const toggleNavbar = () => {
    setMobileDrawerOpen(!mobileDrawerOpen);
  };

  return (
    <nav className="sticky top-0 z-50 py-3 bg-white border-b rounded-lg shadow-sm w-full">
      <div className="container px-auto mx-auto relative lg:text-sm">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center flex-shrink-0">
            <span className="text-xl tracking-tight font-mono font-semibold bg-gradient-to-t from-[#DB6400] via-[#d86405] to-[#f7980a] text-transparent bg-clip-text">
              Anton Services
            </span>
          </div>

          {/* Navbar items for larger screens */}
          <ul className="hidden lg:flex ml-14 space-x-12 font-mono text-lg">
          {navItems.map(({ href, label }: { href: string; label: string }) => (
              <li
                key={href}
                className={`${
                  label === "Contact Us" ? "bg-orange-500 text-white px-3 py-2 rounded-md" : ""
                }`}
              >
                <NavLink href={href} label={label} />
              </li>
            ))}
          </ul>

          <div className="lg:hidden flex items-center">
            <button onClick={toggleNavbar}>
              {mobileDrawerOpen ? <Toggle.toggleOpen /> : <Toggle.toggleClose />}
            </button>
          </div>
        </div>

        {mobileDrawerOpen && (
          <div
            className="fixed inset-0 z-20 backdrop-blur-lg w-full p-12 flex flex-col justify-center items-center lg:hidden transition-all"
            onClick={toggleNavbar}
          >
            <ul>
              {navItems.map((item, index) => (
                <li key={index} className="py-4">
                  <a href={item.href}>{item.label}</a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
