"use client";

import { useEffect, useState } from "react";
import { Button } from "@nextui-org/react";
import { useGlobalContext } from "@/src/context/GlobalProviders";
import AddBikeForm from "@/src/components/Bike/AddBikeForm";
import { getUserBikes } from "@/src/api/bikeApi";
import GlobalBikeCard from "@/src/components/Bike/GlobalBikeCard";
import Loader from "@/src/components/Loader";

const Dashboard = () => {
  const { user, bikes, setBikes } = useGlobalContext();
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user?.userId) {
      fetchBikes();
    }
  }, [user]);

  const fetchBikes = async () => {
    setLoading(true);
    try {
      const bikesData = await getUserBikes();
      setBikes(bikesData);
    } catch (error) {
      console.error("Error fetching bikes:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[70vh] bg-gray-50 p-4">
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-xl font-bold">My Bikes</h1>
          <Button
            onClick={() => setShowForm(true)}
            className="bg-gray-800 text-white px-3 py-2 rounded-md"
          >
            Add Bike
          </Button>
        </div>

        {showForm && <AddBikeForm setShowForm={setShowForm} />}

        {loading ? (
          <Loader />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {bikes.length === 0 ? (
              <p className="text-gray-500">No bikes found.</p>
            ) : (
              bikes.map((bike) => (
                <GlobalBikeCard key={bike.id} bike={bike} />
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
