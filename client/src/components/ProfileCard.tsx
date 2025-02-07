'use client'

import React from "react";
import {
  Avatar,
  Button,
  Card,
  CardFooter,
  CardHeader,
  Popover,
  PopoverTrigger,
  PopoverContent,
  User,
} from "@heroui/react";
import { useGlobalContext } from "@/src/context/GlobalProviders"; // Import the custom hook

export const ProfileCardPopover = () => {
  const [isFollowed, setIsFollowed] = React.useState(false);

  // Access user data from GlobalProvider
  const { user } = useGlobalContext();

  const handleLogout = () => {
    // Add your logout logic here (e.g., clearing tokens, redirecting to login)
    console.log("User logged out");
  };

  return (
    <Popover showArrow placement="bottom-end">
      <PopoverTrigger>
        <User
          as="button"
          avatarProps={{
            src: "https://i.pravatar.cc/150?u=a04258114e29026702d",
          }}
          className="transition-transform"
          description="User"
          name={user?.name || "Guest"}  
        />
      </PopoverTrigger>
      <PopoverContent className="p-1">
        <Card className="max-w-[300px] border-none bg-transparent" shadow="none">
          <CardHeader className="justify-between">
            <div className="flex gap-3">
              <Avatar
                isBordered
                radius="full"
                size="md"
                src="https://i.pravatar.cc/150?u=a04258114e29026702d"
              />
              <div className="flex flex-col items-start justify-center">
                <h4 className="text-small font-semibold leading-none text-default-600">
                  {user?.name || "Guest"} {/* Set the user name from global context */}
                </h4>
                <h5 className="text-small tracking-tight text-default-500">@{user?.name?.toLowerCase().replace(' ', '') || 'guest'}</h5>
              </div>
            </div>
          </CardHeader>
          <CardFooter className="gap-3 flex flex-col">
            <Button
              className="bg-red-500 text-white mt-3 hover:bg-red-600"
              radius="sm"
              size="sm"
              onPress={handleLogout}
            >
              Logout
            </Button>
          </CardFooter>
        </Card>
      </PopoverContent>
    </Popover>
  );
};
