'use client'

import React from "react";
import {
  Avatar,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Popover,
  PopoverTrigger,
  PopoverContent,
  User,
} from "@heroui/react";

export const ProfileCardPopover = () => {
  const [isFollowed, setIsFollowed] = React.useState(false);

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
          description="USer"
          name="Zoe Lang"
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
                  Zoey Lang
                </h4>
                <h5 className="text-small tracking-tight text-default-500">@zoeylang</h5>
              </div>
            </div>
            <Button
              className={isFollowed ? "bg-transparent text-foreground border-default-200" : ""}
              color="primary"
              radius="full"
              size="sm"
              variant={isFollowed ? "bordered" : "solid"}
              onPress={() => setIsFollowed(!isFollowed)}
            >
              {isFollowed ? "Unfollow" : "Follow"}
            </Button>
          </CardHeader>
          <CardBody className="px-3 py-0">
            <p className="text-small pl-px text-default-500">
              Full-stack developer, @hero_ui lover she/her
              <span aria-label="confetti" role="img">
                🎉
              </span>
            </p>
          </CardBody>
          <CardFooter className="gap-3 flex flex-col">
            <div className="flex gap-1">
              <p className="font-semibold text-default-600 text-small">4</p>
              <p className="text-default-500 text-small">Following</p>
            </div>
            <div className="flex gap-1">
              <p className="font-semibold text-default-600 text-small">97.1K</p>
              <p className="text-default-500 text-small">Followers</p>
            </div>
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
