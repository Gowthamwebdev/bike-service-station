import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button } from "@nextui-org/react";
import { ProfileCardPopover } from "../ProfileCard";

export default function App() {

  return (
    <div className="sticky top-0 z-50 py-3 bg-white backdrop-blur-md rounded-sm w-full ">
    <Navbar className="container px-auto mx-auto relative lg:text-sm lg:block hidden">
      <NavbarBrand>
        <p className="font-bold text-sm sm:text-lg bg-gradient-to-b from-[#DB6400] via-[#d86405] to-[#f7980a] text-transparent bg-clip-text ">Maruthi services</p>
      </NavbarBrand>
      <NavbarContent className="flex justify-between items-center">
        <div className="flex gap-10 items-center font-sans text-sm sm:text-[1rem] font-semibold">
        <NavbarItem>
            <Link href="/dashboard" aria-current="page">
              Dashboard
            </Link>
          </NavbarItem>
        <NavbarItem>
            <Link href="/about" aria-current="page">
              About Us
            </Link>
          </NavbarItem>

          <NavbarItem>
            <Link href="/view-services" aria-current="page">
              Services
            </Link>
          </NavbarItem>

          <NavbarItem>
            <Link href="/bookings">
              Bookings
            </Link>
          </NavbarItem>
        </div>
        <Button
          className="bg-gradient-to-b from-[#DB6400] via-[#d86405] to-[#f7980a] rounded-md text-white hover:bg-orange-600 p-1"
          radius="sm"
          variant="solid"
        >
          Contact Us
        </Button>
      </NavbarContent>
      <ProfileCardPopover/>
    </Navbar>
    </div>
  );
}
