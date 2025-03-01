"use client";

import { useEffect, useState } from "react";
import { Button } from "@nextui-org/react";
import { useGlobalContext } from "@/src/context/GlobalProviders";
import AddBikeForm from "@/src/components/Bike/AddBikeForm";
import { getUserBikes } from "@/src/api/bikeApi";
import GlobalBikeCard from "@/src/components/Bike/GlobalBikeCard";
import Loader from "@/src/components/Loader";

const Dashboard = () => {
  const { user, bikes, setBikes } = useGlobalContext(); // Access bikes and setBikes from context
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
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header Section */}
      <div className="lg:px-20 px-8">
        <div className="flex justify-between items-center pt-5">
          <h1 className="text-lg font-semibold">My Bikes</h1>
          <Button
            onClick={() => setShowForm(true)}
            className="bg-gradient-to-tr from-gray-700 to-gray-900 text-white px-4 py-2 rounded-lg"
          >
            Add Bike
          </Button>
        </div>
      </div>

      {showForm && <AddBikeForm setShowForm={setShowForm} />}

      {loading ? (
        <Loader />
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 py-5 md:gap-10 gap-5">
          {bikes.length === 0 ? (
            <p className="text-gray-500 text-center col-span-full">
              No bikes found.
            </p>
          ) : (
            bikes.map((bike) => (
              <div key={bike.id} className="">
                <GlobalBikeCard bike={bike} />
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default Dashboard;