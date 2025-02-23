"use client";

import { useEffect, useState } from "react";
import { Button } from "@nextui-org/react";
import { useGlobalContext } from "@/src/context/GlobalProviders";
import AddBikeForm from "@/src/components/AddBikeForm";
import { getUserBike } from "@/src/api/bikeApi";
import GlobalBikeCard from "@/src/components/GlobalBikeCard";
import Image from "next/image";

const Dashboard = () => {
  const { user } = useGlobalContext();
  const [showForm, setShowForm] = useState(false);
  const [bikes, setBikes] = useState([]);

  useEffect(() => {
    if (user?.userId) {
      fetchBikes();
    }
  }, [user]);

  const fetchBikes = async () => {
    try {
      const bikesData = await getUserBike();
      setBikes(bikesData);
    } catch (error) {
      console.error("Error fetching bikes:", error);
    }
  };

  return (
    <div className="relative min-h-[650px] bg-gray-50 flex justify-center items-center">
      <div className="container top-2 absolute p-6">
        {/* User Profile Section */}
        <div className="flex justify-around items-center p-6 rounded-lg mb-8">
          <div className="flex items-center gap-4">
            <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-gray-600">
              <Image
                src="/user-profile.png" 
                alt="User Profile"
                layout="fill"
                objectFit="cover"
              />
            </div>
            <div>
              <p className="text-gray-700 text-lg">
                Welcome{" "}
                <span className="text-primary font-semibold text-2xl">
                  {user?.name || "Guest"}
                </span>
              </p>
            </div>
          </div>
          <div className="bg-gray-50 p-3 rounded-lg shadow-sm">
            <p className="text-gray-600 font-medium">
              Total Bikes:{" "}
              <span className="text-primary font-bold text-xl">{bikes.length}</span>
            </p>
          </div>
          <Button
            onClick={() => setShowForm(true)}
            className="bg-gray-800 text-white font-semibold py-2 px-6 rounded-lg hover:bg-primary-dark transition-all shadow-lg"
          >
            Add Bike
          </Button>
        </div>

        {/* Add Bike Form */}
        {showForm && <AddBikeForm setShowForm={setShowForm} />}

        {/* Bike List Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {bikes.length === 0 ? (
            <p className="text-gray-500 text-center col-span-full">No bikes found.</p>
          ) : (
            bikes.map((bike) => (
              <GlobalBikeCard key={bike.id} bike={bike} />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;